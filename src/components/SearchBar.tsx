import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  searchType: 'localisation' | 'nom';
  onSearchChange: (value: string) => void;
  onSearchTypeChange: (type: 'localisation' | 'nom') => void;
  onClear: () => void;
  isDarkMode: boolean;
}

export default function SearchBar({
  searchTerm,
  searchType,
  onSearchChange,
  onSearchTypeChange,
  onClear,
  isDarkMode,
}: SearchBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`block w-full pl-10 pr-10 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            placeholder={`Rechercher par ${searchType === 'localisation' ? 'localisation' : 'nom de société'}`}
          />
          {searchTerm && (
            <button
              onClick={onClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label="Effacer la recherche"
            >
              <X className={`h-5 w-5 ${isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`} />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onSearchTypeChange('localisation')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              searchType === 'localisation'
                ? 'bg-green-600 text-white'
                : isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Localisation
          </button>
          <button
            onClick={() => onSearchTypeChange('nom')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              searchType === 'nom'
                ? 'bg-green-600 text-white'
                : isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Nom
          </button>
        </div>
      </div>
    </div>
  );
}