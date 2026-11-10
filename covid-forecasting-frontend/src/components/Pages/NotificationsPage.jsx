import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Button, Checkbox,
  FormControlLabel, TextField, Table, TableHead, TableRow,
  TableCell, TableBody, RadioGroup, Radio,
} from '@mui/material';

export default function NotificationsPage() {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const notifications = [
    { date: '12.07.2026', type: 'Поступление новых данных',      content: 'Обнаружены новые записи в источнике' },
    { date: '14.06.2026', type: 'Необходимость обновления',       content: 'Данные не обновлялись более 28 дней' },
    { date: '25.04.2026', type: 'Успешное завершение прогноза',   content: 'Прогноз SIR построен за 4.2 сек' },
    { date: '28.02.2026', type: 'Ошибка при построении прогноза', content: 'Недостаточно данных для модели ARIMA' },
    { date: '12.01.2026', type: 'Поступление новых данных',       content: 'Загружено 1 250 новых записей' },
    { date: '04.01.2026', type: 'Успешное завершение прогноза',   content: 'Прогноз SEIR сохранён в БД' },
  ];

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Настройка уведомлений
      </Typography>

      {/* Настройки уведомлений */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 3,
            }}
          >
            {/* Типы событий */}
            <Box>
              <Typography variant="h3" sx={{ mb: 1.5 }}>
                Типы событий
              </Typography>
              <FormControlLabel
                control={<Checkbox defaultChecked size="small" />}
                label={<Typography fontSize={13}>Поступление новых данных</Typography>}
              />
              <FormControlLabel
                control={<Checkbox defaultChecked size="small" />}
                label={<Typography fontSize={13}>Необходимость обновления</Typography>}
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label={<Typography fontSize={13}>Успешное завершение</Typography>}
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label={<Typography fontSize={13}>Ошибка прогноза</Typography>}
              />
            </Box>

            {/* Способы доставки */}
            <Box>
              <Typography variant="h3" sx={{ mb: 1.5 }}>
                Способы доставки
              </Typography>
              <RadioGroup defaultValue="email">
                <FormControlLabel
                  value="email"
                  control={<Radio size="small" />}
                  label={<Typography fontSize={13}>Электронная почта</Typography>}
                />
                <FormControlLabel
                  value="interface"
                  control={<Radio size="small" />}
                  label={<Typography fontSize={13}>Интерфейс системы</Typography>}
                />
              </RadioGroup>
            </Box>

            {/* Настройки отправки */}
            <Box>
              <Typography variant="h3" sx={{ mb: 1.5 }}>
                Настройки отправки
              </Typography>
              <TextField
                label="Пороговое значение (дней)"
                type="number"
                fullWidth
                size="small"
                defaultValue={28}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Адрес электронной почты"
                fullWidth
                size="small"
                defaultValue="email@example.com"
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button variant="outlined" sx={{ textTransform: 'none' }}>
              Отменить
            </Button>
            <Button variant="contained" sx={{ textTransform: 'none' }}>
              Сохранить настройки
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Журнал уведомлений */}
      <Card>
        <CardContent>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Журнал уведомлений
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
            <TextField
              label="Тип уведомления"
              size="small"
              sx={{ width: 220 }}
            />
            <TextField
              label="Дата с"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              sx={{ width: 200 }}
            />
            <TextField
              label="Дата по"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              sx={{ width: 200 }}
            />
          </Box>

          <Table className="data-table">
            <TableHead>
              <TableRow>
                <TableCell>Дата</TableCell>
                <TableCell>Тип</TableCell>
                <TableCell>Содержание</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notifications.map((n, idx) => (
                <TableRow key={idx} hover>
                  <TableCell>{n.date}</TableCell>
                  <TableCell>{n.type}</TableCell>
                  <TableCell>{n.content}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}