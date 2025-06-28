import type { FormData, DialogEntry, SoundEffect } from '../types';

// Dialect mappings for regional languages
const dialectMappings: Record<string, string> = {
  'indonesian': 'Bahasa Indonesia',
  'sundanese': 'Bahasa Sunda',
  'javanese': 'Bahasa Jawa',
  'batak': 'Bahasa Batak',
  'medan': 'Dialek Medan',
  'betawi': 'Bahasa Betawi',
  'minang': 'Bahasa Minang',
  'bali': 'Bahasa Bali',
  'bugis': 'Bahasa Bugis',
  'banjar': 'Bahasa Banjar'
};

export function generatePrompt(formData: FormData, dialogs: DialogEntry[], customSoundEffects: SoundEffect[]): string {
  let prompt = '';

  // Start with video style and subject
  const subject = formData.mainSubject || formData.subjectCharacteristic;
  if (subject) {
    prompt += `Buat video bergaya ${formData.style || 'sinematik'} tentang ${subject}`;
  } else {
    prompt += `Buat video bergaya ${formData.style || 'sinematik'}`;
  }

  // Add action and emotion
  if (formData.mainAction) {
    prompt += ` yang sedang ${formData.mainAction}`;
  }
  if (formData.emotion) {
    prompt += ` dengan emosi ${formData.emotion}`;
  }

  // Add location and environment
  if (formData.location) {
    prompt += ` di ${formData.location}`;
  }
  if (formData.time) {
    prompt += ` pada ${formData.time}`;
  }
  if (formData.season) {
    prompt += ` ${formData.season}`;
  }
  if (formData.weather) {
    prompt += ` dengan cuaca ${formData.weather}`;
  }

  prompt += '.\n\n';

  // Add cinematography details
  let cinematography = [];
  if (formData.cameraMovement) {
    cinematography.push(`pergerakan kamera ${formData.cameraMovement}`);
  }
  if (formData.cameraAngle) {
    cinematography.push(`dari sudut ${formData.cameraAngle}`);
  }
  if (formData.focalLength) {
    cinematography.push(`dengan lensa ${formData.focalLength}`);
  }

  if (cinematography.length > 0) {
    prompt += `Gunakan ${cinematography.join(', ')}. `;
  }

  // Add lighting and color grading
  let visual = [];
  if (formData.lighting) {
    visual.push(`pencahayaan ${formData.lighting}`);
  }
  if (formData.colorGrading) {
    visual.push(`gradiasi warna ${formData.colorGrading}`);
  }

  if (visual.length > 0) {
    prompt += `Berikan ${visual.join(' dan ')}.\n\n`;
  }

  // Add audio elements
  let audioElements = [];

  // Add dialogs with regional dialect support
  const nonEmptyDialogs = dialogs.filter(d => d.text.trim());
  if (nonEmptyDialogs.length > 0) {
    // Group dialogs by dialect
    const dialogsByDialect = nonEmptyDialogs.reduce((acc, dialog) => {
      const dialectName = dialectMappings[dialog.dialect] || dialog.dialect;
      if (!acc[dialectName]) {
        acc[dialectName] = [];
      }
      acc[dialectName].push(`${dialog.character}: "${dialog.text}"`);
      return acc;
    }, {} as Record<string, string[]>);

    // Create sections for each dialect
    const dialectSections = Object.entries(dialogsByDialect).map(([dialect, dialogTexts]) => {
      let section = `dialog dalam ${dialect}: [${dialogTexts.join(', ')}]`;
      
      if (formData.voiceMood && formData.voiceMood !== 'none') {
        section += ` dengan suasana ${formData.voiceMood}`;
      }
      
      if (formData.showAudioMixing) {
        section += ` (${formData.dialogVolume}%)`;
      }
      
      return section;
    });

    audioElements.push(...dialectSections);
  }

  // Add background music
  if (formData.backgroundMusic && formData.backgroundMusic !== 'none') {
    let musicSection = `musik ${formData.backgroundMusic}`;
    
    if (formData.showAudioMixing) {
      musicSection += ` (${formData.musicVolume}%)`;
    }
    
    audioElements.push(musicSection);
  }

  // Add sound effects
  if (formData.soundEffects && formData.soundEffects !== 'none') {
    let effectsSection = '';
    
    if (formData.soundEffects === 'custom') {
      const effects = customSoundEffects
        .filter(effect => effect.name.trim())
        .map(effect => effect.name)
        .join(', ');
      if (effects) {
        effectsSection = `efek suara: [${effects}]`;
      }
    } else {
      effectsSection = `efek suara ${formData.soundEffects}`;
    }
    
    if (effectsSection && formData.showAudioMixing) {
      effectsSection += ` (${formData.effectsVolume}%)`;
    }
    
    if (effectsSection) {
      audioElements.push(effectsSection);
    }
  }

  // Add volume setting
  if (formData.volume) {
    audioElements.push(`volume ${formData.volume}`);
  }

  // Add audio processing if enabled
  if (formData.showAudioProcessing) {
    let processingDetails = [];
    if (formData.equalizer) {
      processingDetails.push(`Equalizer: ${formData.equalizer}`);
    }
    if (formData.compression) {
      processingDetails.push(`Kompresi: ${formData.compression}`);
    }
    if (formData.reverb) {
      processingDetails.push(`Reverb: ${formData.reverb}`);
    }
    if (formData.spatialAudio) {
      processingDetails.push(`Spatial Audio: ${formData.spatialAudio}`);
    }

    if (processingDetails.length > 0) {
      audioElements.push(`Pengolahan Audio: ${processingDetails.join(', ')}`);
    }
  }

  // Add master volume if audio mixing is enabled
  if (formData.showAudioMixing && audioElements.length > 0) {
    audioElements.push(`Master Volume: ${formData.overallVolume}%`);
  }

  if (audioElements.length > 0) {
    prompt += `Audio: ${audioElements.join(', ')}.\n\n`;
  }

  // Add technical specifications
  if (formData.videoQuality) {
    prompt += `Spesifikasi teknis: Kualitas ${formData.videoQuality}.`;
  }

  // Add additional details
  if (formData.additionalDetails) {
    prompt += `\n\n${formData.additionalDetails}`;
  }

  return prompt;
}