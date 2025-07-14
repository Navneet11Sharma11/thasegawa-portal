import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spin, Select } from 'antd';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const { Option } = Select;

const apps = [
    { key: 'OrderEntry', label: 'Order Entry App' },
    { key: 'Planning', label: 'MRP Planning App' },
    { key: 'Complaint', label: 'Complaint App' },
    { key: 'Notes', label: 'Notes App' },
];

const colors: Record<string, string> = {
    OrderEntry: '#1677FF',
    Planning: '#52c41a',
    Complaint: '#fa541c',
    Notes: '#722ed1',
};

const Monitoring: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedApps, setSelectedApps] = useState<string[]>(apps.map(a => a.key)); // all selected by default

    useEffect(() => {
        const interval = setInterval(() => {
            const newPoint: Record<string, any> = { time: new Date().toLocaleTimeString() };

            apps.forEach(app => {
                newPoint[app.key] = Math.floor(Math.random() * 100);
            });

            setData(prev => [...prev.slice(-9), newPoint]);
            setLoading(false);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Card>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col>
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Select applications to monitor"
                        style={{ minWidth: 300 }}
                        value={selectedApps}
                        onChange={setSelectedApps}
                    >
                        {apps.map(app => (
                            <Option key={app.key} value={app.key}>
                                {app.label}
                            </Option>
                        ))}
                    </Select>
                </Col>
            </Row>

            {loading ? (
                <Spin />
            ) : (
                <Row>
                    <Col span={24}>
                        <Card title="Live Metrics">
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    {selectedApps.length === 0
                                        ? null
                                        : selectedApps.map(appKey => (
                                            <Line
                                                key={appKey}
                                                type="monotone"
                                                dataKey={appKey}
                                                stroke={colors[appKey]}
                                                dot={false}
                                                isAnimationActive={false}
                                            />
                                        ))}
                                </LineChart>
                            </ResponsiveContainer>
                        </Card>
                    </Col>
                </Row>
            )}
        </Card>
    );

};

export default Monitoring;
