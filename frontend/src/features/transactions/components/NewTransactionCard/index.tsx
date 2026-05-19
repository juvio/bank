'use client';

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import { transactionTypes } from '@types';
import { useNewTransactionCard } from '@features/transactions/hooks';
import {
  BoxTextFieldSx,
  CardActionsSx,
  CardContentSx,
  CardWrapperSx,
} from './styles';

export default function NewTransactionCard() {
  const {
    datePickerValue,
    errors,
    handleAmountBlur,
    handleAmountChange,
    handleDateChange,
    handleDescriptionChange,
    handleFileChange,
    handleOpenModal,
    handleRemoveFile,
    handleTypeChange,
    isSubmitDisabled,
    maxDate,
    newTransaction,
  } = useNewTransactionCard();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
      <Card
        sx={CardWrapperSx}
        role='region'
        aria-labelledby='new-transaction-title'
      >
        <CardContent sx={CardContentSx}>
          <Typography
            variant='h6'
            component='h2'
            gutterBottom
            id='new-transaction-title'
          >
            Nova Transação
          </Typography>
          <Box
            component='form'
            sx={BoxTextFieldSx}
            aria-labelledby='new-transaction-title'
          >
            <TextField
              select
              label='Tipo de Transação'
              value={newTransaction.type}
              onChange={(event) => handleTypeChange(event.target.value)}
              fullWidth
              required
            >
              {transactionTypes.map((option, index) => (
                <MenuItem
                  key={`new-${option.value}-${index}`}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label='Valor'
                type='number'
                value={newTransaction.amount}
                onChange={(event) => handleAmountChange(event.target.value)}
                fullWidth
                required
                slotProps={{
                  input: {
                    startAdornment: <Typography sx={{ mr: 1 }}>R$</Typography>,
                  },
                }}
                onBlur={handleAmountBlur}
                error={Boolean(errors)}
                helperText={errors}
              />
              <DesktopDatePicker
                label='Data'
                value={datePickerValue}
                onChange={handleDateChange}
                maxDate={maxDate}
                disableFuture
                format='DD/MM/YYYY'
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                  },
                }}
              />
            </Box>
            <TextField
              label='Descrição'
              value={newTransaction.description}
              onChange={(event) => handleDescriptionChange(event.target.value)}
              fullWidth
              multiline
              rows={2}
              sx={{ mt: errors ? -1.8 : 1 }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                marginBottom: newTransaction.attachment ? 0 : 3,
              }}
            >
              <Button
                variant='outlined'
                component='label'
                startIcon={<AttachFileIcon />}
                size='small'
                sx={{ flex: 1, textTransform: 'none' }}
              >
                {newTransaction.attachment ? 'Trocar' : 'Anexar'}
                <input
                  type='file'
                  hidden
                  onChange={handleFileChange}
                  accept='image/*,.pdf'
                />
              </Button>
              {newTransaction.attachment && (
                <IconButton
                  onClick={handleRemoveFile}
                  size='small'
                  color='error'
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Box>
            {newTransaction.attachment && (
              <Typography
                variant='caption'
                color='text.secondary'
                sx={{
                  mt: -1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                📎 {newTransaction.attachment.name}
              </Typography>
            )}
          </Box>
          <CardActions sx={CardActionsSx}>
            <Button
              variant='contained'
              fullWidth
              onClick={handleOpenModal}
              disabled={isSubmitDisabled}
            >
              Criar Transação
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </LocalizationProvider>
  );
}
