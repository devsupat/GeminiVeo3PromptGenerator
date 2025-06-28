import React, { useState } from 'react';
import { Plus, Trash2, Lightbulb, X } from 'lucide-react';
import Button from './Button';
import SelectField from './SelectField';
import InputField from './InputField';
import type { DialogEntry } from '../types';

interface DialogSectionProps {
  dialogs: DialogEntry[];
  onAddDialog: () => void;
  onRemoveDialog: (id: number) => void;
  onUpdateDialog: (id: number, field: 'character' | 'text' | 'dialect', value: string) => void;
  customCharacters: string[];
  onAddCustomCharacter: (character: string) => void;
  onRemoveCustomCharacter: (character: string) => void;
  customDialects: string[];
  onAddCustomDialect: (dialect: string) => void;
  onRemoveCustomDialect: (dialect: string) => void;
}

const DialogSection: React.FC<DialogSectionProps> = ({
  dialogs,
  onAddDialog,
  onRemoveDialog,
  onUpdateDialog,
  customCharacters,
  onAddCustomCharacter,
  onRemoveCustomCharacter,
  customDialects,
  onAddCustomDialect,
  onRemoveCustomDialect
}) => {
  const [showCharacterInput, setShowCharacterInput] = useState(false);
  const [showDialectInput, setShowDialectInput] = useState(false);
  const [showCustomCharacters, setShowCustomCharacters] = useState(false);
  const [showCustomDialects, setShowCustomDialects] = useState(false);
  const [newCharacter, setNewCharacter] = useState('');
  const [newDialect, setNewDialect] = useState('');

  const defaultCharacters = [
    { value: 'Karakter 1', label: 'Karakter 1' },
    { value: 'Karakter 2', label: 'Karakter 2' },
    { value: 'Karakter 3', label: 'Karakter 3' },
    { value: 'Narator', label: 'Narator' },
    { value: 'Pembawa Berita', label: 'Pembawa Berita' },
    { value: 'Pedagang', label: 'Pedagang' },
    { value: 'Petani', label: 'Petani' },
    { value: 'Nelayan', label: 'Nelayan' }
  ];

  const defaultDialects = [
    { value: 'indonesian', label: 'Bahasa Indonesia' },
    { value: 'sundanese', label: 'Bahasa Sunda' },
    { value: 'javanese', label: 'Bahasa Jawa' },
    { value: 'batak', label: 'Bahasa Batak' },
    { value: 'medan', label: 'Dialek Medan' },
    { value: 'betawi', label: 'Bahasa Betawi' },
    { value: 'minang', label: 'Bahasa Minang' },
    { value: 'bali', label: 'Bahasa Bali' },
    { value: 'bugis', label: 'Bahasa Bugis' },
    { value: 'banjar', label: 'Bahasa Banjar' }
  ];

  // Combine default and custom options
  const allCharacters = [
    ...defaultCharacters,
    ...customCharacters.map(char => ({ value: char, label: char }))
  ];

  const allDialects = [
    ...defaultDialects,
    ...customDialects.map(dialect => ({ value: dialect, label: dialect }))
  ];

  const handleAddCharacter = () => {
    if (newCharacter.trim()) {
      onAddCustomCharacter(newCharacter.trim());
      setNewCharacter('');
      setShowCharacterInput(false);
    }
  };

  const handleAddDialect = () => {
    if (newDialect.trim()) {
      onAddCustomDialect(newDialect.trim());
      setNewDialect('');
      setShowDialectInput(false);
    }
  };

  const getDialogSuggestions = (dialectValue: string) => {
    const suggestions: Record<string, string[]> = {
      'indonesian': [
        'Selamat pagi, bagaimana kabar hari ini?',
        'Terima kasih atas kunjungannya',
        'Mari kita mulai pekerjaan hari ini'
      ],
      'sundanese': [
        'Wilujeng enjing, kumaha damang?',
        'Hatur nuhun pisan',
        'Hayu urang ngamimitian pagawean'
      ],
      'javanese': [
        'Sugeng enjang, pripun kabare?',
        'Matur nuwun sanget',
        'Ayo kita mulai kerja'
      ],
      'batak': [
        'Horas, aha kabar mu?',
        'Mauliate godang',
        'Mangido ta mulai kerja'
      ],
      'medan': [
        'Apa kabar bang/kak?',
        'Makasih banyak ya',
        'Yuk kita mulai kerja'
      ]
    };
    return suggestions[dialectValue] || [];
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Isi Dialog dengan Dialek Regional
        </h4>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onAddDialog}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Tambah Dialog
        </Button>
      </div>
      
      <div className="space-y-3">
        {dialogs.map((dialog) => (
          <div key={dialog.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
            <div className="flex gap-3 items-start">
              {/* Character Selection */}
              <div className="w-40">
                <div className="flex items-center gap-1 mb-1">
                  <label className="text-xs font-medium text-gray-600">Karakter</label>
                  <button
                    type="button"
                    onClick={() => setShowCharacterInput(!showCharacterInput)}
                    className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                    title="Tambah karakter baru"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  {customCharacters.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowCustomCharacters(!showCustomCharacters)}
                      className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                      title="Kelola karakter custom"
                    >
                      <span className="text-xs">{customCharacters.length}</span>
                    </button>
                  )}
                </div>
                <SelectField
                  label=""
                  value={dialog.character}
                  onChange={(value) => onUpdateDialog(dialog.id, 'character', value)}
                  options={allCharacters}
                  className="text-sm"
                />
              </div>

              {/* Dialect Selection */}
              <div className="w-44">
                <div className="flex items-center gap-1 mb-1">
                  <label className="text-xs font-medium text-gray-600">Bahasa/Dialek</label>
                  <button
                    type="button"
                    onClick={() => setShowDialectInput(!showDialectInput)}
                    className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                    title="Tambah bahasa/dialek baru"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  {customDialects.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowCustomDialects(!showCustomDialects)}
                      className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                      title="Kelola dialek custom"
                    >
                      <span className="text-xs">{customDialects.length}</span>
                    </button>
                  )}
                </div>
                <SelectField
                  label=""
                  value={dialog.dialect}
                  onChange={(value) => onUpdateDialog(dialog.id, 'dialect', value)}
                  options={allDialects}
                  className="text-sm"
                />
              </div>

              {/* Dialog Text */}
              <div className="flex-1">
                <label className="text-xs font-medium text-gray-600 mb-1 block">Dialog</label>
                <InputField
                  label=""
                  placeholder="Masukkan dialog..."
                  value={dialog.text}
                  onChange={(value) => onUpdateDialog(dialog.id, 'text', value)}
                />
              </div>

              {/* Remove Button */}
              {dialogs.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveDialog(dialog.id)}
                  className="mt-6 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                  title="Hapus dialog"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* AI Suggestions for Dialog */}
            <div className="mt-2">
              <div className="text-xs font-medium text-gray-600 mb-2 flex items-center gap-1">
                <Lightbulb className="w-3 h-3 text-yellow-500" />
                Contoh dialog dalam {allDialects.find(d => d.value === dialog.dialect)?.label || 'bahasa ini'}:
              </div>
              <div className="flex flex-wrap gap-2">
                {getDialogSuggestions(dialog.dialect).map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => onUpdateDialog(dialog.id, 'text', suggestion)}
                    className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Character Input */}
      {showCharacterInput && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Tambah Karakter Baru</h5>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCharacter}
              onChange={(e) => setNewCharacter(e.target.value)}
              placeholder="Nama karakter baru..."
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleAddCharacter()}
            />
            <button
              type="button"
              onClick={handleAddCharacter}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Tambah
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-600">
            Contoh: Ibu Guru, Pak Dokter, Anak Kecil, Kakek Bijak
          </div>
        </div>
      )}

      {/* Custom Character Management */}
      {showCustomCharacters && customCharacters.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Karakter Custom</h5>
          <div className="space-y-2">
            {customCharacters.map((character, index) => (
              <div key={index} className="flex items-center justify-between bg-white px-3 py-2 rounded border">
                <span className="text-sm text-gray-700">{character}</span>
                <button
                  type="button"
                  onClick={() => onRemoveCustomCharacter(character)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Hapus karakter"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Dialect Input */}
      {showDialectInput && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Tambah Bahasa/Dialek Baru</h5>
          <div className="flex gap-2">
            <input
              type="text"
              value={newDialect}
              onChange={(e) => setNewDialect(e.target.value)}
              placeholder="Nama bahasa/dialek baru..."
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleAddDialect()}
            />
            <button
              type="button"
              onClick={handleAddDialect}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              Tambah
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-600">
            Contoh: Bahasa Palembang, Dialek Aceh, Bahasa Dayak, Dialek Makassar
          </div>
        </div>
      )}

      {/* Custom Dialect Management */}
      {showCustomDialects && customDialects.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Bahasa/Dialek Custom</h5>
          <div className="space-y-2">
            {customDialects.map((dialect, index) => (
              <div key={index} className="flex items-center justify-between bg-white px-3 py-2 rounded border">
                <span className="text-sm text-gray-700">{dialect}</span>
                <button
                  type="button"
                  onClick={() => onRemoveCustomDialect(dialect)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Hapus dialek"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DialogSection;