import {
  BarChartOutlined,
  FileSearchOutlined,
  WalletOutlined,
  BuildOutlined,
  ScanOutlined,
  SettingOutlined,
} from '@ant-design/icons';

export const tagsMenu = [
  {
    id: '1',
    label: 'B.O.M',
    link: '/bom',
    icon: BarChartOutlined,
    screen: 'bom',
  },

  {
    id: '2',
    label: 'Roteirização',
    link: '/scripting',
    icon: FileSearchOutlined,
    screen: 'scripting',
  },

  {
    id: '3',
    label: 'Digitalização',
    link: '/scanning',
    icon: WalletOutlined,
    screen: 'scanning',
  },

  {
    id: '4',
    label: 'Gestão de PCP',
    link: '/pcp',
    icon: BuildOutlined,
    screen: 'pcp',
  },

  {
    id: '5',
    label: 'Apontamento',
    link: '/appointment',
    icon: ScanOutlined,
    screen: 'appointment',
  },

  {
    id: '6',
    label: 'Configurações',
    link: '/settings',
    icon: SettingOutlined,
    screen: 'settings',
  },
];
