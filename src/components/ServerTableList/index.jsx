import { Table, Space, Empty } from 'antd';
import { useMemo } from 'react';

import { useLoading } from '../../contexts/LoadingContext';
import { useTableColumnLayout } from '../../hooks/useTableColumnLayout';
import { validateProp } from '../../utils/validateProp';
import * as S from './styles';

export function ServerTableList({
  actionLinks,
  columns,
  data,
  pagination,
  onChange,
  sorter,
  error = false,
  currentTab,
  loading = false,
  actionColumnWidth = 140,
  actionColumnTitle = 'Ações',
}) {
  const regionLoading = Boolean(useLoading()?.isLoading);
  const handleTableChange = (nextPagination, filters, nextSorter, extra) => {
    onChange(
      nextPagination,
      {
        field: nextSorter.column?.sortField || nextSorter.field || null,
        order: nextSorter.order || null,
      },
      extra.action,
    );
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
      sorter: col.sorter !== false,
      sortOrder:
        sorter.field === (col.sortField || col.dataIndex) ? sorter.order : null,
      width:
        layout?.widths[index] ??
        tracks[index]?.min ??
        col.width ??
        calculateColumnWidth(col),
      ellipsis:
        col.ellipsis ?? (col.width != null ? { showTitle: true } : undefined),
      onCell: () => ({ className: 'table-list-cell' }),
    }));
  }, [columns, data, layout, tracks, sorter.field, sorter.order]);

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
                loading
                  ? 'Carregando...'
                  : error
                    ? 'Não foi possível carregar os resultados.'
                    : 'Nenhum resultado encontrado'
              }
            />
          ),
        }}
        columns={[...updatedColumns, actionColumn].filter(Boolean)}
        dataSource={data || []}
        rowKey="key"
        showSorterTooltip={false}
        tableLayout={layout ? 'fixed' : undefined}
        scroll={{ x: layout?.tableWidth ?? 'max-content' }}
        pagination={{
          showPrevNextJumpers: false,
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          disabled: loading,
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

ServerTableList.propTypes = {
  actionLinks: validateProp('object', true),
  columns: validateProp('object', true),
  data: validateProp('object'),
  pagination: validateProp('object', true),
  onChange: validateProp('function', true),
  sorter: validateProp('object', true),
  error: validateProp('boolean'),
  currentTab: validateProp('string'),
  loading: validateProp('boolean'),
  actionColumnWidth: validateProp('number'),
  actionColumnTitle: validateProp('string'),
};
