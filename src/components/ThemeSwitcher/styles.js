import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

export const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 56,
  height: 44,
  padding: '10px 8px',
  flexShrink: 0,
  '& .MuiSwitch-switchBase': {
    top: 10,
    left: 8,
    padding: 3,
    color: theme.thumbThemeSwitch,
    transition: 'transform 160ms ease',
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      outline: '2px solid ' + theme.focusRing,
      outlineOffset: 3,
    },
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: theme.thumbThemeSwitch,
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.trackThemeSwitch,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 18,
    height: 18,
    backgroundColor: theme.thumbThemeSwitch,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.trackThemeSwitch,
    border: '1px solid ' + theme.switchTrackBorder,
    borderRadius: 12,
    transition: 'background-color 160ms ease',
  },
  '@media (prefers-reduced-motion: reduce)': {
    '& .MuiSwitch-switchBase, & .MuiSwitch-track': { transition: 'none' },
  },
}));
