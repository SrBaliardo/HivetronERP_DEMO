import { useEffect, useId, useRef, useState } from 'react';

const action = 'button, a[href], [role="button"], [role="link"]';
const interactive =
  'button, a[href], input, select, textarea, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])';

export function useTooltipInteraction({ keepFocusedOnScroll = false } = {}) {
  const id = useId();
  const trigger = useRef(null);
  const ancestor = useRef(null);
  const [focusable, setFocusable] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const visible = !dismissed && (hovered || focused);

  useEffect(() => {
    const element = trigger.current;
    const parent = element?.parentElement?.closest(action);
    ancestor.current = parent;
    setFocusable(!parent && !element?.querySelector(interactive));
    if (!parent) return undefined;
    const focus = (event) => {
      if (event.target !== parent) return;
      setFocused(parent.matches(':focus-visible'));
      setDismissed(false);
    };
    const blur = (event) => {
      if (!parent.contains(event.relatedTarget)) setFocused(false);
    };
    parent.addEventListener('focusin', focus);
    parent.addEventListener('focusout', blur);
    if (parent === document.activeElement && parent.matches(':focus-visible'))
      setFocused(true);
    return () => {
      parent.removeEventListener('focusin', focus);
      parent.removeEventListener('focusout', blur);
    };
  }, []);

  useEffect(() => {
    const parent = ancestor.current;
    if (!parent) return undefined;
    const remove = () => {
      const ids = (parent.getAttribute('aria-describedby') || '')
        .split(/\s+/)
        .filter((value) => value && value !== id);
      if (ids.length) parent.setAttribute('aria-describedby', ids.join(' '));
      else parent.removeAttribute('aria-describedby');
    };
    if (visible) {
      const ids = new Set(
        (parent.getAttribute('aria-describedby') || '')
          .split(/\s+/)
          .filter(Boolean),
      );
      ids.add(id);
      parent.setAttribute('aria-describedby', [...ids].join(' '));
    }
    return remove;
  }, [id, visible]);

  useEffect(() => {
    if (!visible) return undefined;
    const dismiss = (event) => {
      if (event.key === 'Escape') setDismissed(true);
    };
    const dismissOnScroll = () => {
      setHovered(false);
      // O foco por teclado pode rolar a tela para revelar o próprio acionador.
      if (!keepFocusedOnScroll || !focused) setDismissed(true);
    };
    document.addEventListener('keydown', dismiss, true);
    document.addEventListener('scroll', dismissOnScroll, {
      capture: true,
      passive: true,
    });
    return () => {
      document.removeEventListener('keydown', dismiss, true);
      document.removeEventListener('scroll', dismissOnScroll, true);
    };
  }, [visible, focused, keepFocusedOnScroll]);

  return {
    id,
    visible,
    popoverProps: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: (event) => {
        if (!trigger.current?.contains(event.relatedTarget)) setHovered(false);
      },
    },
    triggerProps: {
      ref: trigger,
      tabIndex: focusable ? 0 : undefined,
      'aria-describedby': visible ? id : undefined,
      onMouseEnter: () => {
        setHovered(true);
        setDismissed(false);
      },
      onMouseLeave: (event) => {
        if (!document.getElementById(id)?.contains(event.relatedTarget))
          setHovered(false);
      },
      onFocus: (event) => {
        setFocused(event.target.matches(':focus-visible'));
        setDismissed(false);
      },
      onBlur: (event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      },
    },
  };
}
