import { Table, Space, Empty } from 'antd';
import { useState, useEffect, useMemo } from 'react';

import { useLoading } from '../../contexts/LoadingContext';
import { useTableColumnLayout } from '../../hooks/useTableColumnLayout';
import { validateProp } from '../../utils/validateProp';
import * as S from './styles';

export function TableList({
  actionLinks,
  columns,
  data,
  pagination,
  setPagination,
  currentTab,
  loading = false,
  actionColumnWidth = 140,
  actionColumnTitle = 'Ações',
}) {
  const regionLoading = Boolean(useLoading()?.isLoading);
  const [sorter, setSorter] = useState({ field: null, order: null });
  const sortedRows = useMemo(() => {
    if (!sorter.field || !sorter.order) return data || [];
    const column = columns.find((column) => column.dataIndex === sorter.field);
    return [...(data || [])].sort((a, b) => {
      if (typeof column?.compareRows === 'function')
        return column.compareRows(a, b, sorter.order);
      if (a[sorter.field] === b[sorter.field]) return 0;
      if (sorter.order === 'ascend')
        return a[sorter.field] > b[sorter.field] ? 1 : -1;
      return a[sorter.field] < b[sorter.field] ? 1 : -1;
    });
  }, [data, sorter, columns]);

  useEffect(() => {
    setSorter({ field: null, order: null });
  }, [data]);

  const handleTableChange = (pagination, filters, sorter) => {
    const { field, order } = sorter;

    setSorter((previous) =>
      previous.field === field && previous.order === order
        ? previous
        : { field, order },
    );

    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const hasActions = currentTab !== '/pcp' && currentTab !== '/appointment';
  const { container, layout, tracks } = useTableColumnLayout(
    columns,
    hasActions ? actionColumnWidth : 0,
  );

  const updatedColumns = useMemo(() => {
    const calculateColumnWidth = (col) => {
      const titleWidth = col.title.length * 10;
      let maxContentWidth = titleWidth;

      if (data && data.length > 0) {
        data.forEach((item) => {
          const cellContent = item[col.dataIndex];
          if (cellContent) {
            const contentWidth = cellContent.toString().length * 8;
            maxContentWidth = Math.max(maxContentWidth, contentWidth);
          }
        });
      }

      return Math.min(maxContentWidth, 140);
    };

    return columns.map((col, index) => ({
      ...col,
      sorter: true,
      width:
        layout?.widths[index] ??
        tracks[index]?.min ??
        col.width ??
        calculateColumnWidth(col),
      ellipsis:
        col.ellipsis ?? (col.width != null ? { showTitle: true } : undefined),
      onCell: () => ({ className: 'table-list-cell' }),
    }));
  }, [columns, data, layout, tracks]);

  const actionColumn = hasActions
    ? {
        title: actionColumnTitle,
        key: 'actions',
        fixed: 'right',
        width: actionColumnWidth,
        render: (_, record) => {
          const recordProps = { ...record };
          delete recordProps.key;

          return (
            <Space className="table-actions" size="middle">
              {actionLinks.map(
                ({ onClick, icon: Icon, render, label, disabled }, index) =>
                  render ? (
                    <div key={index}>{render(record)}</div>
                  ) : (
                    <S.ActionButton
                      key={index}
                      type="button"
                      aria-label={
                        (typeof label === 'function' ? label(record) : label) ||
                        `Ação ${index + 1}`
                      }
                      disabled={
                        typeof disabled === 'function'
                          ? disabled(record)
                          : disabled
                      }
                      onClick={() => onClick(record)}
                    >
                      <Icon {...recordProps} />
                    </S.ActionButton>
                  ),
              )}
            </Space>
          );
        },
      }
    : null;

  return (
    <S.Container ref={container} $fixedColumns={Boolean(layout)}>
      <Table
        loading={loading && !regionLoading}
        locale={{
          emptyText: (
            <S.EmptyState
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                loading ? 'Carregando...' : 'Nenhum resultado encontrado'
              }
            />
          ),
        }}
        columns={[...updatedColumns, actionColumn].filter(Boolean)}
        dataSource={sortedRows.map((item, index) => ({
          ...item,
          key: item.id || index,
        }))}
        showSorterTooltip={false}
        tableLayout={layout ? 'fixed' : undefined}
        scroll={{ x: layout?.tableWidth ?? 'max-content' }}
        pagination={{
          showPrevNextJumpers: false,
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        onChange={handleTableChange}
        rowClassName={(record, index) =>
          index % 2 === 0 ? 'even-row' : 'odd-row'
        }
        sortDirections={['ascend', 'descend', null]}
      />
    </S.Container>
  );
}

TableList.propTypes = {
  actionLinks: validateProp('object', true),
  columns: validateProp('object', true),
  data: validateProp('object'),
  pagination: validateProp('object', true),
  setPagination: validateProp('function', true),
  currentTab: validateProp('string'),
  loading: validateProp('boolean'),
  actionColumnWidth: validateProp('number'),
  actionColumnTitle: validateProp('string'),
};
