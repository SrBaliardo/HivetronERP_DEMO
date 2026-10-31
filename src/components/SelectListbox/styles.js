import styled from '@emotion/styled';
import Popper from '@mui/material/Popper';

export const Listbox = styled(Popper, {
  shouldForwardProp: (prop) => !['$width', '$height', '$font'].includes(prop),
})`
  display: flex;
  flex-direction: column;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  max-width: calc(100vw - 16px);
  box-sizing: border-box;
  overflow-y: auto;
  overscroll-behavior: contain;
  font: ${({ $font }) => $font};
  background-color: ${({ theme }) => theme.dropdownBackground};
  border: 1.5px solid ${({ theme }) => theme.formNoticeAdminBorder};
  border-radius: 7px;
  z-index: ${({ theme }) => theme.zIndex.modal + 1};

  && [role='option']:hover,
  && [role='option']:active {
    transform: none;
    opacity: 1;
  }

  > * {
    flex-shrink: 0;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  min-width: 0;

  > * {
    flex-shrink: 0;
  }
`;
