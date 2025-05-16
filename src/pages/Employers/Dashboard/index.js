import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, List, Avatar, Tag } from 'antd';
import {
  FileTextOutlined,
  UserOutlined,
  StarOutlined,
  ScheduleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { getCookie } from '../../../helpers/cookie';
import { getDashboard } from '../../../sevices/employer/dashboard.sevice';

function Dashboard() {
  const [dataDashboard, setDataDashboard] = useState({});
  const tokenCompany = getCookie("tokenCompany");

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDashboard(tokenCompany);
      if (response.code === 200) {
        setDataDashboard(response);
      }
    };
    fetchApi();
  }, [tokenCompany]);

  const statusColor = {
    pending: 'orange',
    reviewed: 'blue',
    accepted: 'green',
    rejected: 'red',
    cancelled: 'gray',
    interviewing: 'purple',
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          <Card title="Tin tuyển dụng đã đăng" bordered={false}>
            <Statistic
              title="Số lượng"
              value={dataDashboard.totalJobs || 0}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card title="Hồ sơ ứng tuyển" bordered={false}>
            <Statistic
              title="Số lượng"
              value={dataDashboard.totalApplications || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card title="Ứng viên tiềm năng" bordered={false}>
            <Statistic
              title="Số lượng"
              value={dataDashboard.totalPotentialCandidates || 0}
              prefix={<StarOutlined />}
              valueStyle={{ color: '#d48806' }}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card title="Lịch phỏng vấn" bordered={false}>
            <Statistic
              title="Số lượng"
              value={dataDashboard.totalInterviewed || 0}
              prefix={<ScheduleOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={24}>
          <Card title="Thống kê theo trạng thái hồ sơ" bordered={false}>
            <Row gutter={[16, 16]}>
              {dataDashboard.statusCount &&
                Object.entries(dataDashboard.statusCount).map(([status, count]) => (
                  <Col span={4} key={status}>
                    <Card>
                      <Statistic
                        title={<Tag color={statusColor[status]}>{status}</Tag>}
                        value={count}
                        valueStyle={{ color: statusColor[status] }}
                        prefix={<CheckCircleOutlined />}
                      />
                    </Card>
                  </Col>
                ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
