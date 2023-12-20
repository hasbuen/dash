import { useEffect, useState } from 'react';
import { createFactory } from '../../../../../services/factory';

export function useGraphData(pullTicketsFechados = {}) {
  // Estado para armazenar dados sobre tickets
  const [ticketsFechados, setTicketsFechados] = useState(pullTicketsFechados);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fabricando = await createFactory();

        // Obtém detalhes dos tickets
        const tickets = await fabricando.getTickets();

        // Processa resumo dos propriemários dos tickets
        const ignorar = ["Jpsantos"];
        const Fechados = fabricando.devolverApenasTotalDeTicketsFechados(tickets, ignorar);

        setTicketsFechados(Fechados);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    // Chama a função fetchData imediatamente ao montar o componente
    fetchData();

    // Define um intervalo para chamar a função fetchData a cada 10 minutos (600000 milissegundos)
    const intervalId = setInterval(fetchData, 60000);

    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(intervalId);
  }, []); // O segundo parâmetro do useEffect é uma lista de dependências, deixado vazio para executar apenas uma vez

  return {
    ticketsFechados,
  };
}
