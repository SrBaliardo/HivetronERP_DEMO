import { PlusCircleOutlined } from '@ant-design/icons';

import { ButtonFill } from '../../../../../components/ButtonFill';
import { validateProp } from '../../../../../utils/validateProp';
import { useCreateProduct } from '../../hooks/useCreateProduct';
import { FormProducts } from '../FormProducts';
import { ProductPicker } from '../ProductPicker';
import * as S from './styles';

export function BomTab5({ onChange, isActiveTab }) {
  const {
    searchInput,
    setSearchInput,
    isFormVisible,
    formDescription,
    searchToAdd,
    handleCancel,
    pending,
  } = useCreateProduct(isActiveTab);
  return (
    <S.Container>
      {!isFormVisible && (
        <>
          <S.ContainerContent>
            <div>
              <ProductPicker
                placeholder="Informe o código do Produto"
                value={searchInput}
                onChange={(code) => setSearchInput(code)}
              />
              <div>
                <ButtonFill
                  type="button"
                  disabled={pending}
                  onClick={searchToAdd}
                >
                  <PlusCircleOutlined />
                  Adicionar
                </ButtonFill>
              </div>
            </div>
          </S.ContainerContent>
          <div className="bar"></div>
        </>
      )}

      {isFormVisible && (
        <FormProducts
          onChange={onChange}
          isNew={true}
          productCode={searchInput}
          productDescription={formDescription}
          onCancel={handleCancel}
        />
      )}
    </S.Container>
  );
}
BomTab5.propTypes = {
  onChange: validateProp('function'),
  isActiveTab: validateProp('boolean'),
};
