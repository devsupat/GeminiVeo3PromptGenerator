import React from 'react';
import { ExternalLink, Youtube, Smartphone } from 'lucide-react';

const BrandSection: React.FC = () => {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white rounded-xl p-6 shadow-xl transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          
          {/* Sponsored Badge - Moved up slightly */}
          <div className="absolute top-2 left-4 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/20">
            Di Sponsori oleh ShabiraScene
          </div>

          <div className="relative z-10 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              {/* Logo and Title Section */}
              <div className="flex items-center space-x-4 group">
                <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:bg-white/20 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    SC
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">
                    ShabiraScene
                  </h3>
                  <p className="text-sm text-blue-100 group-hover:text-white transition-colors duration-300">
                    Kreasikan kreatifitas anda
                  </p>
                </div>
              </div>

              {/* Features Section */}
              <div className="flex flex-wrap gap-4 justify-center">
                <a 
                  href="https://www.youtube.com/@SceneCrafter-w8t" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-300"
                >
                  <Youtube className="w-5 h-5 text-white" />
                  <span className="text-sm">My YouTube Channel</span>
                </a>
                <a 
                  href="https://www.tiktok.com/@hematzone" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.43z"/>
                  </svg>
                  <span className="text-sm">TikTok</span>
                </a>
                <a 
                  href="https://apps.apple.com/to/developer/hermizariafis/id1662246465" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-300"
                >
                  <Smartphone className="w-5 h-5 text-white" />
                  <span className="text-sm">My Play Store Page</span>
                </a>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col items-center space-y-3">
                <a 
                  href="https://lynk.id/oghiezr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  MyLYNKID
                </a>
                <p className="text-xs text-blue-100 text-center">
                  Dukung konten kreator Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandSection;