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
  miniChart?: boolean;
}

const MetricChart: React.FC<MetricChartProps> = ({
  data,
  metric,
  miniChart = false,
}) => {
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
    <div
      className={`w-full ${miniChart ? "h-full" : "h-[300px]"} flex flex-col`}
    >
      <h3 className="text-lg font-medium mb-2 capitalize">
        {metric} ({metricConfig[metric].unit})
      </h3>
      <div className="flex-grow relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tick={{ fontSize: miniChart ? 10 : 12 }}
              height={30}
            />
            <YAxis tick={{ fontSize: miniChart ? 10 : 12 }} width={40} />
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
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetricChart;
