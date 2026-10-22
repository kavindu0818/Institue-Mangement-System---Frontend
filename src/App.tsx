import React from 'react';
import { useAppSelector } from './store';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LoginView } from './views/auth/LoginView';

export const App: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <LoginView />;
  }

  return <DashboardLayout />;
};

export default App;
