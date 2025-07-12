import React from 'react';
import { Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

const Metrics = () => {
  return (
    <div style={{ marginTop: 0, paddingTop: 0 }}>
      <Paragraph>Overview of application performance and usage.</Paragraph>

      <Card title="CPU Usage" style={{ marginBottom: 16 }}>
        <p>Data will be displayed here (e.g., 57%).</p>
      </Card>

      <Card title="Memory Usage">
        <p>Data will be displayed here (e.g., 68%).</p>
      </Card>
    </div>
  );
};

export default Metrics;
