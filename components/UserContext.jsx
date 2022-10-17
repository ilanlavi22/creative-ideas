import { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/router';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  //Sign in with google
  // Initializing google provider

  const googleProvider = new GoogleAuthProvider();

  const googleLogin = async () => {
    // Waiting for the google auth
    try {
      const result = await signInWithPopup(auth, googleProvider); // Takes two arguments; user and the provider
    } catch (error) {
      console.log(error);
    }
  };
  const logout = () => {
    return auth.signOut();
  };
  const protectedRoutes = () => {
    if (loading) return;
    if (!user) return route.push('/auth/login');
  };

  return (
    <UserContext.Provider
      value={{ user, loading, protectedRoutes, googleLogin, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
