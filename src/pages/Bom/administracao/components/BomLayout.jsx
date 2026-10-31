import { Header } from '../../../../components/Header';
import { SideMenu } from '../../../../components/SideMenu';
import { Tab } from '../../../../components/Tab';
import { validateProp } from '../../../../utils/validateProp';
import * as S from '../styles';

export function BomLayout({ title, items, activeKey, onChange, page }) {
  return (
    <S.Container>
      <Header />
      <S.ContainerItensContent>
        <SideMenu />
        <S.ContainerContent className="background-content">
          <h1>{title}</h1>
          <Tab
            tabItems={items}
            activeKey={activeKey}
            onTabChange={onChange}
            page={page}
            injectOnChange={false}
          />
        </S.ContainerContent>
      </S.ContainerItensContent>
    </S.Container>
  );
}
BomLayout.propTypes = {
  title: validateProp('string'),
  items: validateProp('object'),
  activeKey: validateProp('string'),
  onChange: validateProp('function'),
  page: validateProp('string'),
};
