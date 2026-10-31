import { CaretLeftOutlined } from '@ant-design/icons';
import { useId } from 'react';
import { Controller } from 'react-hook-form';

import { ActiveSwitcher } from '../../../../../components/ActiveSwitcher';
import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { DeleteTrigger } from '../../../../../components/ButtonDelete';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { InputCheckboxForm } from '../../../../../components/InputCheckboxForm';
import { InputSelect } from '../../../../../components/InputSelect';
import { ModalAlert } from '../../../../../components/ModalAlert';
import { formatPhone } from '../../../../../utils/phone';
import { validateProp } from '../../../../../utils/validateProp';
import { useUserForm } from '../../hooks/useUserForm';
import { AdminUnlock } from '../AdminUnlock';
import * as S from './styles';

export function UserForm({ user, isNew = false, onSaved, onBack, onDeleted }) {
  const formId = useId();
  const state = useUserForm({ user, isNew, onSaved, onBack, onDeleted });
  const {
    form,
    editing: isEditing,
    passwordEnabled: isPasswordBlock,
    permissionEnabled,
    navigateAfterSave: navigateCheck,
    setNavigateAfterSave: setNavigateCheck,
    unlockTarget,
    setUnlockTarget,
    deleting,
    setDeleting,
    roles,
    pending,
    save: onSubmit,
    discard: handleDiscard,
    edit: handleEdit,
    requestDelete,
    confirmDelete,
    unlock,
  } = state;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    trigger,
    formState: { errors },
  } = form;
  const isDeleteButtonVisible = !isNew && !isEditing;
  const passwordIcon = isPasswordBlock ? <S.Unlock /> : <S.Lock />;
  const permissionIcon = permissionEnabled ? <S.Unlock /> : <S.Lock />;
  return (
    <S.Container>
      <S.Form
        as="form"
        id={formId}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <S.Container1>
          <div className="div-id">
            <label htmlFor={`${formId}-registration`}>
              Matrícula: <span>*</span>
            </label>
            <input
              id={`${formId}-registration`}
              aria-invalid={Boolean(errors.registration)}
              aria-required="true"
              type="text"
              placeholder="Matrícula"
              {...register('registration')}
              className={errors.registration ? 'input-error' : ''}
              disabled={!isEditing || pending}
            />
            {errors.registration && (
              <span className="error-message">Matrícula é obrigatória</span>
            )}
          </div>
          <div>
            <label htmlFor={`${formId}-name`}>
              Nome: <span>*</span>
            </label>
            <input
              id={`${formId}-name`}
              aria-invalid={Boolean(errors.name)}
              aria-required="true"
              type="text"
              placeholder="Nome"
              {...register('name')}
              className={errors.name ? 'input-error' : ''}
              disabled={!isEditing || pending}
            />
            {errors.name && (
              <span className="error-message">Nome é obrigatório</span>
            )}
          </div>
        </S.Container1>

        <S.Container2>
          <div className="div-phone">
            <label htmlFor={`${formId}-phone`}>Telefone:</label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id={`${formId}-phone`}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={
                    errors.phone ? `${formId}-phone-error` : undefined
                  }
                  className={errors.phone ? 'input-error' : ''}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="Telefone"
                  maxLength={15}
                  value={formatPhone(field.value)}
                  onKeyDown={(event) => {
                    const input = event.currentTarget;
                    if (
                      event.key === 'Backspace' &&
                      input.selectionStart === input.selectionEnd &&
                      input.selectionStart === input.value.length &&
                      /\D$/.test(input.value)
                    ) {
                      event.preventDefault();
                      const digits = input.value.replace(/\D/g, '');
                      field.onChange(formatPhone(digits.slice(0, -1)));
                      if (errors.phone) void trigger('phone');
                    }
                  }}
                  onChange={(event) => {
                    field.onChange(formatPhone(event.target.value));
                    if (errors.phone) void trigger('phone');
                  }}
                  onBlur={() => {
                    field.onBlur();
                    if (isEditing) void trigger('phone');
                  }}
                  disabled={!isEditing || pending}
                />
              )}
            />
            {errors.phone && (
              <span
                id={`${formId}-phone-error`}
                className="error-message"
                role="alert"
              >
                {errors.phone.message}
              </span>
            )}
          </div>
          <div>
            <label htmlFor={`${formId}-email`}>
              E-mail: <span>*</span>
            </label>
            <input
              id={`${formId}-email`}
              aria-invalid={Boolean(errors.email)}
              aria-required="true"
              type="email"
              placeholder="E-mail"
              {...register('email')}
              className={errors.email ? 'input-error' : ''}
              disabled={!isEditing || pending}
            />
            {errors.email && (
              <span className="error-message">E-mail é obrigatório</span>
            )}
          </div>
        </S.Container2>

        <S.Container3>
          <div>
            <label htmlFor={`${formId}-employeePosition`}>Função:</label>
            <input
              id={`${formId}-employeePosition`}
              aria-invalid={Boolean(errors.employeePosition)}
              type="text"
              placeholder="Função"
              {...register('employeePosition')}
              disabled={!isEditing || pending}
            />
          </div>
          <div>
            <label htmlFor={`${formId}-sector`}>Setor:</label>
            <input
              id={`${formId}-sector`}
              aria-invalid={Boolean(errors.sector)}
              type="text"
              placeholder="Setor"
              {...register('sector')}
              disabled={!isEditing || pending}
            />
          </div>
        </S.Container3>

        <S.Container4 className="container4">
          <div className="div-user login">
            <label htmlFor={`${formId}-username`}>
              Login: <span>*</span>
            </label>
            <input
              id={`${formId}-username`}
              aria-invalid={Boolean(errors.username)}
              aria-required="true"
              type="text"
              placeholder="Login"
              {...register('username')}
              className={errors.username ? 'input-error' : ''}
              disabled={!isEditing || pending}
            />
            {errors.username && (
              <span className="error-message">Login é obrigatório</span>
            )}
          </div>
          <div className="div-pass">
            <div className="div-user">
              <label htmlFor={`${formId}-password`}>
                Senha: {isNew || isPasswordBlock ? <span>*</span> : null}
              </label>
              <input
                id={`${formId}-password`}
                aria-invalid={Boolean(errors.password)}
                aria-required={isPasswordBlock}
                type="password"
                placeholder="*******"
                {...register('password')}
                className={errors.password ? 'input-error' : ''}
                disabled={!isPasswordBlock || pending}
              />
              {errors.password && (
                <span className="error-message">Senha é obrigatória</span>
              )}
            </div>
            {isPasswordBlock && (
              <div className="div-user">
                <label htmlFor={`${formId}-confirm_password`}>
                  Confirmar senha: <span>*</span>
                </label>
                <input
                  id={`${formId}-confirm_password`}
                  aria-invalid={Boolean(errors.confirm_password)}
                  aria-required="true"
                  type="password"
                  placeholder="*******"
                  {...register('confirm_password')}
                  disabled={!isPasswordBlock || pending}
                />
                {errors.confirm_password && (
                  <span className="error-message">
                    {errors.confirm_password.message}
                  </span>
                )}
              </div>
            )}
            <S.DivModal className="div-modal">
              <S.UnlockButton
                type="button"
                aria-label="Liberar edição da senha"
                disabled={!isEditing || isNew || pending}
                onClick={() => setUnlockTarget('password')}
              >
                {passwordIcon}
              </S.UnlockButton>
            </S.DivModal>
          </div>
        </S.Container4>

        <S.Container5>
          <div className="div-role">
            <label>
              Permissão: <span>*</span>
            </label>
            <S.Select>
              <InputSelect
                listboxHeight={150}
                ariaLabel="Permissão"
                name="role"
                selectOptions={roles}
                placeholder="Selecione"
                value={watch('role')}
                disabled={!permissionEnabled || pending}
                onChange={(e) => setValue('role', e.target.value)}
              />

              <S.DivModal>
                <S.UnlockButton
                  type="button"
                  aria-label="Liberar edição da permissão"
                  disabled={!isEditing || isNew || pending}
                  onClick={() => setUnlockTarget('permission')}
                >
                  {permissionIcon}
                </S.UnlockButton>
              </S.DivModal>
            </S.Select>
            {errors.role && (
              <span className="error-message">Permissão é obrigatória</span>
            )}
          </div>

          {!isNew && (
            <div className="div-active">
              <label>Cadastro ativo?</label>
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <ActiveSwitcher
                    checked={
                      field.value === undefined ? true : Boolean(field.value)
                    }
                    onChange={field.onChange}
                    disabled={!isEditing || pending}
                  />
                )}
              />
            </div>
          )}

          <div className="navigation-option">
            <label>Navegar para o usuário após salvar:</label>
            <InputCheckboxForm
              ariaLabel="Navegar para o usuário após salvar"
              disabled={!isEditing || pending}
              checked={navigateCheck}
              onChange={(e) => setNavigateCheck(e.target.checked)}
            />
          </div>
        </S.Container5>
      </S.Form>

      <S.ContainerButtons>
        <S.ContainerE>
          {!isNew && isDeleteButtonVisible && (
            <DeleteTrigger
              type="button"
              disabled={pending}
              onClick={requestDelete}
            >
              Excluir
            </DeleteTrigger>
          )}
        </S.ContainerE>

        <div>
          <ButtonBorder
            type="button"
            disabled={pending}
            onClick={handleDiscard}
          >
            {!isEditing && <CaretLeftOutlined aria-hidden="true" />}
            {isEditing ? 'Cancelar' : 'Voltar'}
          </ButtonBorder>

          {!isEditing ? (
            <ButtonFill
              key="edit"
              type="button"
              disabled={pending}
              onClick={handleEdit}
            >
              <S.Edit />
              Editar
            </ButtonFill>
          ) : (
            <ButtonFill
              key="save"
              type="submit"
              form={formId}
              disabled={pending}
            >
              <S.Save />
              Salvar
            </ButtonFill>
          )}
        </div>
      </S.ContainerButtons>

      <AdminUnlock
        visible={Boolean(unlockTarget)}
        onCancel={() => setUnlockTarget(null)}
        onConfirm={unlock}
      />

      <ModalAlert
        visible={deleting}
        onCancel={() => setDeleting(false)}
        onConfirm={confirmDelete}
        disabled={pending}
      />
    </S.Container>
  );
}

UserForm.propTypes = {
  user: validateProp('object'),
  isNew: validateProp('boolean'),
  onSaved: validateProp('function', true),
  onBack: validateProp('function', true),
  onDeleted: validateProp('function'),
};
