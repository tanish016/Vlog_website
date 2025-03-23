import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/session';

const useAuthRedirect = () => {
  const { user, loading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);
};

export default useAuthRedirect;