import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Button, Select, MenuItem,
  FormControl, InputLabel, Table, TableHead, TableRow, TableCell,
  TableBody, Chip, LinearProgress,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

export default function DataManagementPage() {
  const [source, setSource] = useState('file');
  const [uploading, setUploading] = useState(false);

  const files = [
    { name: 'данные1.csv', type: 'CSV', status: 'success' },
    { name: 'данные2.csv', type: 'CSV', status: 'success' },
    { name: 'данные3.csv', type: 'CSV', status: 'success' },
    { name: 'данные4.csv', type: 'CSV', status: 'success' },
    { name: 'данные5.csv', type: 'CSV', status: 'success' },
  ];

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 3 }}>Управление данными</Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h3" gutterBottom>Загрузка данных</Typography>

            <FormControl fullWidth margin="normal" size="small">
              <InputLabel>Источник данных</InputLabel>
              <Select value={source} onChange={(e) => setSource(e.target.value)} label="Источник данных">
                <MenuItem value="file">Файл (CSV, XLSX)</MenuItem>
                <MenuItem value="api">API Минздрава</MenuItem>
                <MenuItem value="db">Внешняя база данных</MenuItem>
              </Select>
            </FormControl>

            <Box
              sx={{
                border: '2px dashed #E0E4E8',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                mt: 2,
                mb: 2,
                cursor: 'pointer',
                '&:hover': { borderColor: 'primary.main', backgroundColor: 'primary.light' },
              }}
            >
              <CloudUpload sx={{ fontSize: 48, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ mt: 1 }}>Выберите файл для загрузки</Typography>
              <Typography variant="caption" color="text.secondary">
                Поддерживаемые форматы: CSV, XLSX
              </Typography>
            </Box>

            {uploading && (
              <Box sx={{ mb: 2 }}>
                <LinearProgress variant="determinate" value={65} />
                <Typography variant="caption">Загрузка... 65%</Typography>
              </Box>
            )}

            <Button variant="contained" fullWidth onClick={() => setUploading(true)}>
              Загрузить
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h3" gutterBottom>Загруженные данные</Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Имя файла</TableCell>
                  <TableCell>Тип</TableCell>
                  <TableCell>Статус</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.map((file) => (
                  <TableRow key={file.name}>
                    <TableCell>{file.name}</TableCell>
                    <TableCell>{file.type}</TableCell>
                    <TableCell>
                      <Chip label="Загружено" color="success" size="small" variant="outlined" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}