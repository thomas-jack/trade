
import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const AuthCallback: React.FC = () => {
  const { handleAuthCallback } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    handleAuthCallback();
  }, [handleAuthCallback]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-lg font-semibold">{t('common.authenticating')}</p>
      </div>
    </div>
  );
};

export default AuthCallback;
