import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useState } from 'react';

import { validateProp } from '../../utils/validateProp';
import * as S from './styles';

export function InputPasswordModal({
  value,
  onChange,
  id,
  name,
  onBlur,
  disabled,
  autoComplete,
  inputRef,
}) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <S.ContainerInputPassword className="login-input" data-input-container>
      <input
        ref={inputRef}
        id={id}
        name={name}
        onBlur={onBlur}
        autoComplete={autoComplete}
        disabled={disabled}
        type={isShowPassword ? 'text' : 'password'}
        placeholder="*******"
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        disabled={disabled}
        aria-label={isShowPassword ? 'Ocultar senha' : 'Mostrar senha'}
        onClick={() => setIsShowPassword((previous) => !previous)}
      >
        {isShowPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
      </button>
    </S.ContainerInputPassword>
  );
}
InputPasswordModal.propTypes = {
  value: validateProp('string'),
  onChange: validateProp('function'),
  id: validateProp('string'),
  name: validateProp('string'),
  onBlur: validateProp('function'),
  disabled: validateProp('boolean'),
  autoComplete: validateProp('string'),
  inputRef: validateProp(['function', 'object']),
};
