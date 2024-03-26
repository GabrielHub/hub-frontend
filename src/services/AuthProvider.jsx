import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { createContext, useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { auth } from '../fb/firebase';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = useCallback(
    async (email, password) => signInWithEmailAndPassword(auth, email, password),
    []
  );

  const logout = useCallback(async () => signOut(auth), []);

  return useMemo(
    () => (
      <AuthContext.Provider value={{ user, signIn, logout, loading }}>
        {children}
      </AuthContext.Provider>
    ),
    [user, signIn, logout, loading, children]
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default {};
