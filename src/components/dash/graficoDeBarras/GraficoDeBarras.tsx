import Chart from 'react-apexcharts';
import { useGraphData } from './hooks/useGraphData';

interface IGraph {
  analistas: string[];
  ticketsResolvidos: number[];
  ticketsFechados: number[];
}

function GraficoDeBarras({
  analistas: getAnalistas = [],
  ticketsResolvidos: getTicketsResolvidos = [],
  ticketsFechados: getTicketsFechados = []
}: IGraph) {
  const { analistas, ticketsResolvidos, ticketsFechados } = useGraphData(
    getAnalistas,
    getTicketsResolvidos,
    getTicketsFechados
  );

  const chartOptions: any = {
    series: [
      { name: 'Resolvidos', data: ticketsResolvidos },
      { name: 'Fechados', data: ticketsFechados },
    ],
    options: {
      chart: {
        type: 'bar',
        width: 400,
        height: 250,
      },
      title: {
        text: 'Fechados e resolvidos (HOJE)',
        align: 'center',
        style: {
          fontSize: '12px',
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
      },
      stroke: {
        show: false,
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: analistas,
        labels: {
          formatter: function (val: any) {
            val = ' ';
            return val;
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
    },
  };

  return (
    <div className='basic-bar'>
      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type="bar"
        width={300}
        height={250}
      />
    </div>
  );
}

export default GraficoDeBarras;
