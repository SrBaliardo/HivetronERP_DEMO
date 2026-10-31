import { SearchOutlined } from '@ant-design/icons';

import Trash from '../../../assets/images/TrashRed.png';
import { ButtonBorder } from '../../../components/ButtonBorder';
import { ButtonFill } from '../../../components/ButtonFill';
import { ButtonSearch } from '../../../components/ButtonSearch';
import { InputCheckboxForm } from '../../../components/InputCheckboxForm';
import { ListTable } from '../../../components/ListTable';
import { ModalAlert } from '../../../components/ModalAlert';
import { validateProp } from '../../../utils/validateProp';
import { ItemPicker } from './components/ItemPicker';
import { useSequenceExport } from './hooks/useSequenceExport';
import * as S from './styles';
import {
  destinationActionColumnWidth,
  destinationTableColumns,
  tabTableColumns,
} from './tabTableColumns';
export function SequenceExport({ initialItem }) {
  const form = useSequenceExport(initialItem);
  return (
    <S.Container aria-busy={form.loading || form.pending}>
      <S.ContainerContent>
        <h1>Selecione o item para exportar as sequências</h1>
        <S.SearchRow>
          <S.Picker>
            <ItemPicker
              key={form.pickerVersion}
              initialItem={form.source}
              onSelect={form.setSource}
              label="Item de origem"
              placeholder="Informe um código"
              disabled={form.pending || form.loading}
            />
          </S.Picker>
          <ButtonSearch
            type="button"
            onClick={form.search}
            disabled={form.loading || form.pending}
          >
            <SearchOutlined /> Buscar
          </ButtonSearch>
        </S.SearchRow>
      </S.ContainerContent>
      <div className="bar" />
      {form.loading && (
        <div role="status" className="loading-message">
          Carregando...
        </div>
      )}
      {form.error && (
        <div role="alert">
          Erro ao conectar com o servidor.{' '}
          <ButtonBorder type="button" onClick={form.search}>
            Tentar novamente
          </ButtonBorder>
        </div>
      )}
      {form.loadedSource && (
        <>
          <S.ContainerBatch>
            <S.ContainerContentBatch>
              <h1>Roteiros de: {form.loadedSource.code}</h1>
            </S.ContainerContentBatch>
            <ListTable
              label="Sequências para exportar"
              columns={tabTableColumns}
              rows={form.sequences}
              renderHeader={(column) =>
                column.key === 'selection' ? (
                  <div className="checkBox">
                    <InputCheckboxForm
                      ariaLabel="Selecionar todas as sequências"
                      checked={form.selectAll}
                      onChange={form.toggleAll}
                      disabled={form.pending || form.loading}
                    />
                  </div>
                ) : (
                  column.title
                )
              }
              renderCell={(item, column) => {
                if (column.key === 'selection')
                  return (
                    <div className="checkBox">
                      <InputCheckboxForm
                        ariaLabel={'Selecionar sequência ' + item.sequence}
                        checked={form.selectedIds.includes(item.id)}
                        onChange={() => form.toggle(item.id)}
                        disabled={form.pending || form.loading}
                      />
                    </div>
                  );
                if (column.key === 'collectiveTime') {
                  const modality =
                    item.collectiveTime === true ? 'Coletivo' : 'Individual';
                  return <p title={modality}>{modality}</p>;
                }
                const value =
                  column.key === 'isMain'
                    ? item.isMain
                      ? 'Principal'
                      : 'Alternativo'
                    : item[column.key];
                return <p title={String(value ?? '')}>{value}</p>;
              }}
            />
          </S.ContainerBatch>
          <S.ContainerBatch2>
            <S.ContainerContentBatch2>
              <h1>Exportar para:</h1>
              <S.Picker>
                <ItemPicker
                  key={form.pickerVersion}
                  onSelect={form.addDestination}
                  label="Item de destino"
                  placeholder="Buscar item"
                  clearOnSelect
                  disabled={form.pending}
                />
              </S.Picker>
            </S.ContainerContentBatch2>
            <div className="bar bar2" />
            <ListTable
              label="Itens de destino da exportação"
              columns={destinationTableColumns}
              rows={form.destinations}
              showHeader={false}
              actionColumnWidth={destinationActionColumnWidth}
              renderAction={(item) => (
                <S.TrashButton
                  type="button"
                  aria-label={'Remover destino ' + item.code}
                  disabled={form.pending}
                  onClick={() => form.setItemToDelete(item)}
                >
                  <img src={Trash} alt="" />
                </S.TrashButton>
              )}
            />
          </S.ContainerBatch2>
          <ModalAlert
            visible={Boolean(form.itemToDelete)}
            onCancel={() => form.setItemToDelete(null)}
            onConfirm={form.confirmDelete}
            disabled={form.pending}
            title="Remover Item"
            message="Deseja remover este item da lista de destino?"
          />
          <S.ContainerButtons>
            <ButtonFill
              type="button"
              onClick={form.exportSelected}
              disabled={form.pending || form.loading}
            >
              <S.Export /> Exportar
            </ButtonFill>
          </S.ContainerButtons>
        </>
      )}
    </S.Container>
  );
}
SequenceExport.propTypes = { initialItem: validateProp('object') };
