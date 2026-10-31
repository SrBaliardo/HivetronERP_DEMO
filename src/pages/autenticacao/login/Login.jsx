import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

import Logo from '../../../assets/images/logoHivetron.png';
import { InputCheckboxLogin } from './components/InputCheckboxLogin';
import { ModalForgotPassword } from './components/ModalForgotPassword';
import { useLogin } from './hooks/useLogin';
import * as S from './styles';

export function Login() {
  const {
    register,
    rememberMe,
    selectRememberMe,
    submit,
    submitting,
    showPassword,
    togglePassword,
    recoveryVisible,
    openRecovery,
    closeRecovery,
  } = useLogin();

  return (
    <S.Container>
      <S.ContainerContent>
        <S.LeftContainer>
          <S.Title>Hivetron ERP — Demonstração</S.Title>
          <p>
            Usuário: demo · Senha: demo. Acesso demonstrativo, sem cadastro.
          </p>
          <S.Form onSubmit={submit} aria-busy={submitting}>
            <S.InputContainer>
              <label htmlFor="login-username">Usuário</label>
              <S.Input
                id="login-username"
                type="text"
                placeholder="usuario"
                autoComplete="username"
                {...register('username')}
              />
            </S.InputContainer>
            <S.InputContainer>
              <label htmlFor="login-password">Senha</label>
              <S.InputPassword data-input-container>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="*******"
                  autoComplete="current-password"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </button>
              </S.InputPassword>
            </S.InputContainer>
            <S.ContainerSupplement>
              <InputCheckboxLogin
                rememberMe={rememberMe}
                onChange={selectRememberMe}
              />
              <S.RecoveryLink type="button" onClick={openRecovery}>
                Esqueceu sua senha?
              </S.RecoveryLink>
              <ModalForgotPassword
                visible={recoveryVisible}
                onCancel={closeRecovery}
                onConfirm={closeRecovery}
              />
            </S.ContainerSupplement>
            <S.SubmitButton type="submit" disabled={submitting}>
              Entrar na demonstração
            </S.SubmitButton>
          </S.Form>
        </S.LeftContainer>
        <S.RightContainer>
          <S.Logo src={Logo} alt="Hivetron ERP" />
        </S.RightContainer>
      </S.ContainerContent>
    </S.Container>
  );
}
