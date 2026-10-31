import { toast } from 'react-toastify';

import { RecordList } from '../../../../../components/RecordList';
import { useTools } from '../../../../../contexts/tools/index.js';
import { useAsyncList } from '../../../../../hooks/useAsyncList';
import { validateProp } from '../../../../../utils/validateProp';
import {
  actionColumnTitle,
  actionColumnWidth,
  tabTableColumns,
} from './tabTableColumns';
export function ToolList({ active, onAdd, onSelect }) {
  const domain = useTools();
  const list = useAsyncList(domain.loadList, active, domain.allTools);
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
      errorMessage="Erro ao buscar ferramentas."
    />
  );
}
ToolList.propTypes = {
  active: validateProp('boolean'),
  onAdd: validateProp('function', true),
  onSelect: validateProp('function', true),
};
