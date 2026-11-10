import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1565C0',
      dark: '#0D47A1',
      light: '#E3F2FD',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00897B',
      contrastText: '#FFFFFF',
    },
    success: { main: '#2E7D32' },
    warning: { main: '#F9A825' },
    error:   { main: '#C62828' },
    info:    { main: '#0288D1' },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212121',
      secondary: '#616161',
    },
    divider: '#E0E4E8',
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontSize: '32px', lineHeight: '40px', fontWeight: 500 },
    h2: { fontSize: '24px', lineHeight: '32px', fontWeight: 500 },
    h3: { fontSize: '20px', lineHeight: '28px', fontWeight: 500 },
    body1: { fontSize: '16px', lineHeight: '24px' },
    body2: { fontSize: '14px', lineHeight: '20px' },
    caption: { fontSize: '12px', lineHeight: '16px' },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 2px 8px rgba(0,0,0,0.08)',
    '0 4px 12px rgba(0,0,0,0.10)',
    '0 8px 24px rgba(0,0,0,0.16)',
    // ... остальные уровни
  ],
});