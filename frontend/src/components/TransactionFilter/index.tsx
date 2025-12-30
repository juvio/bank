'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Box,
  Chip,
  Stack,
  Typography,
  Collapse,
  IconButton,
  Badge,
  InputAdornment,
} from '@mui/material';
import {
  Search,
  SwapHoriz,
  Payment,
  AccountBalance,
  AttachMoney,
  CalendarMonth,
  Clear,
  FilterList,
  ExpandMore,
} from '@mui/icons-material';

import {
  CardWrapperSx,
  CardContentSx,
  ExpandButtonSx,
  SearchFieldSx,
  ChipSx,
  ActiveChipSx,
} from './styles';

interface TransactionFilterProps {
  filterType: string;
  filterPeriod: string;
  searchTerm: string;
  onFilterTypeChange: (type: string) => void;
  onFilterPeriodChange: (period: string) => void;
  onSearchTermChange: (term: string) => void;
  onClearFilters: () => void;
}

interface FilterOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

const TRANSACTION_TYPES: FilterOption[] = [
  { value: 'all', label: 'Todos' },
  {
    value: 'transfer',
    label: 'Transferência',
    icon: <SwapHoriz fontSize="small" />,
  },
  { value: 'payment', label: 'Pagamento', icon: <Payment fontSize="small" /> },
  {
    value: 'deposit',
    label: 'Depósito',
    icon: <AccountBalance fontSize="small" />,
  },
  { value: 'withdraw', label: 'Saque', icon: <AttachMoney fontSize="small" /> },
];

const PERIODS: FilterOption[] = [
  { value: 'all', label: 'Todos' },
  { value: 'today', label: 'Hoje' },
  { value: 'week', label: '7 dias' },
  { value: 'month', label: '30 dias' },
  { value: 'year', label: '1 ano' },
];

function calculateActiveFiltersCount(
  filterType: string,
  filterPeriod: string
): number {
  return (filterType !== 'all' ? 1 : 0) + (filterPeriod !== 'all' ? 1 : 0);
}

function hasActiveFilters(
  filterType: string,
  filterPeriod: string,
  searchTerm: string
): boolean {
  return filterType !== 'all' || filterPeriod !== 'all' || searchTerm !== '';
}

function SearchField({
  searchTerm,
  onSearchTermChange,
}: {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}) {
  return (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      placeholder="Buscar por tipo ou valor..."
      value={searchTerm}
      onChange={(e) => onSearchTermChange(e.target.value)}
      sx={SearchFieldSx}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: 'primary.main', fontSize: 20 }} />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <Clear
                sx={{
                  cursor: 'pointer',
                  color: 'text.secondary',
                  fontSize: 20,
                  '&:hover': { color: 'error.main' },
                  transition: 'color 0.2s ease',
                }}
                onClick={() => onSearchTermChange('')}
              />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

function FilterToggleButton({
  isExpanded,
  activeFiltersCount,
  onToggle,
}: {
  isExpanded: boolean;
  activeFiltersCount: number;
  onToggle: () => void;
}) {
  return (
    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
      <Badge
        badgeContent={activeFiltersCount}
        color="primary"
        invisible={activeFiltersCount === 0}
      >
        <IconButton
          onClick={onToggle}
          sx={{
            border: '1.5px solid',
            borderColor: isExpanded ? 'primary.main' : 'divider',
            backgroundColor: isExpanded ? 'primary.main' : 'transparent',
            color: isExpanded ? 'primary.contrastText' : 'text.secondary',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: isExpanded ? 'primary.dark' : 'action.hover',
              borderColor: 'primary.main',
            },
          }}
        >
          <FilterList sx={{ fontSize: 20 }} />
        </IconButton>
      </Badge>

      <IconButton
        onClick={onToggle}
        size="small"
        sx={{
          color: 'text.secondary',
          transition: 'all 0.3s ease',
          '&:hover': {
            color: 'primary.main',
          },
        }}
      >
        <ExpandMore
          sx={{
            ...ExpandButtonSx,
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </IconButton>
    </Box>
  );
}

function FilterSection({
  title,
  icon,
  options,
  selectedValue,
  onSelect,
}: {
  title: string;
  icon?: React.ReactNode;
  options: FilterOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
}) {
  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{
          mb: 1.5,
          color: 'text.primary',
          fontWeight: 700,
          fontSize: '0.75rem',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        {icon}
        {title}
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {options.map((option) => (
          <Chip
            key={option.value}
            {...(option.icon && { icon: option.icon as React.ReactElement })}
            label={option.label}
            size="small"
            onClick={() => onSelect(option.value)}
            sx={selectedValue === option.value ? ActiveChipSx : ChipSx}
            variant={selectedValue === option.value ? 'filled' : 'outlined'}
            color={selectedValue === option.value ? 'primary' : 'default'}
          />
        ))}
      </Stack>
    </Box>
  );
}

function ClearFiltersButton({ onClear }: { onClear: () => void }) {
  return (
    <Box
      sx={{
        mt: 2.5,
        pt: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        textAlign: 'center',
      }}
    >
      <Chip
        label="Limpar filtros"
        onClick={onClear}
        onDelete={onClear}
        size="small"
        color="secondary"
        variant="outlined"
        sx={{
          fontWeight: 600,
          borderRadius: 1.5,
          borderWidth: 1.5,
          '&:hover': {
            borderWidth: 1.5,
            transform: 'scale(1.02)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          },
        }}
      />
    </Box>
  );
}

export default function TransactionFilter({
  filterType,
  filterPeriod,
  searchTerm,
  onFilterTypeChange,
  onFilterPeriodChange,
  onSearchTermChange,
  onClearFilters,
}: TransactionFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const activeFiltersCount = calculateActiveFiltersCount(
    filterType,
    filterPeriod
  );
  const showClearButton = hasActiveFilters(
    filterType,
    filterPeriod,
    searchTerm
  );

  const handleToggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <Card sx={CardWrapperSx}>
      <CardContent sx={CardContentSx}>
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <SearchField
            searchTerm={searchTerm}
            onSearchTermChange={onSearchTermChange}
          />

          <FilterToggleButton
            isExpanded={isExpanded}
            activeFiltersCount={activeFiltersCount}
            onToggle={handleToggleExpand}
          />
        </Box>

        <Collapse in={isExpanded} timeout={300}>
          <Box sx={{ mt: 2.5 }}>
            <FilterSection
              title="Tipo de transação"
              options={TRANSACTION_TYPES}
              selectedValue={filterType}
              onSelect={onFilterTypeChange}
            />

            <Box sx={{ mt: 2.5 }}>
              <FilterSection
                title="Período"
                icon={<CalendarMonth sx={{ fontSize: 16 }} />}
                options={PERIODS}
                selectedValue={filterPeriod}
                onSelect={onFilterPeriodChange}
              />
            </Box>

            {showClearButton && <ClearFiltersButton onClear={onClearFilters} />}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
}