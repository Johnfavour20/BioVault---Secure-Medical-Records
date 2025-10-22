
import React from 'react';

interface DashboardCardProps {
  title: string;
  titleId?: string;
  className?: string;
  children: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, titleId, className, children }) => {
  return (
    <div className={`bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg p-6 ${className}`}>
      <h3 id={titleId} className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300 mb-4">{title}</h3>
      <div className="text-gray-300">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;