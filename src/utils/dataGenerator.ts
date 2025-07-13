import { TelemetryPoint, MetricType } from "../types";

const BASELINES = {
  voltage: 120, // volts
  frequency: 60, // Hz
  current: 5, // amps
  power: 600, // watts
};

const VARIANCE = {
  voltage: 0.05,
  frequency: 0.01,
  current: 0.1,
  power: 0.15,
};

export const generateDataPoint = (timestamp: Date): TelemetryPoint => {
  return {
    timestamp,
    voltage: generateMetricValue("voltage"),
    frequency: generateMetricValue("frequency"),
    current: generateMetricValue("current"),
    power: generateMetricValue("power"),
  };
};

const generateMetricValue = (metric: MetricType): number => {
  const baseline = BASELINES[metric];
  const variance = VARIANCE[metric];
  const randomFactor = 1 + (Math.random() * 2 - 1) * variance;
  return parseFloat((baseline * randomFactor).toFixed(2));
};

export const generateTimeSeriesData = (
  startTime: Date,
  endTime: Date,
  intervalSeconds = 60
): TelemetryPoint[] => {
  const data: TelemetryPoint[] = [];
  const intervalMs = intervalSeconds * 1000;

  for (
    let timestamp = new Date(startTime);
    timestamp <= endTime;
    timestamp = new Date(timestamp.getTime() + intervalMs)
  ) {
    data.push(generateDataPoint(new Date(timestamp)));
  }

  return data;
};

export const generateRecentData = (
  minutesBack: number,
  intervalSeconds = 60
): TelemetryPoint[] => {
  const now = new Date();
  const startTime = new Date(now.getTime() - minutesBack * 60 * 1000);
  return generateTimeSeriesData(startTime, now, intervalSeconds);
};
