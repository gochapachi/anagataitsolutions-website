import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminUser {
  id: string;
  email: string;
}

interface AdminAuthContext {
  adminUser: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContext | null>(null);

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in from localStorage
    const storedAdmin = localStorage.getItem('adminUser');
    if (storedAdmin) {
      setAdminUser(JSON.parse(storedAdmin));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // For simplicity, we'll check if email and password are both "admin"
      if (email === 'admin' && password === 'admin') {
        // Verify admin exists in database
        const { data, error } = await supabase
          .from('admin_users')
          .select('id, email')
          .eq('email', 'admin')
          .single();

        if (error || !data) {
          console.error('Admin user not found:', error);
          return false;
        }

        const user = { id: data.id, email: data.email };
        setAdminUser(user);
        localStorage.setItem('adminUser', JSON.stringify(user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem('adminUser');
  };

  return (
    <AdminAuthContext.Provider value={{ adminUser, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};