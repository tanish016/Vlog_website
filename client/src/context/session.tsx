// filepath: e:\Personal\Projects\VLOG_WEBSITE\client\src\context\session.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface SessionContextProps {
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('/api/account', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error('No valid session found', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/login', { email, password }, { withCredentials: true });
      if (response.data && response.data.status) {
        setUser(response.data.user);
      } else {
        throw new Error('Bad credentials');
      }
    } catch (error) {
      console.log(error);
      throw new Error('Bad credentials');
    }
  };

  const logout = async () => {
    try{
      await axios.post('/api/logout', { withCredentials: true });
      setUser(null);
    }catch(error){
      console.error(error);
    }
  };

  return (
    <SessionContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};