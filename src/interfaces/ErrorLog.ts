export interface ErrorLog {
  id: string;
  appKey: string;
  timestamp: string;
  message: string;
  level: 'error' | 'warn' | 'fatal';
}