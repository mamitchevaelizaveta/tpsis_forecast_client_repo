import React from 'react';
import {
  Box, Card, CardContent, Typography, Table, TableHead,
  TableRow, TableCell, TableBody, IconButton, Button,
  TextField, Chip,
} from '@mui/material';
import { Edit, LockReset, Block, Delete, PersonAdd } from '@mui/icons-material';

export default function UsersPage() {
  const users = [
    { login: 'analyst',     name: 'Мамичева Е.А.',     role: 'Аналитик',      status: 'Активен',  created: '01.01.2026', last: '12.07.2026' },
    { login: 'admin',       name: 'Иванов И.И.',       role: 'Администратор', status: 'Активен',  created: '01.01.2026', last: '12.07.2026' },
    { login: 'epidemiolog', name: 'Петров П.П.',       role: 'Аналитик',      status: 'Заблокирован', created: '15.03.2026', last: '01.06.2026' },
  ];

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 3 }}>Управление пользователями</Typography>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <TextField label="Поиск по логину" size="small" sx={{ width: 300 }} />
            <Button
              variant="contained"
              startIcon={<PersonAdd />}
              sx={{ textTransform: 'none' }}
            >
              Добавить пользователя
            </Button>
          </Box>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Логин</TableCell>
                <TableCell>ФИО</TableCell>
                <TableCell>Роль</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Дата регистрации</TableCell>
                <TableCell>Последняя авторизация</TableCell>
                <TableCell align="center">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.login} hover>
                  <TableCell>{u.login}</TableCell>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={u.status}
                      color={u.status === 'Активен' ? 'success' : 'default'}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{u.created}</TableCell>
                  <TableCell>{u.last}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small"><Edit fontSize="small" /></IconButton>
                    <IconButton size="small"><LockReset fontSize="small" /></IconButton>
                    <IconButton size="small"><Block fontSize="small" /></IconButton>
                    <IconButton size="small"><Delete fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}