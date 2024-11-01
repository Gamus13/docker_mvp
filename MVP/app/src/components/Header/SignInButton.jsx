import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const SignInButton = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/profile" />;
  }

  return (
    <button className="px-7 py-3 text-base bg-blue-600 text-white font-medium text-dark hover:opacity-70 dark:text-white md:block"
            onClick={() => <Navigate to="/auth/login" />}
    >
      Sign In 
    </button>
  );
};

export default SignInButton;