import { Card, Col, Row, Typography } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import config from '../config';

const { Title } = Typography;

const Home = () => {
  return (
    <div>
      <Title level={2}>Welcome to {config.appName}</Title>
      <Row gutter={[16, 16]}>
        {config.subsites.map((site) => (
          <Col key={site.key} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={site.name}
              bordered
              hoverable
              extra={<ExportOutlined />}
              onClick={() => window.open(site.path, '_blank')}
              style={{ cursor: 'pointer', height: '100%' }}
            >
              <p>{site.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
