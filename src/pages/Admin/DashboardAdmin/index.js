import React, { useEffect, useState } from "react";
import { Layout, Card, Row, Col, Statistic, Spin } from "antd";
import { Dashboard } from "../../../sevices/admin/dashboard.sevies";
import { getCookie } from "../../../helpers/cookie";
const { Content } = Layout;

const DashboardAdmin = () => {
  const [stats, setStats] = useState(null);
    const tokenAdmin = getCookie("tokenAdmin")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Dashboard(tokenAdmin);
        if (res.success) {
          setStats(res.data);
        } else {
          console.error("Không lấy được dữ liệu thống kê");
        }
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu dashboard:", err);
      }
    };

    fetchData();
  }, [tokenAdmin]);

  if (!stats) return <Spin style={{ marginTop: 50 }} tip="Đang tải dữ liệu..." />;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: "#fff",
          borderRadius: "10px",
        }}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Card>
              <Statistic title="Số ứng viên" value={stats.totalCandidates} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Số công ty" value={stats.totalCompanies} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Số lượt ứng tuyển" value={stats.totalApplications} />
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={8}>
            <Card title="Ứng tuyển đang chờ" bordered={false}>
              {stats.pendingApplications} lượt ứng tuyển đang chờ xét duyệt.
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Ứng tuyển đã chấp nhận" bordered={false}>
              {stats.acceptedApplications} lượt ứng tuyển đã được chấp nhận.
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Ứng tuyển bị từ chối" bordered={false}>
              {stats.rejectedApplications} lượt ứng tuyển đã bị từ chối.
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default DashboardAdmin;
