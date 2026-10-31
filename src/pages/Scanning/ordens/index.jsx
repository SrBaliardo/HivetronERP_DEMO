import { useLocation } from 'react-router-dom';

import { Tab } from '../../../components/Tab';
import { validateProp } from '../../../utils/validateProp';
import { OrderForm } from './components/Form';
import { OrdersList } from './components/List';
export function ScanningOrdersContent({ active, onChange }) {
  const location = useLocation();
  const items = [
    {
      key: '15',
      label: 'Lista de O.S.',
      children: active === '15' ? <OrdersList key={location.key} /> : null,
    },
    {
      key: '16',
      label: '',
      children:
        active === '16' && location.state?.order ? (
          <OrderForm
            key={location.key}
            order={location.state.order}
            orderList={location.state.orderList}
            onChange={onChange}
          />
        ) : null,
    },
  ];
  return (
    <Tab
      injectOnChange={false}
      tabItems={items}
      activeKey={active}
      onTabChange={onChange}
      page="scanningOrders"
    />
  );
}

ScanningOrdersContent.propTypes = {
  active: validateProp('string'),
  onChange: validateProp('function'),
};

export function PcpOrderDetail({ order }) {
  return <OrderForm order={order} mode="pcp" />;
}
PcpOrderDetail.propTypes = { order: validateProp('object') };
