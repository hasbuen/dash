// useGraphData.ts
import { useEffect, useState } from 'react';
import { createFactory } from '../../../../../services/factory';

export function useGraphData(pullTicketsResolvidos = {}) {

  // Estado para armazenar dados sobre tickets
  const [ticketsResolvidos, setTicketsResolvidos] = useState(pullTicketsResolvidos);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const fabricando = await createFactory();

        // Obtém detalhes dos tickets
        const tickets = await fabricando.getTickets();

        // Processa resumo dos propriemários dos tickets
        const ignorar = ["Jpsantos"]
        const resolvidos = fabricando.devolverApenasTotalDeTicketsResolvidos(tickets, ignorar);

        setTicketsResolvidos(resolvidos);

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
    // Define um intervalo para chamar a função fetchData a cada 10 minutos (600000 milissegundos)
    const intervalId = setInterval(fetchData, 60000);

    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(intervalId);
  }, []); // O segundo parâmetro do useEffect é uma lista de dependências, deixado vazio para executar apenas uma vez

  return {
    ticketsResolvidos,
  };
}
