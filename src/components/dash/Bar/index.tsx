import Chart from 'react-apexcharts';
import { useGraphData } from './hooks/useGraphData';
import { Flex, Text, useColorMode } from '@chakra-ui/react';

interface IGraph {
  analistas: string[];
  ticketsResolvidos: number[];
  ticketsFechados: number[];
}

function Bar({
  analistas: getAnalistas = [],
  ticketsResolvidos: getTicketsResolvidos = [],
  ticketsFechados: getTicketsFechados = []
}: IGraph) {
  const { analistas, ticketsResolvidos, ticketsFechados } = useGraphData(
    getAnalistas,
    getTicketsResolvidos,
    getTicketsFechados
  );

  const { colorMode } = useColorMode();

  const chartOptions: any = {
    series: [
      { 
        name: 'Resolvidos', data: ticketsResolvidos, color: colorMode === 'light' ? '#8000ff' : '#ffff00' },
      { name: 'Fechados', data: ticketsFechados, color: colorMode === 'light' ? '#000' : '#00ff40' },
    ],
    options: {
      chart: {
        type: 'bar',
        width: 300,
        height: 220,
        toolbar: {
          show: true
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
          style: {
            color: colorMode === 'light' ? 'black' : 'white',
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      theme: {
        mode: colorMode,
      },
    },
  };
  
  if (colorMode === 'dark') {
    chartOptions.options.xaxis.labels.style.color = 'white'; 
  };
  
  return (
    <Flex alignItems='center' direction='column'>
      <Text color={colorMode === 'light' ? 'black' : 'white'}>
        Resolvidos e Fechados
      </Text>
      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type="bar"
        width={300}
        height={220}
      />
    </Flex>
  );
}

export default Bar;
