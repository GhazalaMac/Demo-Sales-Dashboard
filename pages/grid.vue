<!-- <template>
    <div>
      <p>Product Sales Grid</p>
      <ag-grid-vue
        class="ag-theme-alpine"
        style="height: 500px; width: 100%"
        :rowData="rowData"
        :columnDefs="colDefs"
        :defaultColDef="defaultColDef"
      ></ag-grid-vue>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import { AgGridVue } from "ag-grid-vue3";
  import type { ColDef } from "ag-grid-community";
  import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
  
  // Register required ag-Grid modules
  ModuleRegistry.registerModules([AllCommunityModule]);
  
  interface IProductSale {
    product: string;
    category: string;
    sales: number;
    revenue: number;
    region: string;
  }
  
  export default defineComponent({
    name: "ProductSalesGrid",
    components: {
      AgGridVue,
    },
    setup() {
      const rowData = ref<IProductSale[]>([
        { product: "Laptop", category: "Electronics", sales: 120, revenue: 84000, region: "North" },
        { product: "Smartphone", category: "Electronics", sales: 200, revenue: 100000, region: "North" },
        { product: "PS5", category: "Electronics", sales: 85, revenue: 42500, region: "South" },
        { product: "Headphones", category: "Electronics", sales: 150, revenue: 30000, region: "East" },
        { product: "4K TV", category: "Electronics", sales: 75, revenue: 112500, region: "East" },
        { product: "Desk Chair", category: "Furniture", sales: 85, revenue: 21250, region: "South" },
        { product: "Coffee Table", category: "Furniture", sales: 45, revenue: 13500, region: "South" },
        { product: "Sofa", category: "Furniture", sales: 30, revenue: 45000, region: "West" },
        { product: "Bed Frame", category: "Furniture", sales: 25, revenue: 37500, region: "West" },
        { product: "Bookshelf", category: "Furniture", sales: 60, revenue: 18000, region: "North" },
      ]);
  
      const colDefs = ref<ColDef<IProductSale>[]>([
        { field: "product" },
        { field: "category" },
        { field: "sales" },
        { field: "revenue" },
        { field: "region" },
      ]);
  
      const defaultColDef = {
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
      };
  
      return {
        rowData,
        colDefs,
        defaultColDef,
      };
    },
  });
  </script>
   -->

   <!-- Supabase integration_____________________________________________________________________________________________ -->
   <!-- <template>
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
  
        <div class="chart-section">
          <h2>Product Sales Data</h2>
          <ag-grid-vue
            class="ag-theme-alpine"
            style="height: 500px; width: 100%"
            :rowData="rowData"
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
          />
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
  import { useSupabaseClient } from '~/composable/useSupabaseClient';
  import { AgGridVue } from 'ag-grid-vue3';
  import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
  
  // Register AG Grid modules
  ModuleRegistry.registerModules([AllCommunityModule]);
  
  // Configure ECharts
  use([CanvasRenderer, BarChart, PieChart, LineChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent]);
  
  const pieChartOption = ref({});
  const lineChartOption = ref({});
  const barChartOption = ref({});
  const isLoading = ref(true);
  const rowData = ref([]);
  const colDefs = ref([
    { field: 'product', headerName: 'Product' },
    { field: 'category', headerName: 'Category' },
    { field: 'sales', headerName: 'Sales' },
    { field: 'revenue', headerName: 'Revenue' },
    { field: 'region', headerName: 'Region' },
  ]);
  const defaultColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
  };
  const supabase = await useSupabaseClient();
  
  // Fetch data from Supabase
  const fetchData = async () => {
    const { data: monthlySalesData, error: monthlySalesError } = await supabase
      .from('monthly_sales')
      .select('*');
  
    const { data: productSalesData, error: productSalesError } = await supabase
      .from('product_sales')
      .select('*');
  
    console.clear();
    console.log('Monthly Sales Data:', monthlySalesData);
    console.log('Product Sales Data:', productSalesData);
  
    if (monthlySalesError || productSalesError) {
      console.error('Error fetching data:', monthlySalesError || productSalesError);
      return;
    }
  
    // Pie Chart Data (Sales by Category)
    const categoryMap = new Map();
    monthlySalesData.forEach(item => {
      categoryMap.set(item.category, (categoryMap.get(item.category) || 0) + item.sales);
    });
  
    pieChartOption.value = {
      title: { text: 'Sales by Category', left: 'center' },
      tooltip: { trigger: 'item' },
      legend: { orient: 'vertical', left: 'left' },
      series: [{
        type: 'pie',
        radius: '50%',
        data: Array.from(categoryMap.entries()).map(([name, value]) => ({
          name, value
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
  
    // Line Chart Data (Monthly Sales Trend)
    const monthlyData = monthlySalesData.map(item => ({
      product: item.product,
      sales: item.sales
    }));
  
    lineChartOption.value = {
      title: { text: 'Monthly Sales Trend', left: 'center' },
      tooltip: { trigger: 'axis' },
      legend: { data: monthlyData.map(item => item.product), bottom: 0 },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'] // Example time-series data
      },
      yAxis: { type: 'value' },
      series: monthlyData.map(item => ({
        name: item.product,
        type: 'line',
        data: [item.sales, item.sales, item.sales, item.sales, item.sales, item.sales, item.sales, item.sales], // Example data
        smooth: true
      }))
    };
  
    // Bar Chart Data (Product Sales Comparison)
    const productSalesMap = productSalesData.map(item => ({
      name: item.product,
      value: item.sales
    }));
  
    barChartOption.value = {
      title: { text: 'Product Sales Comparison', left: 'center' },
      tooltip: { trigger: 'axis' },
      legend: { data: productSalesMap.map(item => item.name), bottom: 0 },
      xAxis: {
        type: 'category',
        data: productSalesMap.map(item => item.name)
      },
      yAxis: { type: 'value' },
      series: [{
        type: 'bar',
        data: productSalesMap.map(item => item.value),
        barWidth: '60%'
      }]
    };
  
    // Populate AG Grid with product sales data
    rowData.value = [...productSalesData];
  
    // Set loading to false once data is fetched
    isLoading.value = false;
  };
  
  // Call fetchData on mounted
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
  
  /* Loading indicator styling */
  .loading-indicator {
    text-align: center;
    font-size: 24px;
    color: #2c3e50;
    padding: 20px;
    background: #f4f4f4;
    border-radius: 10px;
  }
  </style>
   -->


   <!-- PowerSync implimantaiton__________________________________________________________________________ -->

   
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
  import Logger from '/_nuxt/node_modules/js-logger/src/logger.js'; // Correct import
  
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
      Logger.error('Error fetching data:', monthlySalesError || productSalesError); // Log errors
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
  