import { toast } from 'react-toastify';

import { RecordList } from '../../../../../components/RecordList';
import { useOperations } from '../../../../../contexts/operations/index.js';
import { useAsyncList } from '../../../../../hooks/useAsyncList';
import { validateProp } from '../../../../../utils/validateProp';
import {
  actionColumnTitle,
  actionColumnWidth,
  tabTableColumns,
} from './tabTableColumns';
export function OperationList({ active, onAdd, onSelect }) {
  const domain = useOperations();
  const list = useAsyncList(domain.loadList, active, domain.allOperations);
  const add = () => {
    if (domain.permissions.create) onAdd();
    else
      toast.warning('🙅🏻‍♂️ Você não tem permissão para executar essa operação!');
  };
  return (
    <RecordList
      {...list}
      columns={tabTableColumns}
      actionColumnWidth={actionColumnWidth}
      actionColumnTitle={actionColumnTitle}
      onAdd={add}
      onSelect={onSelect}
      errorMessage="Erro ao buscar operações."
    />
  );
}
OperationList.propTypes = {
  active: validateProp('boolean'),
  onAdd: validateProp('function', true),
  onSelect: validateProp('function', true),
};
