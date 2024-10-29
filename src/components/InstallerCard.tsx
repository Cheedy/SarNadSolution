import React, { useState } from 'react';
import { Phone, Mail, MapPin, Building2, Copy, Check, Eye } from 'lucide-react';
import type { Installer } from '../data/installers';

interface InstallerCardProps {
  installer: Installer;
}

export default function InstallerCard({ installer }: InstallerCardProps) {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const copyToClipboard = async (text: string, type: 'phone' | 'email' | 'address') => {
    try {
      await navigator.clipboard.writeText(text);
      const setState = {
        phone: setCopiedPhone,
        email: setCopiedEmail,
        address: setCopiedAddress,
      }[type];
      
      setState(true);
      setTimeout(() => setState(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const openInGoogleMaps = () => {
    // Encode the address for the URL and include France as the country
    const formattedAddress = `${installer.adresse.split('\n')[0]}, ${installer.localisation}, France`;
    const encodedAddress = encodeURIComponent(formattedAddress);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{installer.nom}</h3>
      
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <div className="whitespace-pre-line text-gray-600">{installer.adresse}</div>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => copyToClipboard(installer.adresse, 'address')}
                className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                title="Copier l'adresse"
              >
                {copiedAddress ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                )}
              </button>
              <button
                onClick={openInGoogleMaps}
                className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                title="Voir sur Google Maps"
              >
                <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-green-600" />
          <a href={`tel:${installer.phone}`} className="text-gray-600 hover:text-green-600">
            {installer.phone}
          </a>
          <button
            onClick={() => copyToClipboard(installer.phone, 'phone')}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
            title="Copier le numéro"
          >
            {copiedPhone ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-green-600" />
          <a href={`mailto:${installer.email}`} className="text-gray-600 hover:text-green-600">
            {installer.email}
          </a>
          <button
            onClick={() => copyToClipboard(installer.email, 'email')}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
            title="Copier l'email"
          >
            {copiedEmail ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Building2 className="w-5 h-5 text-green-600" />
          <span className="text-gray-600">SIRET: {installer.siret}</span>
        </div>
      </div>
    </div>
  );
}