import { useTableColumnLayout } from '../../hooks/useTableColumnLayout';
import { validateProp } from '../../utils/validateProp';
import * as S from './styles';

export function ListTable({
  columns,
  rows,
  label,
  renderCell,
  renderHeader,
  renderAction,
  actionColumnWidth = 0,
  showHeader = true,
  className,
}) {
  const { container, layout, tracks } = useTableColumnLayout(
    columns,
    renderAction ? actionColumnWidth : 0,
  );
  let right = renderAction ? actionColumnWidth : 0;
  const fixedOffsets = columns.map(() => undefined);
  for (let index = columns.length - 1; index >= 0; index -= 1) {
    if (columns[index].fixed === 'right') {
      fixedOffsets[index] = right;
      right += layout?.widths[index] ?? tracks[index]?.min ?? 0;
    }
  }
  return (
    <S.ScrollArea
      ref={container}
      className={className}
      tabIndex={0}
      role="region"
      aria-label={label}
    >
      <S.Table
        $width={layout?.tableWidth}
        $showHeader={showHeader}
        aria-label={label}
      >
        <colgroup>
          {columns.map((column, index) => (
            <S.Column key={column.key} $width={layout?.widths[index]} />
          ))}
          {renderAction && <S.Column $width={actionColumnWidth} />}
        </colgroup>
        {showHeader && (
          <thead>
            <tr>
              {columns.map((column, index) => (
                <S.HeaderCell
                  key={column.key}
                  scope="col"
                  aria-label={column.ariaLabel}
                  $right={fixedOffsets[index]}
                  $align={column.align}
                >
                  {renderHeader ? renderHeader(column) : column.title}
                </S.HeaderCell>
              ))}
              {renderAction && (
                <S.HeaderCell scope="col" aria-label="Ação" $right={0} />
              )}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.id ?? rowIndex}>
              {columns.map((column, index) => (
                <S.Cell
                  key={column.key}
                  $right={fixedOffsets[index]}
                  $align={column.align}
                >
                  {renderCell ? (
                    renderCell(row, column, rowIndex)
                  ) : (
                    <p title={String(row[column.key] ?? '')}>
                      {row[column.key]}
                    </p>
                  )}
                </S.Cell>
              ))}
              {renderAction && (
                <S.ActionCell>
                  <S.ActionContent>{renderAction(row)}</S.ActionContent>
                </S.ActionCell>
              )}
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.ScrollArea>
  );
}

ListTable.propTypes = {
  columns: validateProp('object', true),
  rows: validateProp('object', true),
  label: validateProp('string', true),
  renderCell: validateProp('function'),
  renderHeader: validateProp('function'),
  renderAction: validateProp('function'),
  actionColumnWidth: validateProp('number'),
  showHeader: validateProp('boolean'),
  className: validateProp('string'),
};
