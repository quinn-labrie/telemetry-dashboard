import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TelemetryPoint, MetricType } from "../types";
import { format } from "date-fns";

interface MetricChartProps {
  data: TelemetryPoint[];
  metric: MetricType;
}

const MetricChart: React.FC<MetricChartProps> = ({ data, metric }) => {
  const chartData = data.map((point) => ({
    timestamp: format(new Date(point.timestamp), "HH:mm:ss"),
    value: point[metric],
  }));

  const metricConfig = {
    voltage: { unit: "V", color: "#8884d8" },
    frequency: { unit: "Hz", color: "#82ca9d" },
    current: { unit: "A", color: "#ffc658" },
    power: { unit: "W", color: "#ff8042" },
  };

  return (
    <div className="h-80 w-full">
      <h3 className="text-lg font-medium mb-2 capitalize">
        {metric} ({metricConfig[metric].unit})
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip
            formatter={(value) => [
              `${value} ${metricConfig[metric].unit}`,
              metric,
            ]}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={metricConfig[metric].color}
            dot={false}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricChart;
