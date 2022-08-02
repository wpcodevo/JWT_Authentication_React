import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { useLoginUserMutation } from '../redux/api/authApi';
import { ReactComponent as GoogleLogo } from '../assets/google.svg';
import { ReactComponent as GitHubLogo } from '../assets/github.svg';

import { getGoogleUrl } from '../utils/getGoogleUrl';
import { getGitHubUrl } from '../utils/getGithubUrl';

const LoadingButton = styled(_LoadingButton)`
  padding: 0.6rem 0;
  background-color: #f9d13e;
  color: #2363eb;
  font-weight: 500;

  &:hover {
    background-color: #ebc22c;
    transform: translateY(-2px);
  }
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #2363eb;
  &:hover {
    text-decoration: underline;
  }
`;

const loginSchema = object({
  email: string()
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const LoginPage = () => {
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  // 👇 API Login Mutation
  const [loginUser, { isLoading, isError, error, isSuccess }] =
    useLoginUserMutation();

  const navigate = useNavigate();
  const location = useLocation();

  const from = ((location.state as any)?.from.pathname as string) || '/';

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      toast.success('You successfully logged in');
      navigate(from);
    }
    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: 'top-right',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    // 👇 Executing the loginUser Mutation
    loginUser(values);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#2363eb',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          textAlign='center'
          component='h1'
          sx={{
            color: '#f9d13e',
            fontWeight: 600,
            fontSize: { xs: '2rem', md: '3rem' },
            mb: 2,
            letterSpacing: 1,
          }}
        >
          Welcome Back!
        </Typography>
        <Typography
          variant='body1'
          component='h2'
          sx={{ color: '#e5e7eb', mb: 2 }}
        >
          Login to have access!
        </Typography>

        <FormProvider {...methods}>
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            autoComplete='off'
            maxWidth='27rem'
            width='100%'
            sx={{
              backgroundColor: '#e5e7eb',
              p: { xs: '1rem', sm: '2rem' },
              borderRadius: 2,
            }}
          >
            <FormInput name='email' label='Email Address' type='email' />
            <FormInput name='password' label='Password' type='password' />

            <Typography
              sx={{ fontSize: '0.9rem', mb: '1rem', textAlign: 'right' }}
            >
              <LinkItem to='/forgotpassword' style={{ color: '#333' }}>
                Forgot Password?
              </LinkItem>
            </Typography>

            <LoadingButton
              variant='contained'
              sx={{ mt: 1 }}
              fullWidth
              disableElevation
              type='submit'
              loading={isLoading}
            >
              Login
            </LoadingButton>

            <Typography sx={{ fontSize: '0.9rem', mt: '1rem' }}>
              Need an account? <LinkItem to='/register'>Sign Up Here</LinkItem>
            </Typography>
          </Box>
        </FormProvider>
        <Typography
          variant='h6'
          component='p'
          sx={{
            my: '1.5rem',
            textAlign: 'center',
            color: 'white',
          }}
        >
          Log in with another provider:
        </Typography>
        <Box
          maxWidth='27rem'
          width='100%'
          sx={{
            backgroundColor: '#e5e7eb',
            p: { xs: '1rem', sm: '2rem' },
            borderRadius: 2,
          }}
        >
          <MuiLink
            href={getGoogleUrl(from)}
            sx={{
              backgroundColor: '#f5f6f7',
              borderRadius: 1,
              py: '0.6rem',
              columnGap: '1rem',
              textDecoration: 'none',
              color: '#393e45',
              cursor: 'pointer',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#fff',
                boxShadow: '0 1px 13px 0 rgb(0 0 0 / 15%)',
              },
            }}
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <GoogleLogo style={{ height: '2rem' }} />
            Google
          </MuiLink>
          <MuiLink
            href={getGitHubUrl(from)}
            sx={{
              backgroundColor: '#f5f6f7',
              borderRadius: 1,
              py: '0.6rem',
              mt: '1.5rem',
              columnGap: '1rem',
              textDecoration: 'none',
              color: '#393e45',
              cursor: 'pointer',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#fff',
                boxShadow: '0 1px 13px 0 rgb(0 0 0 / 15%)',
              },
            }}
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <GitHubLogo style={{ height: '2rem' }} />
            GitHub
          </MuiLink>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
