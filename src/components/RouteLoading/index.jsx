import { Spin } from 'antd';

import { validateProp } from '../../utils/validateProp';
import { Header } from '../Header';
import { SideMenu } from '../SideMenu';
import * as S from './styles';

export function RouteLoading({ children }) {
  return (
    <S.Container>
      <Header />
      <S.Row>
        <SideMenu restoreScreen={false} />
        <S.Content
          role={children ? undefined : 'status'}
          aria-label={children ? undefined : 'Carregando página'}
        >
          {children || <Spin size="large" />}
        </S.Content>
      </S.Row>
    </S.Container>
  );
}

RouteLoading.propTypes = {
  children: validateProp(['object', 'string', 'number', 'boolean']),
};
