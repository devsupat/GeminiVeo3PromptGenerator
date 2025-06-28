export interface FormData {
  // Basic video parameters
  mainSubject: string;
  subjectCharacteristic: string;
  mainAction: string;
  emotion: string;
  location: string;
  time: string;
  weather: string;
  season: string;
  
  // Visual style
  style: string;
  cameraMovement: string;
  cameraAngle: string;
  focalLength: string;
  lighting: string;
  colorGrading: string;
  
  // Audio settings
  voiceMood: string;
  backgroundMusic: string;
  soundEffects: string;
  volume: string;
  
  // Audio mixing
  showAudioMixing: boolean;
  dialogVolume: number;
  musicVolume: number;
  effectsVolume: number;
  overallVolume: number;
  
  // Audio processing
  showAudioProcessing: boolean;
  equalizer: string;
  compression: string;
  reverb: string;
  spatialAudio: string;
  
  // Technical settings
  videoQuality: string;
  
  // Additional details
  additionalDetails: string;
}

export interface DialogEntry {
  id: number;
  character: string;
  text: string;
  dialect: string;
}

export interface SoundEffect {
  id: number;
  name: string;
  description: string;
}