import React from 'react';
import {
  Box, Card, CardContent, Typography, Table, TableHead,
  TableRow, TableCell, TableBody, IconButton, TextField, Button,
} from '@mui/material';
import { Visibility, Download, Delete } from '@mui/icons-material';

export default function HistoryPage() {
  const rows = [
    { date: '12.07.2026', method: 'SIR',        region: 'Минск',   horizon: 14, rmse: 125430, mape: 8.4 },
    { date: '14.06.2026', method: 'ARIMA',      region: 'Гомель',  horizon: 30, rmse: 98450,  mape: 6.2 },
    { date: '25.04.2026', method: 'SEIR',       region: 'Брест',   horizon: 21, rmse: 110220, mape: 7.9 },
    { date: '28.02.2026', method: 'SIS',        region: 'Витебск', horizon: 14, rmse: 141870, mape: 9.1 },
    { date: '12.01.2026', method: 'Скользящие', region: 'Минск',   horizon: 7,  rmse: 65230,  mape: 5.4 },
  ];

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 3 }}>История прогнозов</Typography>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField label="Метод" size="small" sx={{ width: 200 }} />
            <TextField label="Регион" size="small" sx={{ width: 200 }} />
            <TextField label="Дата с" type="date" size="small"
                       InputLabelProps={{ shrink: true }} sx={{ width: 200 }} />
            <TextField label="Дата по" type="date" size="small"
                       InputLabelProps={{ shrink: true }} sx={{ width: 200 }} />
            <Button variant="contained" sx={{ textTransform: 'none' }}>Применить</Button>
          </Box>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Дата</TableCell>
                <TableCell>Метод</TableCell>
                <TableCell>Регион</TableCell>
                <TableCell align="right">Горизонт</TableCell>
                <TableCell align="right">RMSE</TableCell>
                <TableCell align="right">MAPE</TableCell>
                <TableCell align="center">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow key={idx} hover>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.method}</TableCell>
                  <TableCell>{row.region}</TableCell>
                  <TableCell align="right">{row.horizon}</TableCell>
                  <TableCell align="right" sx={{ fontFamily: 'Roboto Mono, monospace' }}>
                    {row.rmse.toLocaleString('ru-RU')}
                  </TableCell>
                  <TableCell align="right" sx={{ fontFamily: 'Roboto Mono, monospace' }}>
                    {row.mape}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small"><Visibility fontSize="small" /></IconButton>
                    <IconButton size="small"><Download fontSize="small" /></IconButton>
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