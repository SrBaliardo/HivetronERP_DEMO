import { ApartmentOutlined } from '@ant-design/icons';

import { ButtonFill } from '../../../../../components/ButtonFill';
import { InputCheckboxForm } from '../../../../../components/InputCheckboxForm';
import { validateProp } from '../../../../../utils/validateProp';
import { useCreateSet } from '../../hooks/useCreateSet';
import { FormSets } from '../FormSets';
import { SetPicker } from '../SetPicker';
import * as S from './styles';

export function BomTab7({ onChange, isActiveTab }) {
  const {
    searchInput,
    setSearchInput,
    isFormVisible,
    isCheckboxVisible,
    navigateCheck,
    setNavigateCheck,
    formDescription,
    searchToAdd,
    handleCancel,
    onSave,
    pending,
  } = useCreateSet(onChange, isActiveTab);
  return (
    <S.Container>
      <S.ContainerContent>
        {!isFormVisible && (
          <div className="div">
            <div>
              <SetPicker
                value={searchInput}
                onChange={(code) => setSearchInput(code)}
              />
              <div>
                <ButtonFill
                  type="button"
                  disabled={pending}
                  onClick={searchToAdd}
                >
                  <ApartmentOutlined />
                  Novo Conjunto
                </ButtonFill>
              </div>
            </div>
          </div>
        )}
        {isCheckboxVisible && (
          <div className="div-checkbox">
            <label>Navegar para o conjunto após salvar:</label>
            <InputCheckboxForm
              ariaLabel="Navegar para o conjunto após salvar"
              checked={navigateCheck}
              onChange={(e) => setNavigateCheck(e.target.checked)}
            />
          </div>
        )}
      </S.ContainerContent>
      {!isFormVisible && <div className="bar"></div>}
      {isFormVisible && (
        <FormSets
          onChange={onChange}
          isNew={true}
          onCancel={handleCancel}
          setCode={searchInput}
          setDescription={formDescription}
          onSave={onSave}
        />
      )}
    </S.Container>
  );
}
BomTab7.propTypes = {
  onChange: validateProp('function'),
  isActiveTab: validateProp('boolean'),
};
