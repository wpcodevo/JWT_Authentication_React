import {
  AppBar,
  Avatar,
  Box,
  Button as _Button,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { logout } from '../redux/features/userSlice';
import { batch } from 'react-redux';
import { authApi } from '../redux/api/authApi';

const Button = styled(_Button)`
  padding: 0.4rem;
  background-color: #f9d13e;
  color: #2363eb;
  font-weight: 500;

  &:hover {
    background-color: #ebc22c;
    transform: translateY(-2px);
  }
`;

const Header = () => {
  const [cookies] = useCookies(['logged_in']);
  const logged_in = cookies.logged_in;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userState.user);

  const onLogoutHandler = async () => {
    batch(() => {
      dispatch(logout());
      dispatch(authApi.endpoints.logoutUser.initiate());
    });
    window.location.href = '/';
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='lg'>
        <Toolbar>
          <Typography
            variant='h6'
            onClick={() => navigate('/')}
            sx={{ cursor: 'pointer' }}
          >
            CodevoWeb
          </Typography>
          <Box display='flex' sx={{ ml: 'auto' }}>
            {!logged_in && (
              <>
                <Button sx={{ mr: 2 }} onClick={() => navigate('/register')}>
                  SignUp
                </Button>
                <Button onClick={() => navigate('/login')}>Login</Button>
              </>
            )}
            {logged_in && (
              <Button
                sx={{ backgroundColor: '#eee' }}
                onClick={onLogoutHandler}
              >
                Logout
              </Button>
            )}
            {logged_in && user?.role === 'admin' && (
              <Button
                sx={{ backgroundColor: '#eee', ml: 2 }}
                onClick={() => navigate('/admin')}
              >
                Admin
              </Button>
            )}
            <Box sx={{ ml: 4 }}>
              <Tooltip
                title='Post settings'
                onClick={() => navigate('/profile')}
              >
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
