// Enhanced translation function with better English output
export async function translateText(text: string): Promise<string> {
  try {
    // Mock delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Enhanced translation mappings for better English output
    const translations: Record<string, string> = {
      // Basic video creation
      'Buat video bergaya': 'Create a video in',
      'tentang': 'featuring',
      'yang sedang': 'who is',
      'dengan emosi': 'with emotion',
      'di': 'at',
      'pada': 'during',
      'dengan cuaca': 'with weather',
      
      // Styles
      'sinematik': 'cinematic',
      'Sinematik yang Epik': 'epic cinematic',
      'Dokumenter yang Mendalam': 'deep documentary',
      'Realistis yang Natural': 'natural realistic',
      
      // Actions
      'berjualan dengan ramah': 'selling goods with friendliness',
      'menawar dengan cerdik': 'bargaining cleverly',
      'mengatur dagangan dengan rapi': 'organizing merchandise neatly',
      'melayani pembeli dengan sopan': 'serving customers politely',
      'mencangkul dengan tekun': 'hoeing diligently',
      'menanam padi dengan telaten': 'planting rice carefully',
      'memetik hasil panen dengan ceria': 'harvesting crops cheerfully',
      'membatik dengan teliti': 'creating batik meticulously',
      'mengukir kayu dengan sabar': 'carving wood patiently',
      
      // Emotions
      'ramah tamah': 'friendly and welcoming',
      'sopan santun': 'polite and courteous',
      'ikhlas': 'sincere',
      'sabar': 'patient',
      'gigih': 'persistent',
      'bersemangat': 'enthusiastic',
      'penuh semangat': 'full of spirit',
      'antusias': 'enthusiastic',
      'tenang': 'calm',
      'tenteram': 'peaceful',
      'damai': 'serene',
      
      // Locations
      'Pasar Tradisional yang Ramai': 'bustling traditional market',
      'Sawah yang Hijau': 'green rice fields',
      'Desa yang Damai': 'peaceful village',
      'Pantai yang Indah': 'beautiful beach',
      
      // Time
      'Pagi yang Cerah': 'bright morning',
      'Siang yang Terik': 'scorching noon',
      'Sore yang Hangat': 'warm afternoon',
      'Malam yang Sejuk': 'cool evening',
      
      // Weather
      'Cerah Berkilau': 'bright and sparkling',
      'Hujan Rintik-rintik': 'light drizzle',
      'Berawan Lembut': 'soft clouds',
      'Angin Sepoi-sepoi': 'gentle breeze',
      
      // Seasons
      'Kemarau yang Terik': 'hot dry season',
      'Hujan yang Sejuk': 'cool rainy season',
      'Peralihan Musim': 'transitional season',
      
      // Camera movements
      'Gunakan pergerakan kamera': 'Use camera movement',
      'Statik yang Stabil': 'stable static shots',
      'Panning yang Halus': 'smooth panning',
      'Drone yang Spektakuler': 'spectacular drone shots',
      
      // Camera angles
      'dari sudut': 'from',
      'Setinggi Mata yang Natural': 'natural eye-level angle',
      'Sudut Rendah yang Dramatis': 'dramatic low angle',
      'Sudut Tinggi yang Mengesankan': 'impressive high angle',
      
      // Focal length
      'dengan lensa': 'with',
      'Lebar (24mm) yang Luas': 'wide (24mm) lens for expansive view',
      'Medium (50mm) yang Natural': 'medium (50mm) lens for natural perspective',
      'Telefoto (85mm) yang Intim': 'telephoto (85mm) lens for intimate shots',
      
      // Lighting
      'Berikan pencahayaan': 'Apply',
      'Alami yang Natural': 'natural lighting',
      'Dramatis yang Intens': 'dramatic intense lighting',
      'Lembut yang Menenangkan': 'soft soothing lighting',
      
      // Color grading
      'dan gradiasi warna': 'and color grading with',
      'Alami yang Natural': 'natural tones',
      'Hangat yang Menyejukkan': 'warm comforting tones',
      'Dingin yang Menenangkan': 'cool calming tones',
      
      // Audio
      'Audio:': 'Audio:',
      'dialog dalam': 'dialogue in',
      'Bahasa Indonesia': 'Indonesian',
      'Bahasa Sunda': 'Sundanese',
      'Bahasa Jawa': 'Javanese',
      'Bahasa Batak': 'Batak',
      'Dialek Medan': 'Medan dialect',
      'Bahasa Betawi': 'Betawi',
      'Bahasa Minang': 'Minangkabau',
      'Bahasa Bali': 'Balinese',
      'Bahasa Bugis': 'Buginese',
      'Bahasa Banjar': 'Banjarese',
      
      'dengan suasana': 'with mood',
      'gembira yang ceria': 'joyful and cheerful',
      'sedih yang mengharukan': 'touching sadness',
      'marah yang tegas': 'firm anger',
      'tenang yang menenangkan': 'calm and soothing',
      'ramai yang dinamis': 'dynamic and lively',
      'sepi yang misterius': 'mysterious silence',
      
      // Music
      'Musik': 'Music:',
      'instrumental yang elegan': 'elegant instrumental',
      'pop yang energik': 'energetic pop',
      'klasik yang megah': 'majestic classical',
      'ambient yang menenangkan': 'soothing ambient',
      'elektronik yang futuristik': 'futuristic electronic',
      'jazz yang sofistikated': 'sophisticated jazz',
      'dramatis yang intens': 'intense dramatic',
      
      // Sound effects
      'efek suara': 'sound effects:',
      'hujan yang menyejukkan': 'refreshing rain',
      'angin yang sepoi-sepoi': 'gentle breeze',
      'ombak yang tenang': 'calm waves',
      'burung yang berkicau': 'chirping birds',
      'keramaian kota yang dinamis': 'dynamic city bustle',
      'keramaian pasar yang meriah': 'lively market atmosphere',
      
      // Technical specs
      'Spesifikasi teknis:': 'Technical specifications:',
      'Kualitas': 'Quality:',
      'Standar yang Jernih': 'clear standard quality',
      'HD yang Tajam': 'sharp HD quality',
      '4K yang Ultra Tajam': 'ultra-sharp 4K quality',
      
      // Audio processing
      'Pengolahan Audio:': 'Audio Processing:',
      'Equalizer:': 'Equalizer:',
      'Kompresi:': 'Compression:',
      'Reverb:': 'Reverb:',
      'Spatial Audio:': 'Spatial Audio:',
      'Master Volume:': 'Master Volume:',
      'Master:': 'Master:'
    };

    let translatedText = text;
    
    // Apply translations in order of specificity (longer phrases first)
    const sortedTranslations = Object.entries(translations).sort((a, b) => b[0].length - a[0].length);
    
    sortedTranslations.forEach(([indonesian, english]) => {
      const regex = new RegExp(indonesian.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      translatedText = translatedText.replace(regex, english);
    });

    // Post-processing for better English flow
    translatedText = translatedText
      // Fix common grammar issues
      .replace(/Create a video in (.+?) featuring/gi, 'Create a $1 style video featuring')
      .replace(/who is (.+?) with emotion/gi, 'who is $1 with')
      .replace(/at (.+?) during/gi, 'at $1 during')
      .replace(/Use camera movement (.+?) from/gi, 'Use $1 camera movement from')
      .replace(/with (.+?) lens for/gi, 'with $1 lens for')
      .replace(/Apply (.+?) and color grading with/gi, 'Apply $1 and $2 color grading')
      
      // Clean up spacing and punctuation
      .replace(/\s+/g, ' ')
      .replace(/\.\s*\n\n/g, '.\n\n')
      .replace(/:\s*\[/g, ': [')
      .replace(/\]\s*\(/g, '] (')
      .trim();

    return translatedText;
    
  } catch (error) {
    console.error('Translation error:', error);
    // Return original text if translation fails
    return text;
  }
}