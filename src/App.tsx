import React, { useState, useMemo } from 'react';
import { Sun } from 'lucide-react';
import { sampleData } from './data/installers';
import SearchBar from './components/SearchBar';
import InstallerCard from './components/InstallerCard';

function App() {
  const [searchTerm, setSearchTerm] = useState('Paris');
  const [searchType, setSearchType] = useState<'localisation' | 'nom'>('localisation');

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

  const clearSearch = () => {
    setSearchTerm('');
    setSearchType('localisation');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <Sun className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              SarNad Solutions
            </h1>
          </div>
          <p className="mt-2 text-center sm:text-left text-gray-600">
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
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstallers.map((installer) => (
            <InstallerCard key={installer.siret} installer={installer} />
          ))}
        </div>

        {filteredInstallers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Aucun installateur trouvé pour votre recherche.
            </p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} SarNad Solutions. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;