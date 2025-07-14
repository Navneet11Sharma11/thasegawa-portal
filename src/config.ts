import { ErrorLog } from "./interfaces/ErrorLog";

export type StatusType = 'active' | 'in-progress' | 'deprecated' | 'coming-soon';

export const getStatusColor = (status: StatusType): string => {
  switch (status) {
    case 'active':
      return '#52c41a'; // green
    case 'in-progress':
      return '#faad14'; // orange
    case 'deprecated':
      return '#f5222d'; // red
    case 'coming-soon':
      return '#1890ff'; // blue
    default:
      return '#d9d9d9'; // gray
  }
};

export const HEADER_COLORS = {
  '#bc204b': 'Production Environment',
  '#1677ff': 'Test Environment',
};

export const formatStatus = (status: StatusType): string => {
  return (
    {
      'active': 'Active',
      'in-progress': 'In Progress',
      'deprecated': 'Deprecated',
      'coming-soon': 'Coming Soon',
    }[status] || 'Unknown'
  );
};

export interface Subsite {
  key: string;
  name: string;
  path: string;
  description: string;
  lastUpdated?: string;
  status: StatusType;
}

interface AppConfig {
  appName: string;
  baseUrl: string;
  subsites: {
    apps: Subsite[];
    microservices: Subsite[];
  };
}

const config: AppConfig = {
  appName: 'ThasegawaPortal',
  baseUrl: 'https://portal.thasegawausa.com',
  subsites: {
    apps: [
      {
        key: 'OrderEntry',
        name: 'Order Entry App',
        path: 'https://th-ion-web1.thusa.thasegawa.com/login',
        description: 'Order Entry',
        lastUpdated: '2025-07-10',
        status: 'active',
      },
      {
        key: 'Planning',
        name: 'MRP Planning App',
        path: 'https://th-ion-web1.thusa.thasegawa.com:8443',
        description: 'Planning System',
        lastUpdated: '2025-07-05',
        status: 'in-progress',
      },
      {
        key: 'Complaint',
        name: 'Complaint App',
        path: 'https://th-ion-web1.thusa.thasegawa.com:4432',
        description: 'Complaint System',
        lastUpdated: '2025-06-28',
        status: 'deprecated',
      },
      {
        key: 'Notes',
        name: 'Notes App',
        path: 'https://th-ion-web1.thusa.thasegawa.com:9443',
        description: 'Notes',
        lastUpdated: '2025-07-01',
        status: 'coming-soon',
      },
    ],
    microservices: [
      {
        key: 'OrderEntry',
        name: 'Chimera Service',
        path: 'https://th-ion-web1.thusa.thasegawa.com/login',
        description: 'Order Entry Microservice',
        lastUpdated: '2025-07-10',
        status: 'active',
      },
      {
        key: 'Planning',
        name: 'Planning Service',
        path: 'https://th-ion-web1.thusa.thasegawa.com:8443',
        description: 'MRP Planning Microservice',
        lastUpdated: '2025-07-13',
        status: 'in-progress',
      },
      {
        key: 'Complaint',
        name: 'Complaint Service',
        path: 'https://th-ion-web1.thusa.thasegawa.com:4432',
        description: 'Complaint Microservice',
        lastUpdated: '2025-07-17',
        status: 'active',
      },
      {
        key: 'Notes',
        name: 'Notes Service',
        path: 'https://th-ion-web1.thusa.thasegawa.com:9443',
        description: 'Notes Microservice',
        lastUpdated: '2025-07-27',
        status: 'coming-soon',
      },
    ],
  },
};

export const AppOptions = [
  { key: 'OrderEntry', label: 'Order Entry App' },
  { key: 'Planning', label: 'MRP Planning App' },
  { key: 'Complaint', label: 'Complaint App' },
  { key: 'Notes', label: 'Notes App' },
];

export const DummyLogs: ErrorLog[] = [
  { id: '1', appKey: 'OrderEntry', timestamp: '2025-07-14T08:10:00Z', message: 'Database connection error', level: 'error' },
  { id: '2', appKey: 'Planning', timestamp: '2025-07-14T09:15:00Z', message: 'API timeout', level: 'warn' },
  { id: '3', appKey: 'Complaint', timestamp: '2025-07-13T14:50:00Z', message: 'Unhandled exception in service', level: 'fatal' },
  { id: '4', appKey: 'Notes', timestamp: '2025-07-13T11:30:00Z', message: 'Invalid authentication token', level: 'error' },
  { id: '5', appKey: 'OrderEntry', timestamp: '2025-07-12T16:25:00Z', message: 'Timeout waiting for response', level: 'warn' },
  { id: '6', appKey: 'Planning', timestamp: '2025-07-11T10:00:00Z', message: 'Service unreachable', level: 'error' },
  { id: '7', appKey: 'Complaint', timestamp: '2025-07-10T09:00:00Z', message: 'Failed database query', level: 'fatal' },
  { id: '8', appKey: 'Notes', timestamp: '2025-07-09T14:20:00Z', message: 'Session expired', level: 'warn' },
  { id: '9', appKey: 'OrderEntry', timestamp: '2025-07-08T17:30:00Z', message: 'Missing required field', level: 'error' },
  { id: '10', appKey: 'Planning', timestamp: '2025-07-07T08:45:00Z', message: 'Resource limit exceeded', level: 'fatal' },
  { id: '11', appKey: 'Complaint', timestamp: '2025-07-06T11:00:00Z', message: 'Null reference exception', level: 'error' },
  { id: '12', appKey: 'Notes', timestamp: '2025-07-05T15:10:00Z', message: 'Invalid input format', level: 'warn' },
  // Add more data as needed for testing
];

export default config;
