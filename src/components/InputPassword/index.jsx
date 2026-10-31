import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useState } from 'react';

import * as S from './styles';

export function InputPassword() {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleViewPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <S.ContainerInputPassword className="login-input" data-input-container>
      <input
        type={isShowPassword ? 'text' : 'password'}
        placeholder="*******"
      />
      <button type="button" onClick={toggleViewPassword}>
        {isShowPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
      </button>
    </S.ContainerInputPassword>
  );
}
