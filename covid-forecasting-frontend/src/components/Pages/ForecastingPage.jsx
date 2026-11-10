import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Button, Select, MenuItem,
  FormControl, InputLabel, TextField, Tabs, Tab,
} from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, Area,
} from 'recharts';

/* Данные SIR-модели: восприимчивые, инфицированные, выздоровевшие */
const sirData = Array.from({ length: 28 }, (_, i) => {
  const day = i * 10;
  const N = 1000000;
  const beta = 0.28;
  const gamma = 0.14;
  const t = i;
  const S = N / (1 + Math.exp((beta - gamma) * (t - 12)));
  const R = N - S - N * 0.15 * Math.exp(-Math.pow(t - 12, 2) / 20);
  const I = N - S - R;
  return {
    day,
    susceptible: Math.max(0, Math.round(S)),
    infected:    Math.max(0, Math.round(I)),
    recovered:   Math.max(0, Math.round(R)),
  };
});

function MetricCard({ label, value, colorClass }) {
  return (
    <Card
      sx={{
        p: 2,
        flex: 1,
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textTransform: 'uppercase', fontSize: 13, letterSpacing: 0.5 }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: "'Roboto Mono', monospace",
          fontSize: 28,
          fontWeight: 700,
          mt: 1,
          color: colorClass || 'text.primary',
        }}
      >
        {value}
      </Typography>
    </Card>
  );
}

export default function ForecastingPage() {
  const [model, setModel] = useState('SIR');
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Прогнозирование
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr 260px',
          gap: 3,
        }}
      >
        {/* ───── Левая колонка: параметры модели ───── */}
        <Box>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Параметры модели
          </Typography>

          <Card sx={{ p: 2 }}>
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel>Метод прогнозирования</InputLabel>
              <Select
                value={model}
                label="Метод прогнозирования"
                onChange={(e) => setModel(e.target.value)}
              >
                <MenuItem value="sliding">Скользящие тренды</MenuItem>
                <MenuItem value="arima">ARIMA/SARIMA</MenuItem>
                <MenuItem value="SIR">SIR</MenuItem>
                <MenuItem value="SEIR">SEIR</MenuItem>
                <MenuItem value="SIS">SIS</MenuItem>
              </Select>
            </FormControl>

            {(model === 'SIR' || model === 'SEIR' || model === 'SIS') && (
              <>
                <TextField
                  label="β (бета)"
                  type="number"
                  fullWidth
                  size="small"
                  defaultValue={0.28}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="γ (гамма)"
                  type="number"
                  fullWidth
                  size="small"
                  defaultValue={0.14}
                  sx={{ mb: 2 }}
                />
                {model === 'SEIR' && (
                  <TextField
                    label="α (альфа)"
                    type="number"
                    fullWidth
                    size="small"
                    defaultValue={0.1}
                    sx={{ mb: 2 }}
                  />
                )}
                <TextField
                  label="Число восприимчивых"
                  type="number"
                  fullWidth
                  size="small"
                  defaultValue={9500000}
                />
              </>
            )}

            {model === 'arima' && (
              <>
                <TextField label="p" type="number" fullWidth size="small" defaultValue={2} sx={{ mb: 2 }} />
                <TextField label="d" type="number" fullWidth size="small" defaultValue={1} sx={{ mb: 2 }} />
                <TextField label="q" type="number" fullWidth size="small" defaultValue={2} />
              </>
            )}

            {model === 'sliding' && (
              <>
                <TextField label="Длина окна" type="number" fullWidth size="small" defaultValue={7} sx={{ mb: 2 }} />
                <TextField label="Горизонт прогноза" type="number" fullWidth size="small" defaultValue={14} sx={{ mb: 2 }} />
                <TextField label="Доверительная вероятность" type="number" fullWidth size="small" defaultValue={0.95} />
              </>
            )}
          </Card>
        </Box>

        {/* ───── Центральная колонка: визуализация ───── */}
        <Box>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Визуализация
          </Typography>

          {/* Метрики */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <MetricCard label="RMSE" value="125 430" />
            <MetricCard label="MAE"  value="125 430" />
          </Box>

          {/* Вкладки "Фактические данные / Прогноз" */}
          <Card>
            <CardContent>
              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                sx={{
                  mb: 2,
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontSize: 14,
                    minWidth: 180,
                  },
                }}
              >
                <Tab label="Фактические данные" />
                <Tab label="Прогноз" />
              </Tabs>

              {tab === 0 && (
                <>
                  <Typography variant="h3" sx={{ mb: 0.5 }}>
                    Распространение COVID-19
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    SIR-модель
                  </Typography>

                  <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={sirData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E0E4E8" vertical={false} />
                      <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend
                        wrapperStyle={{ fontSize: 13, paddingTop: 12 }}
                        iconType="plainline"
                      />
                      <Line
                        type="monotone"
                        dataKey="susceptible"
                        stroke="#7B1FA2"
                        strokeWidth={2}
                        dot={false}
                        name="Восприимчивые"
                      />
                      <Line
                        type="monotone"
                        dataKey="infected"
                        stroke="#D32F2F"
                        strokeWidth={2}
                        dot={false}
                        name="Инфицированные"
                      />
                      <Line
                        type="monotone"
                        dataKey="recovered"
                        stroke="#388E3C"
                        strokeWidth={2}
                        dot={false}
                        name="Выздоровевшие"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </>
              )}

              {tab === 1 && (
                <>
                  <Typography variant="h3" sx={{ mb: 0.5 }}>
                    Прогноз заболеваемости
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Сравнение фактических и прогнозных значений
                  </Typography>

                  <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={sirData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E0E4E8" vertical={false} />
                      <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 13, paddingTop: 12 }} />
                      <Area
                        type="monotone"
                        dataKey="recovered"
                        stroke="none"
                        fill="#00796B"
                        fillOpacity={0.15}
                      />
                      <Line
                        type="monotone"
                        dataKey="infected"
                        stroke="#F57C00"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                        name="Прогноз"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* ───── Правая колонка: эпидпоказатели ───── */}
        <Box>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Эпидемпоказатели
          </Typography>

          <Card sx={{ p: 2, mb: 2 }}>
            <Typography variant="body2" color="text.secondary">R0</Typography>
            <Typography
              sx={{
                fontFamily: "'Roboto Mono', monospace",
                fontSize: 28,
                fontWeight: 700,
                mt: 1,
              }}
            >
              125 430
            </Typography>
          </Card>

          <Card sx={{ p: 2, mb: 2 }}>
            <Typography variant="body2" color="text.secondary">Rt</Typography>
            <Typography
              sx={{
                fontFamily: "'Roboto Mono', monospace",
                fontSize: 28,
                fontWeight: 700,
                mt: 1,
              }}
            >
              125 430
            </Typography>
          </Card>

          <Card sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Инкубационный период
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Roboto Mono', monospace",
                fontSize: 28,
                fontWeight: 700,
                mt: 1,
              }}
            >
              125 430
            </Typography>
          </Card>
        </Box>
      </Box>

      {/* ───── Кнопки в правом нижнем углу (красная зона) ───── */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          mt: 3,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            textTransform: 'uppercase',
            fontSize: 13,
            fontWeight: 500,
            px: 3,
          }}
        >
          Сбросить данные
        </Button>
        <Button
          variant="contained"
          sx={{
            textTransform: 'uppercase',
            fontSize: 13,
            fontWeight: 500,
            px: 3,
          }}
        >
          Построить прогноз
        </Button>
      </Box>
    </Box>
  );
}