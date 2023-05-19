import { useSelector } from 'react-redux';

const useAuth = () => {
  const auth = Boolean(useSelector((state) => state.token));

  return { auth };
};

export default useAuth;
