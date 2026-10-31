import { Tabs } from 'antd';
import React, { useCallback, useState, useEffect } from 'react';

import { useAutenticacao as useUser } from '../../contexts/autenticacao';
import { useNavigationConfirmation } from '../../hooks/useUnsavedChanges';
import { hasPermission } from '../../utils/hasPermission';
import { validateProp } from '../../utils/validateProp';
import { ContentBoundary } from '../ContentBoundary';
import { LoadingRegion } from '../LoadingRegion';
import * as S from './styles';

export function Tab({
  tabItems,
  activeKey,
  onTabChange,
  page,
  injectOnChange = true,
}) {
  const [currentKey, setCurrentKey] = useState(activeKey);
  const [busyKeys, setBusyKeys] = useState(() => new Set());
  const handleBusyChange = useCallback((key, busy) => {
    setBusyKeys((previous) => {
      if (previous.has(key) === busy) return previous;
      const next = new Set(previous);
      if (busy) next.add(key);
      else next.delete(key);
      return next;
    });
  }, []);
  const { userRole } = useUser();
  const confirmNavigation = useNavigationConfirmation();

  useEffect(() => {
    setCurrentKey(activeKey);
  }, [activeKey]);

  const onChange = (key) => {
    if (key === currentKey || busyKeys.has(currentKey)) return;
    confirmNavigation(() => {
      setCurrentKey(key);
      onTabChange?.(key);
    });
  };

  const newTabItems = tabItems
    .filter((item) => hasPermission(userRole, page, 'R', item.key))
    .map((item) => ({
      ...item,
      disabled:
        item.disabled || (item.key !== currentKey && busyKeys.has(currentKey)),
      children: (
        <ContentBoundary key={item.key}>
          <LoadingRegion
            key={item.key}
            scopeKey={item.key}
            onBusyChange={handleBusyChange}
          >
            {injectOnChange && React.isValidElement(item.children)
              ? React.cloneElement(item.children, { onChange })
              : item.children}
          </LoadingRegion>
        </ContentBoundary>
      ),
    }));

  return (
    <S.Container>
      <Tabs activeKey={currentKey} onChange={onChange} items={newTabItems} />
    </S.Container>
  );
}

Tab.propTypes = {
  tabItems: validateProp('object', true),
  activeKey: validateProp('string'),
  onTabChange: validateProp('function'),
  page: validateProp('string', true),
  injectOnChange: validateProp('boolean'),
};
