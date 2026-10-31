import { Spin } from 'antd';
import { useEffect, useRef, useState } from 'react';

import { LoadingProvider, useLoading } from '../../contexts/LoadingContext';
import { validateProp } from '../../utils/validateProp';
import * as S from './styles';

export function LoadingFeedback({
  children,
  modal = false,
  active = true,
  scopeKey,
  onBusyChange,
}) {
  const region = useRef(null);
  const lastFocus = useRef(null);
  const loading = useLoading();
  const busy = active && Boolean(loading?.isLoading);
  const [visible, setVisible] = useState(false);
  const [indicatorTop, setIndicatorTop] = useState(null);

  useEffect(() => {
    if (busy) return undefined;
    const timer = setTimeout(() => {
      const target = lastFocus.current;
      if (
        target?.isConnected &&
        target.getClientRects().length &&
        document.activeElement === document.body
      )
        target.focus({ preventScroll: true });
    }, 0);
    return () => clearTimeout(timer);
  }, [busy]);

  useEffect(() => {
    onBusyChange?.(scopeKey, busy);
    return () => onBusyChange?.(scopeKey, false);
  }, [onBusyChange, scopeKey, busy]);

  useEffect(() => {
    if (!busy) return undefined;
    const element = region.current;
    const measure = () => {
      const rect = element.getBoundingClientRect();
      const top = Math.max(0, rect.top);
      const bottom = Math.max(top, Math.min(innerHeight, rect.bottom));
      setIndicatorTop((top + bottom) / 2 - rect.top);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener('scroll', measure, true);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', measure, true);
      window.removeEventListener('resize', measure);
    };
  }, [busy]);

  useEffect(() => {
    if (!busy) {
      setVisible(false);
      return undefined;
    }
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, [busy]);

  return (
    <S.Region
      ref={region}
      aria-busy={busy}
      data-loading-region={modal ? 'modal' : 'tab'}
      onFocusCapture={(event) => {
        if (event.currentTarget.contains(event.target))
          lastFocus.current = event.target;
      }}
    >
      <div data-loading-content inert={busy ? '' : undefined}>
        {children}
      </div>
      {busy && visible && (modal || !loading?.hasModal) && (
        <S.Overlay role="status" aria-label="Carregando">
          <S.Indicator $top={indicatorTop}>
            <Spin size="large" />
          </S.Indicator>
        </S.Overlay>
      )}
    </S.Region>
  );
}

LoadingFeedback.propTypes = {
  children: validateProp(['object', 'string', 'number', 'boolean']),
  modal: validateProp('boolean'),
  active: validateProp('boolean'),
  scopeKey: validateProp('string'),
  onBusyChange: validateProp('function'),
};

export function LoadingRegion({ children, scopeKey, onBusyChange }) {
  return (
    <LoadingProvider>
      <LoadingFeedback scopeKey={scopeKey} onBusyChange={onBusyChange}>
        {children}
      </LoadingFeedback>
    </LoadingProvider>
  );
}

LoadingRegion.propTypes = {
  children: validateProp(['object', 'string', 'number', 'boolean']),
  scopeKey: validateProp('string'),
  onBusyChange: validateProp('function'),
};
