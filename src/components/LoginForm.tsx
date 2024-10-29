import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface LoginFormProps {
  onLogin: (password: string) => void;
  isDarkMode: boolean;
}

export default function LoginForm({ onLogin, isDarkMode }: LoginFormProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
    setError(true);
    setPassword('');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`max-w-md w-full mx-4 p-8 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex flex-col items-center mb-8">
          <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} mb-4`}>
            <Lock className="w-8 h-8 text-green-600" />
          </div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          SarNad Solutions
          </h2>
          <p className={`mt-2 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Veuillez vous authentifier pour accéder à la plateforme
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'border-gray-300 placeholder-gray-400'
              } ${error ? 'border-red-500' : ''}`}
              placeholder="Entrez le mot de passe"
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">
                Mot de passe incorrect
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}