import { useInputsCatalog } from '../../../../contexts/inputs';
import { useMachinesCatalog } from '../../../../contexts/machines';
import { useOperationsCatalog } from '../../../../contexts/operations';
import { useToolsCatalog } from '../../../../contexts/tools';
import { useAsyncList } from '../../../../hooks/useAsyncList';

// Composição dos catálogos auxiliares pela página; nenhuma integração no campo genérico.
export function useSequenceCatalogs() {
  const operations = useOperationsCatalog();
  const machines = useMachinesCatalog();
  const tools = useToolsCatalog();
  const inputs = useInputsCatalog();
  return {
    operations: {
      ...useAsyncList(operations.load),
      selectionError: operations.selectionError,
    },
    machines: {
      ...useAsyncList(machines.load),
      selectionError: machines.selectionError,
    },
    tools: {
      ...useAsyncList(tools.load),
      selectionError: tools.selectionError,
    },
    inputs: useAsyncList(inputs.load),
  };
}
