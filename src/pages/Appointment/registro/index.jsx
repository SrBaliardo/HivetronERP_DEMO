import { ScanOutlined } from '@ant-design/icons';

import { ButtonFill } from '../../../components/ButtonFill';
import { AppointmentDetails } from './components/Details';
import { useAppointmentRegistration } from './hooks/useAppointmentRegistration';
import * as S from './styles';
export function AppointmentRegistration() {
  const {
    form,
    order,
    pending,
    registered,
    allowed,
    lookup,
    save,
    clear,
    invalid,
  } = useAppointmentRegistration();
  return (
    <S.Container>
      <S.ContainerContent
        as="form"
        onSubmit={form.handleSubmit(lookup, invalid)}
        noValidate
      >
        <div className="div">
          <label htmlFor="appointment-code">Apontar O.S.:</label>
          <input
            id="appointment-code"
            className="input"
            placeholder="Exemplo: 1001-10"
            autoFocus
            {...form.register('code')}
            disabled={pending || registered || !allowed}
          />
        </div>
        <ButtonFill type="submit" disabled={pending || registered || !allowed}>
          <ScanOutlined />
          Apontar
        </ButtonFill>
      </S.ContainerContent>
      {order && (
        <>
          <h1>Dados:</h1>
          <AppointmentDetails
            order={order}
            onSave={save}
            onCancel={clear}
            pending={pending}
            allowed={allowed}
          />
        </>
      )}
    </S.Container>
  );
}
