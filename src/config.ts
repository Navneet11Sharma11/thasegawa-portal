export interface Subsite {
  key: string;
  name: string;
  path: string;
  description: string;
}

interface AppConfig {
  appName: string;
  baseUrl: string;
  subsites: Subsite[];
  microservices: Subsite[];
}

const config: AppConfig = {
  appName: 'ThasegawaPortal',
  baseUrl: 'https://portal.thasegawausa.com',
  subsites: [
    { key: 'OrderEntry', name: 'Order Entry App', path: 'https://th-ion-web1.thusa.thasegawa.com/login', description: 'Order Entry' },
    { key: 'Planning', name: 'MRP Planning App', path: 'https://th-ion-web1.thusa.thasegawa.com:8443', description: 'Planning System' },
    { key: 'Complaint', name: 'Complaint App', path: 'https://th-ion-web1.thusa.thasegawa.com:4432', description: 'Complaint System' },
    { key: 'Notes', name: 'Notes App', path: 'https://th-ion-web1.thusa.thasegawa.com:9443', description: 'Notes' },
  ],
  microservices: [
    { key: 'OrderEntry', name: 'Chimera Service', path: 'https://th-ion-web1.thusa.thasegawa.com/login', description: 'Order Entry' },
    { key: 'Planning', name: 'Planning Service', path: 'https://th-ion-web1.thusa.thasegawa.com:8443', description: 'MRP Planning System' },
    { key: 'Complaint', name: 'Complaint Service', path: 'https://th-ion-web1.thusa.thasegawa.com:4432', description: 'Complaint System' },
    { key: 'Notes', name: 'Notes Service', path: 'https://th-ion-web1.thusa.thasegawa.com:9443', description: 'Notes' },
  ],
};

export default config;
