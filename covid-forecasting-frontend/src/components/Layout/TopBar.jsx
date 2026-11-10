import React from 'react';
import {
  AppBar, Toolbar, Typography, Box, IconButton, Badge, Button,
} from '@mui/material';
import { BarChart, Settings, Person, Notifications } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const topNavItems = [
  { label: 'Статистика', icon: <BarChart />, path: '/forecast' },
  { label: 'Настройка',  icon: <Settings />, path: '/notifications' },
  { label: 'Профиль',    icon: <Person />,   path: '/profile' },
];

export default function TopBar({ unreadCount = 2 }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        borderBottom: '1px solid #E0E4E8',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          minHeight: '64px !important',
          px: 3,
        }}
      >
        {/* Логотип в одну строку */}
        <Box
          sx={{ display: 'flex', alignItems: 'baseline', gap: 1, cursor: 'pointer' }}
          onClick={() => navigate('/forecast')}
        >
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 700,
              color: 'text.primary',
              letterSpacing: '0.3px',
            }}
          >
            COVID-19
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 400,
              color: 'text.secondary',
            }}
          >
            Forecasting System
          </Typography>
        </Box>

        {/* Навигация по центру */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {topNavItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                onClick={() => navigate(item.path)}
                startIcon={item.icon}
                disableRipple
                sx={{
                  textTransform: 'none',
                  fontSize: 14,
                  fontWeight: active ? 500 : 400,
                  color: active ? 'primary.main' : 'text.secondary',
                  backgroundColor: active ? 'primary.light' : 'transparent',
                  borderRadius: '999px',
                  px: 2,
                  py: 0.8,
                  '&:hover': {
                    backgroundColor: active ? 'primary.light' : 'background.default',
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>

        {/* Иконка уведомлений */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            sx={{
              backgroundColor: 'background.default',
              width: 44,
              height: 44,
              '&:hover': { backgroundColor: 'primary.light' },
            }}
          >
            <Badge
              badgeContent={unreadCount}
              color="error"
              overlap="circular"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Notifications />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}