import Chart from 'react-apexcharts';
import { Flex, Text, useColorMode } from '@chakra-ui/react';
import { useGraphData } from './hooks/useGraphData';


interface IGraph {
    ticketsFechados: number[];
}

function Radial({
    ticketsFechados: getTicketsFechados = [],
}: IGraph) {
    const { ticketsFechados } = useGraphData(getTicketsFechados);



    const { colorMode } = useColorMode();

    const state: any = {

        series: [ticketsFechados],
        options: {
            chart: {
                type: 'radialBar',
                offsetY: -20,
                sparkline: {
                    enabled: false
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    track: {
                        background: "#C1C1C1",
                        strokeWidth: '97%',
                        margin: 17,
                    },
                    dataLabels: {
                        name: {
                            show: false
                        },
                        value: {
                            show: true,
                            offsetY: -2,
                            fontSize: '52px',
                            formatter: function (val: any) {
                                return val; 
                            },
                            color: colorMode === 'light' ? 'black' : 'white',
                        }
                    }
                }
            },
            grid: {
                padding: {
                    top: -10
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'horizontal',
                    shadeIntensity: 0,
                    gradientToColors: ['#8000ff'],
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100]
                }
            },
        },


    };

    if (colorMode === 'dark') {
        state.series.color = 'white';
    };

    return (
        <Flex alignItems='center' direction='column'>
            <Text color={colorMode === 'light' ? 'black' : 'white'}>
                Fechados
            </Text>
            <Chart
                options={state.options}
                series={state.series}
                type="radialBar"
                width={300}
                height={250}
            />
        </Flex>
    );
}

export default Radial;
