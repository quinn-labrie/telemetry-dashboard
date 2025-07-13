import React from 'react';

interface TimeRangeSelectorProps {
  timeRanges: { label: string; minutes: number }[];
  selectedRange: number;
  onRangeChange: (minutes: number) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  timeRanges,
  selectedRange,
  onRangeChange,
}) => {
  return (
    <div className="flex space-x-2 mb-4">
      <span className="font-medium">Time Range:</span>
      <div className="flex space-x-2">
        {timeRanges.map((range) => (
          <button
            key={range.minutes}
            className={`px-3 py-1 rounded ${
              selectedRange === range.minutes
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => onRangeChange(range.minutes)}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeRangeSelector;
