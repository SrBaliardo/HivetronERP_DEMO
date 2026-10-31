import styled from '@emotion/styled';

export const ContainerInputPassword = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  height: 40px;
  font-size: 1rem;
  padding-left: 10px;
  border: 1.5px solid #b85b00;
  &:focus-within {
    outline: 2px solid #ff8c00;
    outline-offset: -1px;
  }

  input {
    background-color: transparent;
    color: #6c7883;
    width: 100%;
    font-size: 1rem;
  }

  button {
    background-color: transparent;
    padding-right: 10px;
    color: #6c7883;
  }
`;
