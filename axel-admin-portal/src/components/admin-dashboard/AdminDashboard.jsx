import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Header from './header/Header'; // Import Header component
import AdminSideBar from './sidebar/AdminSideBar'; // Import Sidebar component
import styles from './AdminDashboard.module.css'; // Assuming your CSS file for styling

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const AdminDashboard = () => {
  const [pipelineData, setPipelineData] = useState([]);
  const [revenueBreakdown, setRevenueBreakdown] = useState([]);
  const [customerSatisfaction, setCustomerSatisfaction] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch Pipeline Performance Data
  const fetchPipelinePerformance = async () => {
    try {
      const response = await fetch('http://localhost:8080/pipeline_performance/');
      const data = await response.json();
      setPipelineData(data);
    } catch (error) {
      console.error('Error fetching pipeline performance data:', error);
    }
  };

  // Fetch Revenue Breakdown Data
  const fetchRevenueBreakdown = async () => {
    try {
      const response = await fetch('http://localhost:8080/revenue_breakdown/');
      const data = await response.json();
      setRevenueBreakdown(data);
    } catch (error) {
      console.error('Error fetching revenue breakdown data:', error);
    }
  };

  // Fetch Customer Satisfaction Data
  const fetchCustomerSatisfaction = async () => {
    try {
      const response = await fetch('http://localhost:8080/customer_satisfaction/');
      const data = await response.json();
      if (data.length > 0) {
        const averageRating = data.reduce((sum, entry) => sum + entry.satisfaction_rating, 0) / data.length;
        setCustomerSatisfaction({ averageRating });
      }
    } catch (error) {
      console.error('Error fetching customer satisfaction data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchPipelinePerformance(), fetchRevenueBreakdown(), fetchCustomerSatisfaction()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  return (
    <div className={styles.dashboard}>
      {/* Add Header */}
      <Header pageTitle="Admin Dashboard" />
      
      {/* Add Sidebar */}
      <AdminSideBar />
      
      <main className={styles.mainContent}>
        <Typography variant="h4" gutterBottom className={styles.pageTitle}>
          Gas Authority of India - Admin Dashboard
        </Typography>
        
        <Grid container spacing={3}>
          {/* Summary Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <Card style={{ backgroundColor: '#333', color: '#fff' }}>
              <CardContent>
                <Typography variant="h6">Active Pipelines</Typography>
                <Typography variant="h4">{pipelineData.length ? pipelineData[pipelineData.length - 1].active_pipelines : 'N/A'}</Typography>
                <Typography>+{pipelineData.length > 1 ? pipelineData[pipelineData.length - 1].active_pipelines - pipelineData[pipelineData.length - 2].active_pipelines : 0} from last month</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Daily Gas Production</Typography>
                <Typography variant="h4">{pipelineData.length ? pipelineData[pipelineData.length - 1].gas_production : 'N/A'} MMSCMD</Typography>
                <Typography>+3 MMSCMD</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Daily Gas Consumption</Typography>
                <Typography variant="h4">{pipelineData.length ? pipelineData[pipelineData.length - 1].gas_consumption : 'N/A'} MMSCMD</Typography>
                <Typography>+2 MMSCMD</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Customer Satisfaction</Typography>
                <Typography variant="h4">{customerSatisfaction.averageRating ? customerSatisfaction.averageRating.toFixed(1) : 'N/A'} / 5</Typography>
                <Typography>+0.2 improvement</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pipeline Performance</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={pipelineData}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="active_pipelines" stroke="#8884d8" name="Active Pipelines" />
                    <Line type="monotone" dataKey="gas_production" stroke="#82ca9d" name="Gas Production (MMSCMD)" />
                    <Line type="monotone" dataKey="gas_consumption" stroke="#ffc658" name="Gas Consumption (MMSCMD)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Revenue Breakdown</Typography>
                <ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={revenueBreakdown}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={100}
      fill="#8884d8"
      label={({ name, value }) => `${name}: $${value}`}
    >
      {revenueBreakdown.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
  </PieChart>
</ResponsiveContainer>

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default AdminDashboard;
