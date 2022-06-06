import { Box, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      sx={{ backgroundColor: '#fff', height: '4rem' }}
    >
      <Typography>Copyright @2022</Typography>
    </Box>
  );
};

export default Footer;
