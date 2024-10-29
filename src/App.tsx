import React, { useState, useMemo } from 'react';
import { Sun, Moon } from 'lucide-react';
import { sampleData } from './data/installers';
import SearchBar from './components/SearchBar';
import InstallerCard from './components/InstallerCard';

function App() {
  const [searchTerm, setSearchTerm] = useState('Paris');
  const [searchType, setSearchType] = useState<'localisation' | 'nom'>('localisation');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const filteredInstallers = useMemo(() => {
    if (!searchTerm && searchType === 'localisation') {
      return sampleData.filter(installer => 
        installer.localisation.toLowerCase() === 'paris'
      );
    }
    
    return sampleData.filter((installer) => {
      const searchValue = searchTerm.toLowerCase();
      const field = searchType === 'localisation' ? installer.localisation : installer.nom;
      return field.toLowerCase().includes(searchValue);
    });
  }, [searchTerm, searchType]);

  const displayedInstallers = useMemo(() => {
    if (!searchTerm) {
      return filteredInstallers.slice(0, 50);
    }
    return filteredInstallers;
  }, [filteredInstallers, searchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
    setSearchType('localisation');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sun className="h-8 w-8 text-green-600" />
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                SarNad Solutions
              </h1>
            </div>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-100 hover:bg-gray-200'
              } transition-colors`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
          <p className={`mt-2 text-center sm:text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Trouvez les meilleurs installateurs de panneaux solaires près de chez vous
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar
          searchTerm={searchTerm}
          searchType={searchType}
          onSearchChange={setSearchTerm}
          onSearchTypeChange={setSearchType}
          onClear={clearSearch}
          isDarkMode={isDarkMode}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedInstallers.map((installer) => (
            <InstallerCard 
              key={installer.siret} 
              installer={installer} 
              isDarkMode={isDarkMode}
            />
          ))}
        </div>

        {displayedInstallers.length === 0 && (
          <div className="text-center py-12">
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
              Aucun installateur trouvé pour votre recherche.
            </p>
          </div>
        )}

        {!searchTerm && displayedInstallers.length === 50 && filteredInstallers.length > 50 && (
          <div className="text-center mt-8">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Affichage limité aux 50 premiers résultats. Utilisez la recherche pour voir plus d'installateurs.
            </p>
          </div>
        )}
      </main>

      <footer className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-t'} mt-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            © {new Date().getFullYear()} SarNad Solutions. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;