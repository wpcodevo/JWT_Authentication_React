import { Box, Container, Typography } from '@mui/material';
import { useAppSelector } from '../redux/store';

const ProfilePage = () => {
  const user = useAppSelector((state) => state.userState.user);

  return (
    <Container maxWidth='lg'>
      <Box
        sx={{
          backgroundColor: '#ece9e9',
          mt: '2rem',
          height: '15rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant='h2'
          component='h1'
          sx={{ color: '#1f1e1e', fontWeight: 500 }}
        >
          Profile Page
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography gutterBottom>
          <strong>Id:</strong> {user?.id}
        </Typography>
        <Typography gutterBottom>
          <strong>Full Name:</strong> {user?.name}
        </Typography>
        <Typography gutterBottom>
          <strong>Email Address:</strong> {user?.email}
        </Typography>
        <Typography gutterBottom>
          <strong>Role:</strong> {user?.role}
        </Typography>
      </Box>
    </Container>
  );
};

export default ProfilePage;
