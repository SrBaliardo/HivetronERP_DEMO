import { useLayoutEffect, useState } from 'react';

export function useListboxLayout(anchorEl, listboxHeight, contentEl) {
  const [layout, setLayout] = useState(null);
  useLayoutEffect(() => {
    if (!anchorEl) return undefined;
    const view = anchorEl.ownerDocument.defaultView;
    let frame;
    const measure = () => {
      const rect = anchorEl.getBoundingClientRect();
      const viewport = view.visualViewport;
      const top = viewport?.offsetTop ?? 0;
      const bottom = top + (viewport?.height ?? view.innerHeight);
      // O conteúdo não inclui as duas bordas de 1,5px do listbox.
      const contentHeight = contentEl
        ? contentEl.getBoundingClientRect().height + 3
        : 250;
      const maximumHeight =
        Number.isFinite(listboxHeight) && listboxHeight > 0
          ? listboxHeight
          : 250;
      const requested = Math.min(maximumHeight, Math.ceil(contentHeight));
      const below = Math.max(0, bottom - rect.bottom - 18);
      const above = Math.max(0, rect.top - top - 18);
      const down = below >= requested || below >= above;
      const next = {
        width: rect.width,
        height: Math.min(requested, down ? below : above),
        placement: down ? 'bottom-start' : 'top-start',
        font: view.getComputedStyle(anchorEl).font,
      };
      setLayout((previous) =>
        previous &&
        Object.keys(next).every((key) => next[key] === previous[key])
          ? previous
          : next,
      );
    };
    const schedule = () => {
      view.cancelAnimationFrame(frame);
      frame = view.requestAnimationFrame(measure);
    };
    measure();
    const observer = new ResizeObserver(schedule);
    observer.observe(anchorEl);
    if (contentEl) observer.observe(contentEl);
    view.addEventListener('resize', schedule);
    view.addEventListener('scroll', schedule, { capture: true, passive: true });
    view.visualViewport?.addEventListener('resize', schedule);
    view.visualViewport?.addEventListener('scroll', schedule);
    return () => {
      observer.disconnect();
      view.cancelAnimationFrame(frame);
      view.removeEventListener('resize', schedule);
      view.removeEventListener('scroll', schedule, true);
      view.visualViewport?.removeEventListener('resize', schedule);
      view.visualViewport?.removeEventListener('scroll', schedule);
    };
  }, [anchorEl, listboxHeight, contentEl]);
  return layout;
}
