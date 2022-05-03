import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { userApi } from '../redux/api/userApi';
import FullScreenLoader from './FullScreenLoader';

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const [cookies] = useCookies(['logged_in']);
  const logged_in = cookies.logged_in;

  const { data: user } = userApi.endpoints.getMe.useQuery(null, {
    skip: !logged_in,
  });

  const location = useLocation();

  if (logged_in && !user) {
    return <FullScreenLoader />;
  }

  return logged_in && allowedRoles.includes(user?.role as string) ? (
    <Outlet />
  ) : logged_in && user ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default RequireUser;
