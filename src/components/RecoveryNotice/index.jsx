import { ReloadOutlined, HomeOutlined } from '@ant-design/icons';
import { useEffect, useId, useRef } from 'react';

import { isAssetLoadError } from '../../utils/uiFailure';
import { validateProp } from '../../utils/validateProp';
import { ButtonBorder } from '../ButtonBorder';
import { ButtonFill } from '../ButtonFill';
import * as S from './styles';

export function RecoveryNotice({ error, onRetry, onHome, onReload }) {
  const heading = useRef(null);
  const id = useId();
  const assetFailure = isAssetLoadError(error);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, []);
  return (
    <S.Container role="alert" aria-labelledby={id}>
      <h2 id={id} ref={heading} tabIndex={-1}>
        Não foi possível exibir esta tela
      </h2>
      <p>
        {assetFailure
          ? 'Não foi possível carregar os arquivos desta tela. Verifique sua conexão e atualize a aplicação para tentar novamente.'
          : 'Ocorreu uma falha inesperada. Você pode tentar abrir esta tela novamente ou voltar ao início.'}
      </p>
      <p>Alterações não salvas nesta tela podem ter sido perdidas.</p>
      <S.Actions>
        <ButtonFill type="button" onClick={assetFailure ? onReload : onRetry}>
          <ReloadOutlined />
          {assetFailure ? 'Atualizar aplicação' : 'Tentar novamente'}
        </ButtonFill>
        <ButtonBorder type="button" onClick={onHome}>
          <HomeOutlined /> Voltar ao início
        </ButtonBorder>
      </S.Actions>
    </S.Container>
  );
}

RecoveryNotice.propTypes = {
  error: validateProp('object'),
  onRetry: validateProp('function', true),
  onHome: validateProp('function', true),
  onReload: validateProp('function', true),
};
