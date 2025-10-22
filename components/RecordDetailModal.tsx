
import React from 'react';
import { GoogleGenAI } from "@google/genai";
import { MedicalRecord } from '../types';
import DashboardCard from './DashboardCard';
import { SparklesIcon } from '../constants';

interface RecordDetailModalProps {
  record: MedicalRecord;
  onClose: () => void;
}

const RecordDetailModal: React.FC<RecordDetailModalProps> = ({ record, onClose }) => {
  const [summary, setSummary] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSummarize = async () => {
    setIsLoading(true);
    setError('');
    setSummary('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Summarize the following medical record for a patient. Use simple, clear language and avoid technical jargon. Focus on the key findings and what they mean for the patient's health.\n\n---\n\nRECORD CONTENT:\n${record.content}`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setSummary(response.text);
    } catch (e) {
      console.error(e);
      setError('Failed to generate summary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="record-modal-title"
    >
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <DashboardCard title={record.title} titleId="record-modal-title" className="relative">
          <button 
            onClick={onClose} 
            aria-label="Close" 
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="grid grid-cols-3 gap-x-4 mb-6 text-sm">
            <div><strong className="text-gray-400">Date:</strong> {record.date}</div>
            <div><strong className="text-gray-400">Type:</strong> {record.type}</div>
            <div><strong className="text-gray-400">Provider:</strong> {record.doctor}</div>
          </div>

          <div className="space-y-6">
            {/* Record Content */}
            <div>
              <h4 className="font-semibold text-lg text-gray-300 mb-2 border-b border-gray-700 pb-1">Record Content</h4>
              <pre className="bg-gray-900/50 p-4 rounded-lg text-gray-400 text-sm whitespace-pre-wrap font-sans max-h-60 overflow-y-auto">{record.content.trim()}</pre>
            </div>

            {/* AI Summary Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-lg text-gray-300">AI-Powered Summary</h4>
                <button 
                  onClick={handleSummarize} 
                  disabled={isLoading}
                  className="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SparklesIcon className="h-5 w-5 mr-2" />
                  {isLoading ? 'Summarizing...' : 'Summarize with AI'}
                </button>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-lg min-h-[100px] text-gray-300">
                {isLoading && <p className="text-center text-gray-500">Generating summary...</p>}
                {error && <p className="text-center text-rose-400">{error}</p>}
                {summary && <p className="whitespace-pre-wrap">{summary}</p>}
                {!isLoading && !error && !summary && <p className="text-center text-gray-500">Click the button to generate a summary of this record.</p>}
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default RecordDetailModal;