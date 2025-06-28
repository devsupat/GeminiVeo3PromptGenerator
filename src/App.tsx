import React, { useState, useEffect } from 'react';
import { Video, Sparkles, Copy, Check, Plus, Trash2, Camera, Mic, Palette, Settings, Volume2, Sliders, Lightbulb, X, Coffee, HelpCircle, Heart } from 'lucide-react';
import FormSection from './components/FormSection';
import InputField from './components/InputField';
import SelectField from './components/SelectField';
import TextareaField from './components/TextareaField';
import Button from './components/Button';
import PromptOutput from './components/PromptOutput';
import BrandSection from './components/BrandSection';
import SliderField from './components/SliderField';
import AIFieldWithSuggestions from './components/AIFieldWithSuggestions';
import DialogSection from './components/DialogSection';
import HowToUseModal from './components/HowToUseModal';
import { translateText } from './utils/translation';
import { generatePrompt } from './utils/promptGenerator';
import { getAISuggestions } from './utils/aiSuggestions';
import type { FormData, DialogEntry, SoundEffect } from './types';

function App() {
  const [formData, setFormData] = useState<FormData>({
    // Basic video parameters
    mainSubject: '',
    subjectCharacteristic: '',
    mainAction: '',
    emotion: '',
    location: '',
    time: '',
    weather: '',
    season: '',
    
    // Visual style
    style: '',
    cameraMovement: '',
    cameraAngle: '',
    focalLength: '',
    lighting: '',
    colorGrading: '',
    
    // Audio settings
    voiceMood: 'none',
    backgroundMusic: 'none',
    soundEffects: 'none',
    volume: '',
    
    // Audio mixing
    showAudioMixing: false,
    dialogVolume: 80,
    musicVolume: 60,
    effectsVolume: 40,
    overallVolume: 100,
    
    // Audio processing
    showAudioProcessing: false,
    equalizer: '',
    compression: '',
    reverb: '',
    spatialAudio: '',
    
    // Technical settings
    videoQuality: '',
    
    // Additional details
    additionalDetails: ''
  });

  const [dialogs, setDialogs] = useState<DialogEntry[]>([
    { id: 1, character: 'Karakter 1', text: '', dialect: 'indonesian' }
  ]);

  const [customSoundEffects, setCustomSoundEffects] = useState<SoundEffect[]>([
    { id: 1, name: '', description: '' }
  ]);

  const [generatedPrompts, setGeneratedPrompts] = useState<{
    indonesian: string;
    english: string;
  } | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [showHowToUse, setShowHowToUse] = useState(false);

  // Custom options state
  const [customOptions, setCustomOptions] = useState<{
    [key: string]: string[];
  }>({
    subjectCharacteristic: [],
    mainAction: [],
    emotion: [],
    location: [],
    time: [],
    weather: [],
    season: [],
    style: [],
    cameraMovement: [],
    cameraAngle: [],
    focalLength: [],
    lighting: [],
    colorGrading: [],
    voiceMood: [],
    backgroundMusic: [],
    soundEffects: [],
    volume: [],
    videoQuality: []
  });

  // Custom characters and dialects
  const [customCharacters, setCustomCharacters] = useState<string[]>([]);
  const [customDialects, setCustomDialects] = useState<string[]>([]);

  // Update form data
  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Add custom option
  const addCustomOption = (field: string, value: string) => {
    if (value.trim() && !customOptions[field].includes(value.trim())) {
      setCustomOptions(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
    }
  };

  // Remove custom option
  const removeCustomOption = (field: string, value: string) => {
    setCustomOptions(prev => ({
      ...prev,
      [field]: prev[field].filter(option => option !== value)
    }));
  };

  // Add custom character
  const addCustomCharacter = (character: string) => {
    if (character.trim() && !customCharacters.includes(character.trim())) {
      setCustomCharacters(prev => [...prev, character.trim()]);
    }
  };

  // Remove custom character
  const removeCustomCharacter = (character: string) => {
    setCustomCharacters(prev => prev.filter(char => char !== character));
  };

  // Add custom dialect
  const addCustomDialect = (dialect: string) => {
    if (dialect.trim() && !customDialects.includes(dialect.trim())) {
      setCustomDialects(prev => [...prev, dialect.trim()]);
    }
  };

  // Remove custom dialect
  const removeCustomDialect = (dialect: string) => {
    setCustomDialects(prev => prev.filter(d => d !== dialect));
  };

  // Add new dialog entry
  const addDialog = () => {
    const newId = Math.max(...dialogs.map(d => d.id)) + 1;
    setDialogs(prev => [...prev, { id: newId, character: 'Karakter 1', text: '', dialect: 'indonesian' }]);
  };

  // Remove dialog entry
  const removeDialog = (id: number) => {
    if (dialogs.length > 1) {
      setDialogs(prev => prev.filter(d => d.id !== id));
    }
  };

  // Update dialog
  const updateDialog = (id: number, field: 'character' | 'text' | 'dialect', value: string) => {
    setDialogs(prev => prev.map(d => 
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  // Add sound effect
  const addSoundEffect = () => {
    const newEffect: SoundEffect = {
      id: Date.now(),
      name: '',
      description: ''
    };
    setCustomSoundEffects(prev => [...prev, newEffect]);
  };

  // Remove sound effect
  const removeSoundEffect = (id: number) => {
    if (customSoundEffects.length > 1) {
      setCustomSoundEffects(prev => prev.filter(effect => effect.id !== id));
    }
  };

  // Update sound effect
  const updateSoundEffect = (id: number, field: 'name' | 'description', value: string) => {
    setCustomSoundEffects(prev => prev.map(effect =>
      effect.id === id ? { ...effect, [field]: value } : effect
    ));
  };

  // Generate prompts
  const handleGeneratePrompt = async () => {
    setIsGenerating(true);
    try {
      const indonesianPrompt = generatePrompt(formData, dialogs, customSoundEffects);
      const englishPrompt = await translateText(indonesianPrompt);
      
      setGeneratedPrompts({
        indonesian: indonesianPrompt,
        english: englishPrompt
      });
    } catch (error) {
      console.error('Error generating prompt:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Auto-generate on form changes
  useEffect(() => {
    const timer = setTimeout(() => {
      handleGeneratePrompt();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [formData, dialogs, customSoundEffects]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="text-center py-12 px-4">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Generator Prompt Video Veo 3
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto flex items-center justify-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Buat prompt video yang menakjubkan dengan mudah menggunakan AI suggestions
          </p>
          
          {/* How to Use Button */}
          <div className="mt-6">
            <Button
              onClick={() => setShowHowToUse(true)}
              variant="outline"
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 border-blue-200 text-blue-700 hover:text-blue-800"
            >
              <HelpCircle className="w-5 h-5" />
              How to Use
            </Button>
          </div>
        </header>

        {/* Brand Section */}
        <BrandSection />

        <div className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* 1. Detail Subjek dan Aksi */}
              <FormSection 
                title="1. Detail Subjek dan Aksi" 
                icon={<Video className="w-5 h-5" />}
                description="Tentukan subjek utama dan aksi yang akan dilakukan dengan bantuan AI"
              >
                <div className="space-y-4">
                  <InputField
                    label="Subjek Utama"
                    placeholder="Contoh: Seorang atlet profesional yang sedang berlari..."
                    value={formData.mainSubject}
                    onChange={(value) => updateFormData('mainSubject', value)}
                  />
                  
                  <AIFieldWithSuggestions
                    label="Karakteristik Subjek"
                    value={formData.subjectCharacteristic}
                    onChange={(value) => updateFormData('subjectCharacteristic', value)}
                    onAddCustom={(value) => addCustomOption('subjectCharacteristic', value)}
                    onRemoveCustom={(value) => removeCustomOption('subjectCharacteristic', value)}
                    customOptions={customOptions.subjectCharacteristic}
                    fieldType="subjectCharacteristic"
                    options={[
                      { value: '', label: 'Pilih karakteristik...' },
                      { value: 'pedagang pasar tradisional yang ramah', label: 'Pedagang Pasar Tradisional yang Ramah' },
                      { value: 'pedagang kaki lima yang gigih', label: 'Pedagang Kaki Lima yang Gigih' },
                      { value: 'pedagang warung kopi yang ceria', label: 'Pedagang Warung Kopi yang Ceria' },
                      { value: 'petani padi yang tekun', label: 'Petani Padi yang Tekun' },
                      { value: 'petani sayuran yang teliti', label: 'Petani Sayuran yang Teliti' },
                      { value: 'petani buah-buahan yang sabar', label: 'Petani Buah-buahan yang Sabar' },
                      { value: 'petani kopi yang berdedikasi', label: 'Petani Kopi yang Berdedikasi' }
                    ]}
                  />

                  <AIFieldWithSuggestions
                    label="Aksi Utama"
                    value={formData.mainAction}
                    onChange={(value) => updateFormData('mainAction', value)}
                    onAddCustom={(value) => addCustomOption('mainAction', value)}
                    onRemoveCustom={(value) => removeCustomOption('mainAction', value)}
                    customOptions={customOptions.mainAction}
                    fieldType="mainAction"
                    options={[
                      { value: '', label: 'Pilih aksi...' },
                      { value: 'berjualan dengan ramah', label: 'Berjualan dengan Ramah' },
                      { value: 'menawar dengan cerdik', label: 'Menawar dengan Cerdik' },
                      { value: 'mengatur dagangan dengan rapi', label: 'Mengatur Dagangan dengan Rapi' },
                      { value: 'melayani pembeli dengan sopan', label: 'Melayani Pembeli dengan Sopan' },
                      { value: 'mencangkul dengan tekun', label: 'Mencangkul dengan Tekun' },
                      { value: 'menanam padi dengan telaten', label: 'Menanam Padi dengan Telaten' },
                      { value: 'memetik hasil panen dengan ceria', label: 'Memetik Hasil Panen dengan Ceria' },
                      { value: 'membatik dengan teliti', label: 'Membatik dengan Teliti' },
                      { value: 'mengukir kayu dengan sabar', label: 'Mengukir Kayu dengan Sabar' }
                    ]}
                  />

                  <AIFieldWithSuggestions
                    label="Emosi"
                    value={formData.emotion}
                    onChange={(value) => updateFormData('emotion', value)}
                    onAddCustom={(value) => addCustomOption('emotion', value)}
                    onRemoveCustom={(value) => removeCustomOption('emotion', value)}
                    customOptions={customOptions.emotion}
                    fieldType="emotion"
                    options={[
                      { value: '', label: 'Pilih emosi...' },
                      { value: 'ramah tamah', label: 'Ramah Tamah' },
                      { value: 'sopan santun', label: 'Sopan Santun' },
                      { value: 'ikhlas', label: 'Ikhlas' },
                      { value: 'sabar', label: 'Sabar' },
                      { value: 'gigih', label: 'Gigih' },
                      { value: 'bersemangat', label: 'Bersemangat' },
                      { value: 'penuh semangat', label: 'Penuh Semangat' },
                      { value: 'antusias', label: 'Antusias' },
                      { value: 'tenang', label: 'Tenang' },
                      { value: 'tenteram', label: 'Tenteram' },
                      { value: 'damai', label: 'Damai' }
                    ]}
                  />
                </div>
              </FormSection>

              {/* 2. Lingkungan dan Atmosfer */}
              <FormSection 
                title="2. Lingkungan dan Atmosfer" 
                icon={<Palette className="w-5 h-5" />}
                description="Tentukan setting lokasi dan kondisi lingkungan dengan AI suggestions"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AIFieldWithSuggestions
                    label="Lokasi"
                    value={formData.location}
                    onChange={(value) => updateFormData('location', value)}
                    onAddCustom={(value) => addCustomOption('location', value)}
                    onRemoveCustom={(value) => removeCustomOption('location', value)}
                    customOptions={customOptions.location}
                    fieldType="location"
                    options={[
                      { value: '', label: 'Pilih lokasi...' },
                      { value: 'Pasar Tradisional yang Ramai', label: 'Pasar Tradisional yang Ramai' },
                      { value: 'Sawah yang Hijau', label: 'Sawah yang Hijau' },
                      { value: 'Desa yang Damai', label: 'Desa yang Damai' },
                      { value: 'Pantai yang Indah', label: 'Pantai yang Indah' }
                    ]}
                  />
                  
                  <AIFieldWithSuggestions
                    label="Waktu"
                    value={formData.time}
                    onChange={(value) => updateFormData('time', value)}
                    onAddCustom={(value) => addCustomOption('time', value)}
                    onRemoveCustom={(value) => removeCustomOption('time', value)}
                    customOptions={customOptions.time}
                    fieldType="time"
                    options={[
                      { value: '', label: 'Pilih waktu...' },
                      { value: 'Pagi yang Cerah', label: 'Pagi yang Cerah' },
                      { value: 'Siang yang Terik', label: 'Siang yang Terik' },
                      { value: 'Sore yang Hangat', label: 'Sore yang Hangat' },
                      { value: 'Malam yang Sejuk', label: 'Malam yang Sejuk' }
                    ]}
                  />
                  
                  <AIFieldWithSuggestions
                    label="Cuaca"
                    value={formData.weather}
                    onChange={(value) => updateFormData('weather', value)}
                    onAddCustom={(value) => addCustomOption('weather', value)}
                    onRemoveCustom={(value) => removeCustomOption('weather', value)}
                    customOptions={customOptions.weather}
                    fieldType="weather"
                    options={[
                      { value: '', label: 'Pilih cuaca...' },
                      { value: 'Cerah Berkilau', label: 'Cerah Berkilau' },
                      { value: 'Hujan Rintik-rintik', label: 'Hujan Rintik-rintik' },
                      { value: 'Berawan Lembut', label: 'Berawan Lembut' },
                      { value: 'Angin Sepoi-sepoi', label: 'Angin Sepoi-sepoi' }
                    ]}
                  />
                  
                  <AIFieldWithSuggestions
                    label="Musim"
                    value={formData.season}
                    onChange={(value) => updateFormData('season', value)}
                    onAddCustom={(value) => addCustomOption('season', value)}
                    onRemoveCustom={(value) => removeCustomOption('season', value)}
                    customOptions={customOptions.season}
                    fieldType="season"
                    options={[
                      { value: '', label: 'Pilih musim...' },
                      { value: 'Kemarau yang Terik', label: 'Kemarau yang Terik' },
                      { value: 'Hujan yang Sejuk', label: 'Hujan yang Sejuk' },
                      { value: 'Peralihan Musim', label: 'Peralihan Musim' }
                    ]}
                  />
                </div>
              </FormSection>

              {/* 3. Sinematografi */}
              <FormSection 
                title="3. Sinematografi" 
                icon={<Camera className="w-5 h-5" />}
                description="Konfigurasi pengaturan kamera dan visual dengan bantuan AI"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AIFieldWithSuggestions
                    label="Gaya"
                    value={formData.style}
                    onChange={(value) => updateFormData('style', value)}
                    onAddCustom={(value) => addCustomOption('style', value)}
                    onRemoveCustom={(value) => removeCustomOption('style', value)}
                    customOptions={customOptions.style}
                    fieldType="style"
                    options={[
                      { value: '', label: 'Pilih gaya...' },
                      { value: 'Sinematik yang Epik', label: 'Sinematik yang Epik' },
                      { value: 'Dokumenter yang Mendalam', label: 'Dokumenter yang Mendalam' },
                      { value: 'Realistis yang Natural', label: 'Realistis yang Natural' }
                    ]}
                  />
                  
                  <AIFieldWithSuggestions
                    label="Pergerakan Kamera"
                    value={formData.cameraMovement}
                    onChange={(value) => updateFormData('cameraMovement', value)}
                    onAddCustom={(value) => addCustomOption('cameraMovement', value)}
                    onRemoveCustom={(value) => removeCustomOption('cameraMovement', value)}
                    customOptions={customOptions.cameraMovement}
                    fieldType="cameraMovement"
                    options={[
                      { value: '', label: 'Pilih pergerakan...' },
                      { value: 'Statik yang Stabil', label: 'Statik yang Stabil' },
                      { value: 'Panning yang Halus', label: 'Panning yang Halus' },
                      { value: 'Drone yang Spektakuler', label: 'Drone yang Spektakuler' }
                    ]}
                  />
                  
                  <AIFieldWithSuggestions
                    label="Sudut Kamera"
                    value={formData.cameraAngle}
                    onChange={(value) => updateFormData('cameraAngle', value)}
                    onAddCustom={(value) => addCustomOption('cameraAngle', value)}
                    onRemoveCustom={(value) => removeCustomOption('cameraAngle', value)}
                    customOptions={customOptions.cameraAngle}
                    fieldType="cameraAngle"
                    options={[
                      { value: '', label: 'Pilih sudut...' },
                      { value: 'Setinggi Mata yang Natural', label: 'Setinggi Mata yang Natural' },
                      { value: 'Sudut Rendah yang Dramatis', label: 'Sudut Rendah yang Dramatis' },
                      { value: 'Sudut Tinggi yang Mengesankan', label: 'Sudut Tinggi yang Mengesankan' }
                    ]}
                  />
                  
                  <AIFieldWithSuggestions
                    label="Panjang Fokus"
                    value={formData.focalLength}
                    onChange={(value) => updateFormData('focalLength', value)}
                    onAddCustom={(value) => addCustomOption('focalLength', value)}
                    onRemoveCustom={(value) => removeCustomOption('focalLength', value)}
                    customOptions={customOptions.focalLength}
                    fieldType="focalLength"
                    options={[
                      { value: '', label: 'Pilih fokus...' },
                      { value: 'Lebar (24mm) yang Luas', label: 'Lebar (24mm) yang Luas' },
                      { value: 'Medium (50mm) yang Natural', label: 'Medium (50mm) yang Natural' },
                      { value: 'Telefoto (85mm) yang Intim', label: 'Telefoto (85mm) yang Intim' }
                    ]}
                  />
                  
                  <AIFieldWithSuggestions
                    label="Pencahayaan"
                    value={formData.lighting}
                    onChange={(value) => updateFormData('lighting', value)}
                    onAddCustom={(value) => addCustomOption('lighting', value)}
                    onRemoveCustom={(value) => removeCustomOption('lighting', value)}
                    customOptions={customOptions.lighting}
                    fieldType="lighting"
                    options={[
                      { value: '', label: 'Pilih pencahayaan...' },
                      { value: 'Alami yang Natural', label: 'Alami yang Natural' },
                      { value: 'Dramatis yang Intens', label: 'Dramatis yang Intens' },
                      { value: 'Lembut yang Menenangkan', label: 'Lembut yang Menenangkan' }
                    ]}
                  />
                  
                  <AIFieldWithSuggestions
                    label="Gradiasi Warna"
                    value={formData.colorGrading}
                    onChange={(value) => updateFormData('colorGrading', value)}
                    onAddCustom={(value) => addCustomOption('colorGrading', value)}
                    onRemoveCustom={(value) => removeCustomOption('colorGrading', value)}
                    customOptions={customOptions.colorGrading}
                    fieldType="colorGrading"
                    options={[
                      { value: '', label: 'Pilih gradiasi...' },
                      { value: 'Alami yang Natural', label: 'Alami yang Natural' },
                      { value: 'Hangat yang Menyejukkan', label: 'Hangat yang Menyejukkan' },
                      { value: 'Dingin yang Menenangkan', label: 'Dingin yang Menenangkan' }
                    ]}
                  />
                </div>
              </FormSection>

              {/* 4. Audio */}
              <FormSection 
                title="4. Audio" 
                icon={<Mic className="w-5 h-5" />}
                description="Konfigurasi elemen audio dan dialog dengan dukungan dialek regional"
              >
                <div className="space-y-6">
                  {/* Dialog Section with Regional Dialects */}
                  <DialogSection
                    dialogs={dialogs}
                    onAddDialog={addDialog}
                    onRemoveDialog={removeDialog}
                    onUpdateDialog={updateDialog}
                    customCharacters={customCharacters}
                    onAddCustomCharacter={addCustomCharacter}
                    onRemoveCustomCharacter={removeCustomCharacter}
                    customDialects={customDialects}
                    onAddCustomDialect={addCustomDialect}
                    onRemoveCustomDialect={removeCustomDialect}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AIFieldWithSuggestions
                      label="Suasana Suara"
                      value={formData.voiceMood}
                      onChange={(value) => updateFormData('voiceMood', value)}
                      onAddCustom={(value) => addCustomOption('voiceMood', value)}
                      onRemoveCustom={(value) => removeCustomOption('voiceMood', value)}
                      customOptions={customOptions.voiceMood}
                      fieldType="voiceMood"
                      options={[
                        { value: 'none', label: 'Tidak Ada' },
                        { value: 'gembira yang ceria', label: 'Gembira yang Ceria' },
                        { value: 'sedih yang mengharukan', label: 'Sedih yang Mengharukan' },
                        { value: 'marah yang tegas', label: 'Marah yang Tegas' },
                        { value: 'tenang yang menenangkan', label: 'Tenang yang Menenangkan' },
                        { value: 'ramai yang dinamis', label: 'Ramai yang Dinamis' },
                        { value: 'sepi yang misterius', label: 'Sepi yang Misterius' }
                      ]}
                    />

                    <AIFieldWithSuggestions
                      label="Musik Latar"
                      value={formData.backgroundMusic}
                      onChange={(value) => updateFormData('backgroundMusic', value)}
                      onAddCustom={(value) => addCustomOption('backgroundMusic', value)}
                      onRemoveCustom={(value) => removeCustomOption('backgroundMusic', value)}
                      customOptions={customOptions.backgroundMusic}
                      fieldType="backgroundMusic"
                      options={[
                        { value: 'none', label: 'Tanpa Musik' },
                        { value: 'instrumental yang elegan', label: 'Instrumental yang Elegan' },
                        { value: 'pop yang energik', label: 'Pop yang Energik' },
                        { value: 'klasik yang megah', label: 'Klasik yang Megah' },
                        { value: 'ambient yang menenangkan', label: 'Ambient yang Menenangkan' },
                        { value: 'elektronik yang futuristik', label: 'Elektronik yang Futuristik' },
                        { value: 'jazz yang sofistikated', label: 'Jazz yang Sofistikated' },
                        { value: 'dramatis yang intens', label: 'Dramatis yang Intens' }
                      ]}
                    />

                    <AIFieldWithSuggestions
                      label="Efek Suara"
                      value={formData.soundEffects}
                      onChange={(value) => updateFormData('soundEffects', value)}
                      onAddCustom={(value) => addCustomOption('soundEffects', value)}
                      onRemoveCustom={(value) => removeCustomOption('soundEffects', value)}
                      customOptions={customOptions.soundEffects}
                      fieldType="soundEffects"
                      options={[
                        { value: 'none', label: 'Tanpa Efek' },
                        { value: 'hujan yang menyejukkan', label: 'Hujan yang Menyejukkan' },
                        { value: 'angin yang sepoi-sepoi', label: 'Angin yang Sepoi-sepoi' },
                        { value: 'ombak yang tenang', label: 'Ombak yang Tenang' },
                        { value: 'burung yang berkicau', label: 'Burung yang Berkicau' },
                        { value: 'keramaian kota yang dinamis', label: 'Keramaian Kota yang Dinamis' },
                        { value: 'keramaian pasar yang meriah', label: 'Keramaian Pasar yang Meriah' },
                        { value: 'custom', label: 'Custom' }
                      ]}
                    />

                    <AIFieldWithSuggestions
                      label="Volume"
                      value={formData.volume}
                      onChange={(value) => updateFormData('volume', value)}
                      onAddCustom={(value) => addCustomOption('volume', value)}
                      onRemoveCustom={(value) => removeCustomOption('volume', value)}
                      customOptions={customOptions.volume}
                      fieldType="volume"
                      options={[
                        { value: '', label: 'Pilih volume...' },
                        { value: 'Low low', label: 'Low low' },
                        { value: 'Medium is balanced', label: 'Medium is balanced' },
                        { value: 'High powerful', label: 'High powerful' }
                      ]}
                    />
                  </div>

                  {/* Custom Sound Effects */}
                  {formData.soundEffects === 'custom' && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-800">Efek Suara Custom</h4>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={addSoundEffect}
                          className="flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Tambah Efek Suara
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {customSoundEffects.map((effect) => (
                          <div key={effect.id} className="flex gap-3 items-start p-4 bg-gray-50 rounded-lg">
                            <InputField
                              label=""
                              placeholder="Deskripsikan efek suara..."
                              value={effect.name}
                              onChange={(value) => updateSoundEffect(effect.id, 'name', value)}
                              className="flex-1"
                            />
                            {customSoundEffects.length > 1 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeSoundEffect(effect.id)}
                                className="text-red-600 hover:text-red-700 hover:border-red-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </FormSection>

              {/* Audio Mixing Settings */}
              <FormSection 
                title="Pengaturan Audio Mixing" 
                icon={<Volume2 className="w-5 h-5" />}
                description="Kontrol volume dan mixing audio"
              >
                <div className="mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.showAudioMixing}
                      onChange={(e) => updateFormData('showAudioMixing', e.target.checked)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-lg font-semibold text-gray-700">Tampilkan Pengaturan</span>
                  </label>
                </div>

                {formData.showAudioMixing && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SliderField
                      label="Volume Dialog"
                      value={formData.dialogVolume}
                      onChange={(value) => updateFormData('dialogVolume', value)}
                      min={0}
                      max={100}
                      unit="%"
                    />
                    <SliderField
                      label="Volume Musik"
                      value={formData.musicVolume}
                      onChange={(value) => updateFormData('musicVolume', value)}
                      min={0}
                      max={100}
                      unit="%"
                    />
                    <SliderField
                      label="Volume Efek Suara"
                      value={formData.effectsVolume}
                      onChange={(value) => updateFormData('effectsVolume', value)}
                      min={0}
                      max={100}
                      unit="%"
                    />
                    <SliderField
                      label="Volume Keseluruhan"
                      value={formData.overallVolume}
                      onChange={(value) => updateFormData('overallVolume', value)}
                      min={0}
                      max={100}
                      unit="%"
                    />
                  </div>
                )}
              </FormSection>

              {/* Audio Processing Settings */}
              <FormSection 
                title="Pengolahan Audio" 
                icon={<Sliders className="w-5 h-5" />}
                description="Pengaturan lanjutan untuk kualitas audio"
              >
                <div className="mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.showAudioProcessing}
                      onChange={(e) => updateFormData('showAudioProcessing', e.target.checked)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-lg font-semibold text-gray-700">Tampilkan Pengaturan</span>
                  </label>
                </div>

                {formData.showAudioProcessing && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                      label="Equalizer"
                      value={formData.equalizer}
                      onChange={(value) => updateFormData('equalizer', value)}
                      options={[
                        { value: '', label: 'Tanpa Equalizer' },
                        { value: 'Bass Boost', label: 'Bass Boost' },
                        { value: 'Treble Boost', label: 'Treble Boost' },
                        { value: 'Vocal Enhance', label: 'Vocal Enhance' }
                      ]}
                    />
                    
                    <SelectField
                      label="Kompresi"
                      value={formData.compression}
                      onChange={(value) => updateFormData('compression', value)}
                      options={[
                        { value: '', label: 'Tanpa Kompresi' },
                        { value: 'Light Compression', label: 'Light Compression' },
                        { value: 'Medium Compression', label: 'Medium Compression' },
                        { value: 'Heavy Compression', label: 'Heavy Compression' }
                      ]}
                    />
                    
                    <SelectField
                      label="Reverb"
                      value={formData.reverb}
                      onChange={(value) => updateFormData('reverb', value)}
                      options={[
                        { value: '', label: 'Tanpa Reverb' },
                        { value: 'Small Room', label: 'Small Room' },
                        { value: 'Large Hall', label: 'Large Hall' },
                        { value: 'Cathedral', label: 'Cathedral' }
                      ]}
                    />
                    
                    <SelectField
                      label="Spatial Audio"
                      value={formData.spatialAudio}
                      onChange={(value) => updateFormData('spatialAudio', value)}
                      options={[
                        { value: '', label: 'Tanpa Spatial Audio' },
                        { value: 'Stereo Wide', label: 'Stereo Wide' },
                        { value: 'Surround Sound', label: 'Surround Sound' },
                        { value: '3D Audio', label: '3D Audio' }
                      ]}
                    />
                  </div>
                )}
              </FormSection>

              {/* 5. Parameter Teknis dan Tambahan */}
              <FormSection 
                title="5. Parameter Teknis dan Tambahan" 
                icon={<Settings className="w-5 h-5" />}
                description="Pengaturan kualitas dan detail tambahan dengan AI suggestions"
              >
                <div className="space-y-4">
                  <AIFieldWithSuggestions
                    label="Kualitas Video"
                    value={formData.videoQuality}
                    onChange={(value) => updateFormData('videoQuality', value)}
                    onAddCustom={(value) => addCustomOption('videoQuality', value)}
                    onRemoveCustom={(value) => removeCustomOption('videoQuality', value)}
                    customOptions={customOptions.videoQuality}
                    fieldType="videoQuality"
                    options={[
                      { value: '', label: 'Pilih kualitas...' },
                      { value: 'Standar yang Jernih', label: 'Standar yang Jernih' },
                      { value: 'HD yang Tajam', label: 'HD yang Tajam' },
                      { value: '4K yang Ultra Tajam', label: '4K yang Ultra Tajam' }
                    ]}
                  />
                  
                  <TextareaField
                    label="Detail Tambahan"
                    placeholder="Tambahkan detail tambahan atau persyaratan spesifik untuk meningkatkan kualitas video..."
                    value={formData.additionalDetails}
                    onChange={(value) => updateFormData('additionalDetails', value)}
                    rows={4}
                  />
                </div>
              </FormSection>
            </div>

            {/* Output Section */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <PromptOutput
                  prompts={generatedPrompts}
                  isGenerating={isGenerating}
                  onGenerate={handleGeneratePrompt}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Coffee Support Footer */}
        <footer className="py-8 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-gray-600 text-sm md:text-base flex items-center justify-center gap-2">
                Dibuat dengan{' '}
                <Heart className="w-5 h-5 text-red-500 animate-pulse" />
                {' '}
                <a 
                  href="https://saweria.co/ahmadsaoghi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200 hover:underline"
                >
                  🍵 Beliin Kopi
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* How to Use Modal */}
      <HowToUseModal 
        isOpen={showHowToUse} 
        onClose={() => setShowHowToUse(false)} 
      />
    </div>
  );
}

export default App;