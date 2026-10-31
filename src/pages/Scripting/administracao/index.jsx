import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Header } from '../../../components/Header';
import { SideMenu } from '../../../components/SideMenu';
import { Tab } from '../../../components/Tab';
import { MachineList, MachineForm } from '../../machines/cadastros';
import { SequenceExport } from '../../manufacturingSequences/exportacao';
import { OperationList, OperationForm } from '../../operations/cadastros';
import { ToolList, ToolForm } from '../../tools/cadastros';
import * as S from './styles';
const titles = {
  1: 'Operações',
  2: 'Máquinas',
  3: 'Ferramentas',
  4: 'Exportar Roteiros',
  5: 'Cadastrar Operação',
  6: 'Detalhes da Operação',
  7: 'Cadastrar Máquina',
  8: 'Detalhes da Máquina',
  9: 'Cadastrar Ferramenta',
  10: 'Detalhes da Ferramenta',
};
export function Scripting() {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(
    () => location.state?.tabKey || '1',
  );
  const [operation, setOperation] = useState(null);
  const [machine, setMachine] = useState(null);
  const [tool, setTool] = useState(null);
  useEffect(() => {
    if (location.state?.tabKey) setActiveKey(location.state.tabKey);
  }, [location.key, location.state?.tabKey]);
  const initialItem = useMemo(() => {
    const state = location.state;
    return state?.toExportSequencesId && state?.toExportSequencesCode
      ? {
          value: state.toExportSequencesId,
          code: state.toExportSequencesCode,
          label: state.toExportSequencesCode,
        }
      : null;
  }, [location.state]);
  const items = [
    {
      key: '1',
      label: 'Lista de Operações',
      children: (
        <OperationList
          active={activeKey === '1'}
          onAdd={() => {
            setOperation(null);
            setActiveKey('5');
          }}
          onSelect={(record) => {
            setOperation(record);
            setActiveKey('6');
          }}
        />
      ),
    },
    {
      key: '2',
      label: 'Lista de Máquinas',
      children: (
        <MachineList
          active={activeKey === '2'}
          onAdd={() => {
            setMachine(null);
            setActiveKey('7');
          }}
          onSelect={(record) => {
            setMachine(record);
            setActiveKey('8');
          }}
        />
      ),
    },
    {
      key: '3',
      label: 'Lista de Ferramentas',
      children: (
        <ToolList
          active={activeKey === '3'}
          onAdd={() => {
            setTool(null);
            setActiveKey('9');
          }}
          onSelect={(record) => {
            setTool(record);
            setActiveKey('10');
          }}
        />
      ),
    },
    {
      key: '4',
      label: 'Exportar Roteiros',
      children: <SequenceExport key={location.key} initialItem={initialItem} />,
    },
    {
      key: '5',
      label: '',
      children:
        activeKey === '5' ? (
          <OperationForm
            isNew
            onBack={() => setActiveKey('1')}
            onSaved={(record, navigate) => {
              setOperation(record);
              setActiveKey(navigate ? '6' : '1');
            }}
          />
        ) : null,
    },
    {
      key: '6',
      label: '',
      children:
        activeKey === '6' && operation ? (
          <OperationForm
            record={operation}
            onBack={() => setActiveKey('1')}
            onSaved={(record, navigate) => {
              setOperation(record);
              setActiveKey(navigate ? '6' : '1');
            }}
          />
        ) : null,
    },
    {
      key: '7',
      label: '',
      children:
        activeKey === '7' ? (
          <MachineForm
            isNew
            onBack={() => setActiveKey('2')}
            onSaved={(record, navigate) => {
              setMachine(record);
              setActiveKey(navigate ? '8' : '2');
            }}
          />
        ) : null,
    },
    {
      key: '8',
      label: '',
      children:
        activeKey === '8' && machine ? (
          <MachineForm
            record={machine}
            onBack={() => setActiveKey('2')}
            onSaved={(record, navigate) => {
              setMachine(record);
              setActiveKey(navigate ? '8' : '2');
            }}
          />
        ) : null,
    },
    {
      key: '9',
      label: '',
      children:
        activeKey === '9' ? (
          <ToolForm
            isNew
            onBack={() => setActiveKey('3')}
            onSaved={(record, navigate) => {
              setTool(record);
              setActiveKey(navigate ? '10' : '3');
            }}
          />
        ) : null,
    },
    {
      key: '10',
      label: '',
      children:
        activeKey === '10' && tool ? (
          <ToolForm
            record={tool}
            onBack={() => setActiveKey('3')}
            onSaved={(record, navigate) => {
              setTool(record);
              setActiveKey(navigate ? '10' : '3');
            }}
          />
        ) : null,
    },
  ];
  return (
    <S.Container>
      <Header />
      <S.ContainerItensContent>
        <SideMenu />
        <S.ContainerContent className="background-content">
          <h1>{titles[activeKey]}</h1>
          <Tab
            tabItems={items}
            activeKey={activeKey}
            onTabChange={setActiveKey}
            page="scripting"
            injectOnChange={false}
          />
        </S.ContainerContent>
      </S.ContainerItensContent>
    </S.Container>
  );
}
