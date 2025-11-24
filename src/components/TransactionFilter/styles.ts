export const CardWrapperSx = {
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  borderRadius: 3,
  border: '1px solid',
  borderColor: 'divider',
  overflow: 'hidden',
  background: (theme: any) =>
    `linear-gradient(to bottom, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
};

export const CardContentSx = {
  p: 2,
  '&:last-child': {
    pb: 2,
  },
};

export const ExpandButtonSx = {
  transition: 'transform 0.3s ease',
};

export const SearchFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2.5,
    backgroundColor: 'background.paper',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    },
    '&.Mui-focused': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
    },
  },
};

export const ChipSx = {
  fontWeight: 500,
  borderRadius: 1.5,
  transition: 'all 0.2s ease',
  borderWidth: 1.5,
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    borderWidth: 1.5,
  },
  cursor: 'pointer',
};

export const ActiveChipSx = {
  fontWeight: 600,
  borderRadius: 1.5,
  boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
  transform: 'translateY(-1px)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 3px 10px rgba(0,0,0,0.18)',
  },
};
