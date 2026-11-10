import React from 'react';
import {
  Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Typography, Box, Avatar,
} from '@mui/material';
import {
  CloudUpload, History, Notifications, People, Logout,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'Управление данными', icon: <CloudUpload />, path: '/data',          roles: ['analyst', 'admin'] },
  { label: 'История прогнозов',   icon: <History />,    path: '/history',       roles: ['analyst'] },
  { label: 'Уведомления',         icon: <Notifications />, path: '/notifications', roles: ['analyst'] },
  { label: 'Пользователи',        icon: <People />,     path: '/users',         roles: ['admin'] },
];

export default function Sidebar({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          borderRight: '1px solid #E0E4E8',
          display: 'flex',
          flexDirection: 'column',
          top: 64,
          height: 'calc(100% - 64px)',
          position: 'fixed',
        },
      }}
    >
      <List sx={{ flex: 1, pt: 2 }}>
        {menuItems
          .filter((item) => item.roles.includes(user.role))
          .map((item) => {
            const active = location.pathname === item.path;
            return (
              <ListItemButton
                key={item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  mx: 1,
                  mb: 0.5,
                  borderRadius: 1,
                  backgroundColor: active ? 'primary.light' : 'transparent',
                  borderLeft: active ? '3px solid' : '3px solid transparent',
                  borderColor: active ? 'primary.main' : 'transparent',
                  '&:hover': { backgroundColor: 'primary.light' },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: active ? 'primary.main' : 'text.secondary',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: active ? 500 : 400,
                    color: active ? 'primary.main' : 'text.primary',
                  }}
                />
              </ListItemButton>
            );
          })}
      </List>

      <Box
        sx={{
          p: 2,
          borderTop: '1px solid #E0E4E8',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: 14 }}>
          {user.name?.[0]}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" noWrap fontSize={13}>
            {user.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" fontSize={11}>
            {user.role}
          </Typography>
        </Box>
        <ListItemButton
          onClick={onLogout}
          sx={{ minWidth: 0, p: 0.5, borderRadius: '50%' }}
        >
          <Logout fontSize="small" />
        </ListItemButton>
      </Box>
    </Drawer>
  );
}