import { LockOutlined, SettingOutlined } from '@ant-design/icons';

import { validateProp } from '../../../../../utils/validateProp';
import * as S from './styles';
export function AppointmentDisabled({ onDemonstrate }) {
  return (
    <S.Container aria-label="Apontamento desabilitado">
      <S.Panel aria-labelledby="appointment-disabled-title">
        <S.Illustration aria-hidden="true">
          <SettingOutlined className="gear gear-main" />
          <SettingOutlined className="gear gear-secondary" />
          <SettingOutlined className="gear gear-small" />
        </S.Illustration>
        <S.Badge>
          <LockOutlined aria-hidden="true" />
          Módulo não habilitado
        </S.Badge>
        <S.Title id="appointment-disabled-title">
          Apontamento de produção
        </S.Title>
        <S.Description>
          Um espaço para registrar a execução das operações e acompanhar o
          andamento da produção em um só lugar.
        </S.Description>
        {onDemonstrate && (
          <S.DemonstrationButton type="button" onClick={onDemonstrate}>
            Degustação
          </S.DemonstrationButton>
        )}
      </S.Panel>
    </S.Container>
  );
}

AppointmentDisabled.propTypes = { onDemonstrate: validateProp('function') };
