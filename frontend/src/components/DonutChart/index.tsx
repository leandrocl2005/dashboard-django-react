import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import api from 'services/api';
import { SaleSum } from 'types/sale';

type ChartData = {
  labels: string[];
  series: number[];
};

const DonutChart = () => {

  const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

  useEffect(() => {
    async function loadChartData() {
      const response = await api.get("data_donut/");
      const labels = response.data.map((saleSum: SaleSum) => saleSum.seller);
      const series = response.data.map((saleSum: SaleSum) => saleSum.sum_amount)
      setChartData({
        labels, series
      })
    }
    loadChartData();
  }, [])

  const options = {
    legend: {
      show: true
    }
  }

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"
          />
        </div>
      </div>
    </div>
  );
}

export default DonutChart;