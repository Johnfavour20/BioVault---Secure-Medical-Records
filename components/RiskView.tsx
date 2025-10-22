import React from 'react';
import { AuditLogEntry } from '../types';

interface AuditLogTableProps {
  logs: AuditLogEntry[];
}

const actionColorMap = {
    'ACCESS_GRANTED': 'text-green-400',
    'RECORD_VIEWED': 'text-blue-400',
    'EMERGENCY_ACCESS': 'text-red-400 font-bold',
    'ACCESS_DENIED': 'text-yellow-400',
    'RECORD_UPLOADED': 'text-gray-400',
    'ACCESS_REVOKED': 'text-rose-400',
};

const AuditLogTable: React.FC<AuditLogTableProps> = ({ logs }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-cyan-300 uppercase bg-gray-900/50">
          <tr>
            <th scope="col" className="px-4 py-3">Timestamp</th>
            <th scope="col" className="px-4 py-3">Accessor</th>
            <th scope="col" className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {[...logs].reverse().map((log) => (
            <tr key={log.id} className={`border-b border-gray-700 ${log.isCritical ? 'bg-red-900/30' : 'hover:bg-gray-800/50'}`}>
              <td className="px-4 py-3 whitespace-nowrap text-gray-400">{log.timestamp}</td>
              <td className="px-4 py-3 font-medium">{log.accessor}</td>
              <td className={`px-4 py-3 font-semibold ${actionColorMap[log.action]}`}>
                {log.action.replace('_', ' ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLogTable;