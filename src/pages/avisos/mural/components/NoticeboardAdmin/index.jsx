import { PushpinOutlined, AlertOutlined } from '@ant-design/icons';
import { List } from 'antd';
import { format } from 'date-fns';
import { useId } from 'react';
import { useWatch } from 'react-hook-form';

import Trash from '../../../../../assets/images/TrashRed.png';
import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { ModalAlert } from '../../../../../components/ModalAlert';
import { formatDate } from '../../../../../utils/formatDate';
import { validateProp } from '../../../../../utils/validateProp';
import { useNoticeboard } from '../../hooks/useNoticeboard';
import { useNoticeFormScroll } from '../../hooks/useNoticeFormScroll';
import * as S from './styles';

export function NoticeboardAdmin({ active = true }) {
  const id = useId();
  const state = useNoticeboard(active);
  const {
    messages,
    loading,
    error,
    refresh,
    form,
    selection: currentMessage,
    mode,
    deleteTarget,
    setDeleteTarget,
    show,
    add: handleNewNotice,
    save: handlePost,
    close: handleDiscard,
    requestDelete,
    confirmDelete,
    pending,
  } = state;
  const { formRef, requestFormScroll } = useNoticeFormScroll(mode);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const description = useWatch({
    control: form.control,
    name: 'description',
    defaultValue: '',
  });
  const isFormVisible = mode === 'view' || mode === 'edit' || mode === 'create';
  const isEditing = mode === 'edit' || mode === 'create';
  const isViewing = mode === 'view';
  const showAlert = mode === 'limit';

  return (
    <S.Container>
      <S.LeftDiv>
        {loading && (
          <p role="status" className="loading-message">
            Carregando avisos...
          </p>
        )}

        {error && (
          <div role="alert">
            Erro ao buscar avisos.{' '}
            <ButtonBorder type="button" onClick={refresh}>
              Tentar novamente
            </ButtonBorder>
          </div>
        )}

        {!loading && !error && messages.length === 0 && (
          <p>Nenhum aviso cadastrado.</p>
        )}

        <S.StyledList
          itemLayout="horizontal"
          dataSource={messages}
          rowKey="id"
          renderItem={(item) => (
            <List.Item
              className="notice-item-admin"
              actions={[
                <S.ActionButton
                  key="edit"
                  type="button"
                  disabled={pending}
                  aria-label={`Editar aviso ${item.title}`}
                  onClick={() => {
                    show(item, false);
                    requestFormScroll();
                  }}
                >
                  <S.EditButton />
                </S.ActionButton>,

                <S.ActionButton
                  key="delete"
                  type="button"
                  disabled={pending}
                  aria-label={`Excluir aviso ${item.title}`}
                  onClick={() => requestDelete(item)}
                >
                  <S.TrashButton src={Trash} alt="" />
                </S.ActionButton>,
              ]}
            >
              <List.Item.Meta
                avatar={formatDate(item.updatedAt)}
                title={
                  <S.ViewButton
                    type="button"
                    disabled={pending}
                    onClick={() => show(item, true)}
                  >
                    {item.title}
                  </S.ViewButton>
                }
                description=""
              />
            </List.Item>
          )}
        />

        <ButtonFill
          type="button"
          disabled={pending || loading || error}
          onClick={() => {
            handleNewNotice();
            requestFormScroll();
          }}
        >
          <S.PlusIcon /> Criar Aviso
        </ButtonFill>

        <p className="paragraph-primary">
          * limite máximo permitido {messages.length}/5 avisos.
        </p>
      </S.LeftDiv>

      <S.Divider />

      <S.RightDiv>
        {showAlert && !isEditing ? (
          <S.DivAlert className="notice-item-admin">
            <hr />
            <h1>
              <span>
                <AlertOutlined />
              </span>
              <br />
              Limite máximo atingido!
              <br />
              Exclua pelo menos um aviso para liberar espaço.
            </h1>
            <hr />
          </S.DivAlert>
        ) : (
          isFormVisible && (
            <form
              ref={formRef}
              onSubmit={handleSubmit(handlePost)}
              className="notice-item-admin"
            >
              <S.ContainerFormContent>
                <S.ContainerData>
                  <label
                    htmlFor={`${id}-date`}
                    className="form-notice-admin-label"
                  >
                    Data:
                  </label>
                  <input
                    id={`${id}-date`}
                    value={
                      currentMessage
                        ? formatDate(
                            currentMessage.updatedAt ||
                              currentMessage.createdAt,
                          )
                        : format(new Date(), 'dd/MM/yyyy')
                    }
                    className="form-notice-admin-disabled-input"
                    disabled
                  />
                </S.ContainerData>

                <S.ContainerTitle>
                  <label
                    htmlFor={`${id}-title`}
                    className="form-notice-admin-label"
                  >
                    Título: <span className="span-required">*</span>
                  </label>
                  <input
                    id={`${id}-title`}
                    aria-invalid={Boolean(errors.title)}
                    {...register('title')}
                    className={`form-notice-admin-input ${isViewing ? 'not-allowed' : ''}`}
                    disabled={isViewing || pending}
                  />
                  {errors.title && (
                    <p className="error-message">{errors.title.message}</p>
                  )}
                </S.ContainerTitle>

                <S.ContainerDescription>
                  <label
                    htmlFor={`${id}-description`}
                    className="form-notice-admin-label"
                  >
                    Descrição: <span className="span-required">*</span>
                  </label>
                  <textarea
                    id={`${id}-description`}
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={`${id}-description-count`}
                    {...register('description')}
                    maxLength={340}
                    className={`form-notice-admin-input ${isViewing ? 'not-allowed' : ''}`}
                    disabled={isViewing || pending}
                  />
                  {errors.description && (
                    <p className="error-message">
                      {errors.description.message}
                    </p>
                  )}

                  <p
                    id={`${id}-description-count`}
                    className="paragraph-primary"
                  >
                    {description.length} / 340
                  </p>
                </S.ContainerDescription>
              </S.ContainerFormContent>

              {isEditing && (
                <S.ContainerButtons>
                  <ButtonBorder
                    type="button"
                    disabled={pending}
                    onClick={handleDiscard}
                  >
                    Cancelar
                  </ButtonBorder>

                  <ButtonFill type="submit" disabled={pending}>
                    <S.PostIcon /> Postar
                  </ButtonFill>
                </S.ContainerButtons>
              )}
            </form>
          )
        )}

        {messages.length < 5 && !isFormVisible && (
          <S.DivH1 className="notice-item-admin">
            <hr />
            <h1>
              Mural sem Papel
              <span>
                <PushpinOutlined />
              </span>
            </h1>
            <hr />
          </S.DivH1>
        )}
      </S.RightDiv>

      <ModalAlert
        visible={Boolean(deleteTarget)}
        disabled={pending}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </S.Container>
  );
}

NoticeboardAdmin.propTypes = { active: validateProp('boolean') };
