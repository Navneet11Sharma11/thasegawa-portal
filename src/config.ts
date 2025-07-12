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


export default config;
