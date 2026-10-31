import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

import falseImage from '../../assets/images/false.png';
import trueImage from '../../assets/images/true.png';

export const CustomSwitch = styled(Switch)(({ theme, color }) => ({
  width: 50,
  height: 34,
  padding: 8,
  '& .MuiSwitch-switchBase.Mui-focusVisible': {
    outline: '2px solid ' + theme.focusRing,
    outlineOffset: 2,
  },
  '& .MuiSwitch-switchBase': {
    margin: 4,
    padding: 3,
    transform: 'translateX(1px)',
    '&.Mui-checked': {
      color: '#ffffff',
      transform: 'translateX(16px)',
      '& .MuiSwitch-thumb:before': {
        position: 'absolute',
        top: '47%',
        left: '50%',
        width: 20,
        height: 20,
        content: `url(${color === 'success' ? trueImage : falseImage})`,
        backgroundSize: 'cover',
        transform: 'translate(-50%, -50%)',
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: 'transparent',
        borderRadius: 20 / 2,
        border: '1.5px solid ' + theme.accentText,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#fcfcfc' : '#212121',
    width: 19,
    height: 19,
    position: 'relative',
    '&:before': {
      position: 'absolute',
      top: '49%',
      left: '47%',
      width: 20,
      height: 20,
      content: `url(${color === 'success' ? trueImage : falseImage})`,
      backgroundSize: 'cover',
      transform: 'translate(-50%, -50%)',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: 'transparent',
    borderRadius: 20 / 2,
    border: 'thin solid ' + theme.accentText,
  },
}));
