import { toast } from 'react-toastify';

import { RecordList } from '../../../../../components/RecordList';
import { useMachines } from '../../../../../contexts/machines/index.js';
import { useAsyncList } from '../../../../../hooks/useAsyncList';
import { validateProp } from '../../../../../utils/validateProp';
import {
  actionColumnTitle,
  actionColumnWidth,
  tabTableColumns,
} from './tabTableColumns';
export function MachineList({ active, onAdd, onSelect }) {
  const domain = useMachines();
  const list = useAsyncList(domain.loadList, active, domain.allMachines);
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
      errorMessage="Erro ao buscar máquinas."
    />
  );
}
MachineList.propTypes = {
  active: validateProp('boolean'),
  onAdd: validateProp('function', true),
  onSelect: validateProp('function', true),
};
