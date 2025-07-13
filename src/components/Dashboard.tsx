"use client";

import React, { useState, useEffect } from "react";
import MetricChart from "./MetricChart";
import TimeRangeSelector from "./TimeRangeSelector";
import MetricSelector from "./MetricSelector";
import { TelemetryPoint, MetricType } from "../types";
import { generateRecentData } from "../utils/dataGenerator";

const timeRangeOptions = [
  { label: "5m", minutes: 5 },
  { label: "15m", minutes: 15 },
  { label: "30m", minutes: 30 },
  { label: "1h", minutes: 60 },
];

const metricOptions = [
  { id: "voltage" as MetricType, label: "Voltage" },
  { id: "frequency" as MetricType, label: "Frequency" },
  { id: "current" as MetricType, label: "Current" },
  { id: "power" as MetricType, label: "Power" },
];

const Dashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(5);
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("voltage");
  const [data, setData] = useState<TelemetryPoint[]>([]);
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const refreshData = () => {
    const newData = generateRecentData(selectedTimeRange, 10);
    setData(newData);
  };

  useEffect(() => {
    refreshData();

    if (refreshInterval) {
      clearInterval(refreshInterval);
    }

    const interval = setInterval(refreshData, 5000);
    setRefreshInterval(interval);

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [selectedTimeRange]);

  const handleTimeRangeChange = (minutes: number) => {
    setSelectedTimeRange(minutes);
  };

  const handleMetricChange = (metric: MetricType) => {
    setSelectedMetric(metric);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Grid Telemetry Dashboard</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-wrap justify-between mb-6">
          <TimeRangeSelector
            timeRanges={timeRangeOptions}
            selectedRange={selectedTimeRange}
            onRangeChange={handleTimeRangeChange}
          />
          <MetricSelector
            metrics={metricOptions}
            selectedMetric={selectedMetric}
            onMetricChange={handleMetricChange}
          />
        </div>

        <div className="mb-8">
          <MetricChart data={data} metric={selectedMetric} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metricOptions
            .filter((metric) => metric.id !== selectedMetric)
            .map((metric) => (
              <div key={metric.id} className="h-[200px]">
                <MetricChart data={data} metric={metric.id} miniChart={true} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
