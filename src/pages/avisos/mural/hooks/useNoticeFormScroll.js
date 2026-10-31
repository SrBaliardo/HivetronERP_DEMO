import { useEffect, useReducer, useRef } from 'react';

export function useNoticeFormScroll(mode) {
  const formRef = useRef(null);
  const [scrollRequest, requestFormScroll] = useReducer(
    (value) => value + 1,
    0,
  );

  useEffect(() => {
    if (!scrollRequest || (mode !== 'create' && mode !== 'edit')) return;
    if (!window.matchMedia('(max-width: 800px)').matches) return;

    const frame = window.requestAnimationFrame(() => {
      const element = formRef.current;
      if (!element) return;
      const scrollContainers = [];
      for (
        let parent = element.parentElement;
        parent;
        parent = parent.parentElement
      ) {
        if (parent === document.body || parent === document.documentElement)
          break;
        if (
          /(auto|scroll)/.test(window.getComputedStyle(parent).overflowY) &&
          parent.scrollHeight > parent.clientHeight
        ) {
          scrollContainers.push(parent);
        }
      }
      if (!scrollContainers.length) return;

      const formBounds = element.getBoundingClientRect();
      let formTop = formBounds.top;
      let formBottom = formBounds.bottom;
      for (const scrollContainer of scrollContainers) {
        const bounds = scrollContainer.getBoundingClientRect();
        const visibleTop = Math.max(0, bounds.top + scrollContainer.clientTop);
        const visibleBottom = Math.min(
          window.innerHeight,
          bounds.top + scrollContainer.clientTop + scrollContainer.clientHeight,
        );
        if (visibleBottom <= visibleTop) continue;

        let offset = 0;
        if (formBounds.height > visibleBottom - visibleTop) {
          if (formTop > visibleTop) offset = formTop - visibleTop;
        } else if (formBottom > visibleBottom) {
          offset = formBottom - visibleBottom;
        } else if (formTop < visibleTop) {
          offset = formTop - visibleTop;
        }
        const target = Math.max(
          0,
          Math.min(
            scrollContainer.scrollTop + offset,
            scrollContainer.scrollHeight - scrollContainer.clientHeight,
          ),
        );
        const appliedOffset = target - scrollContainer.scrollTop;
        if (!appliedOffset) continue;

        scrollContainer.scrollTo({
          top: target,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
            .matches
            ? 'auto'
            : 'smooth',
        });
        formTop -= appliedOffset;
        formBottom -= appliedOffset;
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [mode, scrollRequest]);

  return { formRef, requestFormScroll };
}
