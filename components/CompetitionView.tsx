
import React from 'react';
import { MedicalRecord } from '../types';
import { FileIcon } from '../constants';

interface FileCardProps {
  record: MedicalRecord;
  onClick: () => void;
}

const typeColorMap = {
  'Lab Report': 'bg-blue-500/20 text-blue-300',
  'Imaging': 'bg-purple-500/20 text-purple-300',
  'Prescription': 'bg-green-500/20 text-green-300',
  'Consultation Note': 'bg-yellow-500/20 text-yellow-300',
};

const FileCard: React.FC<FileCardProps> = ({ record, onClick }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Trigger onClick for Enter or Space key presses
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div 
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`View record: ${record.title}`}
        className="bg-gray-800/60 p-4 rounded-lg border border-gray-700 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors duration-200 flex items-start space-x-4 cursor-pointer">
      <div className="text-cyan-400 mt-1">
        <FileIcon className="w-8 h-8" />
      </div>
      <div>
        <h4 className="font-bold text-gray-200">{record.title}</h4>
        <p className="text-sm text-gray-400">From: {record.doctor}</p>
        <p className="text-xs text-gray-500">Date: {record.date}</p>
        <div className="mt-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColorMap[record.type]}`}>{record.type}</span>
        </div>
      </div>
    </div>
  );
};

export default FileCard;