import {
  WalletOutlined,
  SolutionOutlined,
  IssuesCloseOutlined,
  RocketOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

import { validateProp } from '../../../../../utils/validateProp';
import * as S from './styles';

export function Steps({ inspectionStage }) {
  const stages = {
    REGISTER: 0,
    INSPECTION: 1,
    RELEASE: 2,
    EXPEDITION: 3,
    COMPLETED: 4,
  };

  const currentStage = stages[inspectionStage] || 0;

  return (
    <S.Container>
      <S.StepsCustom
        direction="horizontal"
        responsive={false}
        current={currentStage}
        status="process"
        items={[
          {
            title: [<WalletOutlined key="wallet-icon" />, ' Cadastro'],
            key: 'REGISTER',
          },
          {
            title: [<SolutionOutlined key="solution-icon" />, ' Inspeção'],
            key: 'INSPECTION',
          },
          {
            title: [<IssuesCloseOutlined key="issues-icon" />, ' Liberação'],
            key: 'RELEASE',
          },
          {
            title: [
              <RocketOutlined key="rocket-icon" />,
              ' Expedição',
              ' ',
              currentStage === stages.COMPLETED && (
                <CheckCircleOutlined key="check-circle-icon" />
              ),
            ],
            key: 'EXPEDITION',
          },
        ]}
      />
    </S.Container>
  );
}

Steps.propTypes = { inspectionStage: validateProp('string') };
