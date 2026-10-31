import { RecordForm } from '../../../../../components/RecordForm';
import { validateProp } from '../../../../../utils/validateProp';
import { useToolForm } from '../../hooks/useToolForm';
export function ToolForm(props) {
  const { form } = useToolForm(props);
  return (
    <RecordForm
      form={form}
      inlineDescription
      isNew={props.isNew}
      navigationLabel="a Ferramenta"
    />
  );
}
ToolForm.propTypes = {
  isNew: validateProp('boolean'),
  record: validateProp('object'),
  onSaved: validateProp('function', true),
  onBack: validateProp('function', true),
};
