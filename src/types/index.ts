export type MetricType = 'voltage' | 'frequency' | 'current' | 'power';

export interface TelemetryPoint {
  timestamp: Date;
  voltage: number;
  frequency: number;
  current: number;
  power: number;
}

export interface TimeRange {
  start: Date;
  end: Date;
}