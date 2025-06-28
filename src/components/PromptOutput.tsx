import React, { useState } from 'react';
import { Copy, Check, Sparkles, Download } from 'lucide-react';
import Button from './Button';

interface PromptOutputProps {
  prompts: {
    indonesian: string;
    english: string;
  } | null;
  isGenerating: boolean;
  onGenerate: () => void;
}

const PromptOutput: React.FC<PromptOutputProps> = ({ prompts, isGenerating, onGenerate }) => {
  const [copiedStates, setCopiedStates] = useState<{
    indonesian: boolean;
    english: boolean;
  }>({
    indonesian: false,
    english: false
  });

  const copyToClipboard = async (text: string, language: 'indonesian' | 'english') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [language]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [language]: false }));
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const downloadPrompt = (text: string, language: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `veo3-prompt-${language}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white">
          <Sparkles className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Generated Prompts</h3>
      </div>

      {isGenerating ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Generating your perfect prompt...</span>
        </div>
      ) : prompts ? (
        <div className="space-y-6">
          {/* Indonesian Prompt */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">ID</span>
                Indonesian Prompt
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(prompts.indonesian, 'indonesian')}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedStates.indonesian ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => downloadPrompt(prompts.indonesian, 'indonesian')}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="Download as file"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-h-64 overflow-y-auto">
              <p className="text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">
                {prompts.indonesian}
              </p>
            </div>
          </div>

          {/* English Prompt */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-bold">EN</span>
                English Prompt
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(prompts.english, 'english')}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedStates.english ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => downloadPrompt(prompts.english, 'english')}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="Download as file"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-h-64 overflow-y-auto">
              <p className="text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">
                {prompts.english}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Perfect for use with Runway, Pika Labs, Luma AI, and other video generation tools
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-6">
            Fill out the form to generate your AI video prompt
          </p>
          <Button onClick={onGenerate} className="w-full">
            Generate Prompt
          </Button>
        </div>
      )}
    </div>
  );
};

export default PromptOutput;