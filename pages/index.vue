<!-- 
   <template>
    <div class="demo-container">
      <h1>Sales Dashboard</h1>
      
      <div class="charts-container">
        <div class="chart-section">
          <h2>Sales by Category</h2>
          <div class="chart-container">
            <client-only>
              <v-chart class="chart" :option="pieChartOption" autoresize />
            </client-only>
          </div>
        </div>
  
        <div class="chart-section">
          <h2>Monthly Sales Trend</h2>
          <div class="chart-container">
            <client-only>
              <v-chart class="chart" :option="lineChartOption" autoresize />
            </client-only>
          </div>
        </div>
  
        <div class="chart-section">
          <h2>Quarterly Comparison</h2>
          <div class="chart-container">
            <client-only>
              <v-chart class="chart" :option="barChartOption" autoresize />
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { BarChart, PieChart, LineChart } from 'echarts/charts';
  import {
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent
  } from 'echarts/components';
  import VChart from 'vue-echarts';
  
  // Configure ECharts
  use([
    CanvasRenderer,
    BarChart,
    PieChart,
    LineChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent
  ]);
  
  // Sample data
  const initialData = [
    { id: 1, product: 'Laptop', category: 'Electronics', sales: 120, revenue: 84000, region: 'North' },
    { id: 2, product: 'Smartphone', category: 'Electronics', sales: 200, revenue: 100000, region: 'North' },
    { id: 3, product: 'PS5', category: 'Electronics', sales: 85, revenue: 42500, region: 'South' },
    { id: 4, product: 'Headphones', category: 'Electronics', sales: 150, revenue: 30000, region: 'East' },
    { id: 5, product: '4K TV', category: 'Electronics', sales: 75, revenue: 112500, region: 'East' },
    { id: 6, product: 'Desk Chair', category: 'Furniture', sales: 85, revenue: 21250, region: 'South' },
    { id: 7, product: 'Coffee Table', category: 'Furniture', sales: 45, revenue: 13500, region: 'South' },
    { id: 8, product: 'Sofa', category: 'Furniture', sales: 30, revenue: 45000, region: 'West' },
    { id: 9, product: 'Bed Frame', category: 'Furniture', sales: 25, revenue: 37500, region: 'West' },
    { id: 10, product: 'Bookshelf', category: 'Furniture', sales: 60, revenue: 18000, region: 'North' }
  ];
  
  // Monthly sales data for the line chart
  const monthlySalesData = {
    'Laptop': [45, 60, 70, 80, 90, 100, 110, 120],
    'Smartphone': [80, 100, 130, 150, 170, 190, 200, 200],
    'PS5': [20, 30, 40, 50, 60, 70, 80, 85],
    'Headphones': [50, 70, 90, 110, 130, 140, 150, 150],
    '4K TV': [15, 25, 35, 45, 55, 65, 70, 75],
    'Desk Chair': [30, 45, 55, 65, 75, 80, 85, 85],
    'Coffee Table': [10, 15, 25, 30, 35, 40, 45, 45],
    'Sofa': [5, 10, 15, 20, 25, 28, 30, 30],
    'Bed Frame': [5, 8, 12, 16, 20, 23, 25, 25],
    'Bookshelf': [15, 25, 35, 45, 50, 55, 60, 60]
  };
  
  // Quarterly data for bar chart (first 3 months)
  const quarterlyData = {
    'Laptop': [45, 60, 70],
    'Smartphone': [80, 100, 130],
    'PS5': [20, 30, 40],
    'Headphones': [50, 70, 90],
    '4K TV': [15, 25, 35],
    'Desk Chair': [30, 45, 55],
    'Coffee Table': [10, 15, 25],
    'Sofa': [5, 10, 15],
    'Bed Frame': [5, 8, 12],
    'Bookshelf': [15, 25, 35]
  };
  
  // Pie Chart configuration
  const pieChartOption = ref({
    title: {
      text: 'Sales by Category',
      left: 'center'
    },
    tooltip: { trigger: 'item' },
    legend: { orient: 'vertical', left: 'left' },
    series: [{
      type: 'pie',
      radius: '50%',
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  });
  
  // Line Chart configuration
  const lineChartOption = ref({
    title: {
      text: 'Monthly Sales Trend',
      left: 'center'
    },
    tooltip: { trigger: 'axis' },
    legend: { 
      data: [],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8']
    },
    yAxis: {
      type: 'value'
    },
    series: []
  });
  
  // Bar Chart configuration
  const barChartOption = ref({
    title: {
      text: 'Quarterly Comparison',
      left: 'center'
    },
    tooltip: { trigger: 'axis' },
    legend: { 
      data: [],
      bottom: 0
    },
    xAxis: {
      type: 'category',
      data: ['January', 'February', 'March']
    },
    yAxis: {
      type: 'value'
    },
    series: []
  });
  
  // Initialize charts
  onMounted(() => {
    // Pie Chart Data
    const categoryMap = new Map();
    initialData.forEach(item => {
      categoryMap.set(item.category, (categoryMap.get(item.category) || 0) + item.sales);
    });
    pieChartOption.value.series[0].data = Array.from(categoryMap.entries()).map(([name, value]) => ({
      name,
      value
    }));
  
    // Line Chart Data
    const productNames = Object.keys(monthlySalesData);
    lineChartOption.value.legend.data = productNames;
    lineChartOption.value.series = productNames.map(product => ({
      name: product,
      type: 'line',
      data: monthlySalesData[product],
      smooth: true
    }));
  
    // Bar Chart Data
    const quarterlyProducts = Object.keys(quarterlyData);
    barChartOption.value.legend.data = quarterlyProducts;
    barChartOption.value.series = quarterlyProducts.map(product => ({
      name: product,
      type: 'bar',
      data: quarterlyData[product],
      barWidth: '60%'
    }));
  });
  </script>
  
  <style scoped>
  .demo-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .charts-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .chart-section {
    margin-bottom: 30px;
  }
  
  .chart-container {
    height: 400px;
  }
  
  .chart {
    width: 100%;
    height: 100%;
  }
  
  h1, h2 {
    color: #2c3e50;
  }
  
  h1 {
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
  }
  </style> -->


   <template>
  <div class="demo-container">
    <h1>Sales Dashboard</h1>

    <div v-if="isLoading" class="loading-indicator">Loading...</div>

    <div v-else class="charts-container">
      <div class="chart-section">
        <h2>Sales by Category</h2>
        <div class="chart-container">
          <client-only>
            <v-chart class="chart" :option="pieChartOption" autoresize />
          </client-only>
        </div>
      </div>

      <div class="chart-section">
        <h2>Monthly Sales Trend</h2>
        <div class="chart-container">
          <client-only>
            <v-chart class="chart" :option="lineChartOption" autoresize />
          </client-only>
        </div>
      </div>

      <div class="chart-section">
        <h2>Product Sales Comparison</h2>
        <div class="chart-container">
          <client-only>
            <v-chart class="chart" :option="barChartOption" autoresize />
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, PieChart, LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import { usePowerSyncClient } from '~/composable/usePowerSyncClient';

// Configure ECharts
use([CanvasRenderer, BarChart, PieChart, LineChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent]);

const pieChartOption = ref({});
const lineChartOption = ref({});
const barChartOption = ref({});
const isLoading = ref(true);
const powerSync = await usePowerSyncClient();

// Fetch data from PowerSync
const fetchData = async () => {
  const { data: monthlySalesData, error: monthlySalesError } = await powerSync
    .from('monthly_sales')
    .select('*');
  
  const { data: productSalesData, error: productSalesError } = await powerSync
    .from('product_sales')
    .select('*');
  
  if (monthlySalesError || productSalesError) {
    console.error('Error fetching data:', monthlySalesError || productSalesError);
    return;
  }

  let totalSales = 0;
  const categoryMap = new Map();
  monthlySalesData.forEach(item => {
    categoryMap.set(item.category, (categoryMap.get(item.category) || 0) + item.sales);
    totalSales += item.sales;
  });

  const threshold = 100;
  const groupedCategories = Array.from(categoryMap.entries()).reduce((acc, [category, sales]) => {
    if (sales < threshold) {
      acc['Other'] = (acc['Other'] || 0) + sales;
    } else {
      acc[category] = sales;
    }
    return acc;
  }, {});

  const pieData = Object.entries(groupedCategories).map(([name, value]) => {
    const percentage = ((value / totalSales) * 100).toFixed(2);
    return { name, value, percentage: `${percentage}%` };
  });

  pieChartOption.value = {
    title: { text: 'Sales by Category', left: 'center' },
    tooltip: { trigger: 'item', formatter: (params) => `${params.name}: ${params.percent}%` },
    legend: { orient: 'vertical', left: 'left' },
    series: [{
      type: 'pie',
      radius: '50%',
      data: pieData.map(item => ({ name: item.name, value: item.value })),
      label: { formatter: '{b}: {d}%' },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  const monthlyData = monthlySalesData.map(item => ({
    product: item.product,
    sales: item.sales
  }));

  lineChartOption.value = {
    title: { text: 'Monthly Sales Trend', left: 'center' },
    tooltip: { trigger: 'axis' },
    legend: { data: monthlyData.map(item => item.product), bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
    xAxis: { type: 'category', boundaryGap: false, data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'] },
    yAxis: { type: 'value' },
    series: monthlyData.map(item => ({
      name: item.product,
      type: 'line',
      data: Array(8).fill(item.sales),
      smooth: true
    }))
  };

  const productSalesMap = productSalesData.map(item => ({
    name: item.product,
    value: item.sales
  }));

  barChartOption.value = {
    title: { text: 'Product Sales Comparison', left: 'center' },
    tooltip: { trigger: 'axis' },
    legend: { data: productSalesMap.map(item => item.name), bottom: 0 },
    xAxis: { type: 'category', data: productSalesMap.map(item => item.name) },
    yAxis: { type: 'value' },
    series: [{
      type: 'bar',
      data: productSalesMap.map(item => item.value),
      barWidth: '60%'
    }]
  };

  isLoading.value = false;
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
}

.demo-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.chart-section {
  margin-bottom: 30px;
}

.chart {
  width: 100%;
  height: 100%;
}

h1, h2 {
  color: #2c3e50;
}

h1 {
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.loading-indicator {
  text-align: center;
  font-size: 24px;
  color: #2c3e50;
  padding: 20px;
  background: #f4f4f4;
  border-radius: 10px;
}
</style>

