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
      // Use secure function to verify admin credentials
      const { data: isValid, error: verifyError } = await supabase
        .rpc('verify_admin_credentials', {
          input_email: email,
          input_password: password
        });

      if (verifyError || !isValid) {
        console.error('Admin verification failed:', verifyError);
        return false;
      }

      // Get admin user data securely
      const { data: adminData, error: dataError } = await supabase
        .rpc('get_admin_user', {
          input_email: email
        });

      if (dataError || !adminData || adminData.length === 0) {
        console.error('Admin user data not found:', dataError);
        return false;
      }

      const user = { id: adminData[0].id, email: adminData[0].email };
      setAdminUser(user);
      localStorage.setItem('adminUser', JSON.stringify(user));
      return true;
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