import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import api from 'services/api';
import { SaleSuccess } from 'types/sale';
import { round } from 'utils/format';

type SerieData = {
  name: "% Sucesso",
  data: number[]
}

type BarChartData = {
  labels: {
    categories: string[];
  },
  series: SerieData[];
}


const BarChart = () => {

  const [barChartdata, setBarChartData] = useState<BarChartData>({
    labels: {
      categories: []
    },
    series: [{
      name: "% Sucesso",
      data: []
    }]
  })

  useEffect(() => {
    async function loadBarChartData() {
      const response = await api.get('data_bar_chart/');
      const categories = response.data.map((sales: SaleSuccess) => sales.seller);
      const data = response.data.map((sales: SaleSuccess) => round(100 * sales.sum_deals / sales.sum_visited, 1));
      setBarChartData({
        labels: {
          categories,
        },
        series: [{
          name: "% Sucesso",
          data,
        }]
      })
    }
    loadBarChartData();
  }, [])


  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
  };

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={{ ...options, xaxis: barChartdata.labels }}
            series={barChartdata.series}
            type="bar"
            height="240"
          />
        </div>
      </div>
    </div>
  );
}

export default BarChart;