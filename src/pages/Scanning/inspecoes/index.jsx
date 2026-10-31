import { useLocation } from 'react-router-dom';

import { validateProp } from '../../../utils/validateProp';
import { FormInspectionsStep1 } from './components/Step1';
import { FormInspectionsStep2 } from './components/Step2';
import { FormInspectionsStep3 } from './components/Step3';
import { FormInspectionsStep4 } from './components/Step4';
import { FormInspectionsStep5 } from './components/Step5';
import { Steps } from './components/Steps';
import * as S from './styles';
const forms = [
  FormInspectionsStep1,
  FormInspectionsStep2,
  FormInspectionsStep3,
  FormInspectionsStep4,
  FormInspectionsStep5,
];
const stages = ['REGISTER', 'INSPECTION', 'RELEASE', 'EXPEDITION', 'COMPLETED'];
export function InspectionPage({ step }) {
  const location = useLocation();
  const inspection = location.state?.inspection;
  const Form = forms[step - 1];
  return (
    <S.Container>
      <S.ContainerContent>
        <Steps
          inspectionStage={inspection?.inspectionStage || stages[step - 1]}
        />
      </S.ContainerContent>
      <Form key={location.key} inspection={inspection} />
    </S.Container>
  );
}

InspectionPage.propTypes = { step: validateProp('number') };
