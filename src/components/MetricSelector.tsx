import React from 'react';
import { MetricType } from '../types';

interface MetricSelectorProps {
  metrics: { id: MetricType; label: string }[];
  selectedMetric: MetricType;
  onMetricChange: (metric: MetricType) => void;
}

const MetricSelector: React.FC<MetricSelectorProps> = ({
  metrics,
  selectedMetric,
  onMetricChange,
}) => {
  return (
    <div className="flex space-x-2 mb-4">
      <span className="font-medium">Metric:</span>
      <div className="flex space-x-2">
        {metrics.map((metric) => (
          <button
            key={metric.id}
            className={`px-3 py-1 rounded ${
              selectedMetric === metric.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => onMetricChange(metric.id)}
          >
            {metric.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MetricSelector;
