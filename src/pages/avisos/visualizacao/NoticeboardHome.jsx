import { List } from 'antd';

import { ButtonBorder } from '../../../components/ButtonBorder';
import { useAvisos } from '../../../contexts/avisos';
import { useAsyncList } from '../../../hooks/useAsyncList';
import { formatDate } from '../../../utils/formatDate';
import * as S from './styles';

export function NoticeboardHome() {
  const { listNotices } = useAvisos();
  const { items, loading, error, refresh } = useAsyncList(listNotices);
  return (
    <S.Container>
      <S.ContainerContent>
        {error && (
          <div role="alert">
            Erro ao buscar avisos.{' '}
            <ButtonBorder type="button" onClick={refresh}>
              Tentar novamente
            </ButtonBorder>
          </div>
        )}
        <List
          itemLayout="horizontal"
          rowKey="id"
          loading={loading}
          dataSource={items}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={formatDate(item.updatedAt)}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </S.ContainerContent>
    </S.Container>
  );
}
