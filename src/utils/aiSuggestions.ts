// AI-powered suggestions for different field types
export async function getAISuggestions(fieldType: string): Promise<string[]> {
  // Simulate AI suggestions based on field type with Indonesian cultural context
  const suggestions: Record<string, string[]> = {
    subjectCharacteristic: [
      'pedagang batik yang berpengalaman',
      'petani organik yang inovatif',
      'nelayan tradisional yang tangguh',
      'pengrajin keramik yang teliti',
      'peternak sapi yang berdedikasi',
      'pedagang rempah yang berpengalaman',
      'petani hidroponik yang modern',
      'pengrajin anyaman yang kreatif',
      'tukang becak yang ramah',
      'penjual jamu gendong yang gigih'
    ],
    mainAction: [
      'memasarkan produk dengan antusias',
      'mengolah tanah dengan tekun',
      'menangkap ikan dengan terampil',
      'membentuk keramik dengan presisi',
      'merawat ternak dengan kasih sayang',
      'mengemas rempah dengan teliti',
      'memantau tanaman dengan cermat',
      'menganyam dengan keterampilan tinggi',
      'mengayuh becak dengan semangat',
      'menjajakan jamu dengan ramah'
    ],
    emotion: [
      'bangga dengan hasil karya',
      'bersyukur atas rezeki',
      'optimis menghadapi tantangan',
      'tekun dalam bekerja',
      'gembira melayani pelanggan',
      'fokus pada kualitas',
      'semangat berinovasi',
      'tenang dalam bekerja',
      'penuh harapan',
      'bersemangat tinggi'
    ],
    location: [
      'Pasar Apung Banjarmasin',
      'Sawah Terasering Jatiluwih',
      'Pantai Nelayan Jimbaran',
      'Desa Wisata Penglipuran',
      'Kebun Teh Puncak',
      'Kampung Batik Laweyan',
      'Pelabuhan Sunda Kelapa',
      'Desa Adat Tenganan',
      'Pasar Beringharjo Yogyakarta',
      'Kampung Pelangi Malang'
    ],
    time: [
      'Subuh yang tenang',
      'Pagi yang segar',
      'Siang yang produktif',
      'Sore yang hangat',
      'Maghrib yang indah',
      'Malam yang damai',
      'Dini hari yang hening',
      'Fajar yang menyingsing'
    ],
    weather: [
      'Cerah dengan angin sepoi',
      'Mendung yang sejuk',
      'Hujan gerimis yang menyegarkan',
      'Kabut pagi yang mistis',
      'Sinar matahari yang hangat',
      'Angin laut yang segar',
      'Embun pagi yang berkilau',
      'Langit biru yang cerah'
    ],
    season: [
      'Musim panen yang berlimpah',
      'Musim tanam yang sibuk',
      'Musim kemarau yang panjang',
      'Musim hujan yang subur',
      'Peralihan musim yang dinamis',
      'Musim buah yang melimpah',
      'Musim liburan yang ceria'
    ],
    style: [
      'Dokumenter yang autentik',
      'Sinematik yang dramatis',
      'Realistis yang natural',
      'Artistik yang kreatif',
      'Vintage yang nostalgik',
      'Modern yang minimalis',
      'Tradisional yang khas',
      'Kontemporer yang fresh'
    ],
    cameraMovement: [
      'Tracking shot yang mengikuti subjek',
      'Drone shot yang spektakuler',
      'Handheld yang dinamis',
      'Steadicam yang halus',
      'Crane shot yang megah',
      'Dolly zoom yang dramatis',
      'Gimbal yang stabil',
      'Slider yang smooth'
    ],
    cameraAngle: [
      'Bird eye view yang menyeluruh',
      'Worm eye view yang unik',
      'Dutch angle yang dinamis',
      'Over shoulder yang intim',
      'Close-up yang detail',
      'Wide shot yang luas',
      'Medium shot yang seimbang',
      'Extreme close-up yang intens'
    ],
    focalLength: [
      'Ultra wide (14mm) yang ekspansif',
      'Wide angle (24mm) yang luas',
      'Standard (35mm) yang natural',
      'Portrait (85mm) yang intim',
      'Telephoto (135mm) yang fokus',
      'Super telephoto (200mm) yang isolatif',
      'Fisheye yang unik',
      'Macro yang detail'
    ],
    lighting: [
      'Golden hour yang hangat',
      'Blue hour yang magis',
      'Backlight yang dramatis',
      'Soft light yang lembut',
      'Hard light yang kontras',
      'Natural light yang autentik',
      'Rim light yang artistik',
      'Ambient light yang natural'
    ],
    colorGrading: [
      'Warm tone yang nyaman',
      'Cool tone yang modern',
      'Vintage look yang nostalgik',
      'High contrast yang dramatis',
      'Desaturated yang artistik',
      'Vibrant yang energik',
      'Sepia yang klasik',
      'Monochrome yang elegan'
    ],
    voiceMood: [
      'antusias dan bersemangat',
      'tenang dan bijaksana',
      'ramah dan hangat',
      'serius dan fokus',
      'ceria dan optimis',
      'khidmat dan sakral',
      'santai dan rileks',
      'penuh semangat'
    ],
    backgroundMusic: [
      'gamelan tradisional yang megah',
      'akustik folk yang hangat',
      'ambient nature yang menenangkan',
      'orchestral yang epik',
      'ethnic fusion yang modern',
      'minimalist piano yang elegan',
      'keroncong yang nostalgik',
      'dangdut yang energik'
    ],
    soundEffects: [
      'suara pasar yang ramai',
      'gemericik air sawah',
      'deburan ombak pantai',
      'kicauan burung pagi',
      'suara angin di pegunungan',
      'aktivitas desa yang damai',
      'suara gamelan yang merdu',
      'gemuruh petir yang dramatis'
    ],
    volume: [
      'Soft dan subtle',
      'Balanced dan harmonis',
      'Dynamic dengan variasi',
      'Powerful dan impactful',
      'Ambient dan atmospheric',
      'Crisp dan clear',
      'Warm dan rich'
    ],
    videoQuality: [
      '8K Ultra HD yang sangat tajam',
      '4K HDR yang detail',
      '1080p dengan stabilisasi',
      'Cinematic 24fps yang smooth',
      'High frame rate untuk slow motion',
      '4K 60fps yang fluid',
      'HDR10+ yang vibrant'
    ]
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return suggestions[fieldType] || [];
}