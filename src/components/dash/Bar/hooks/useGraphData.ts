// useGraphData.ts
import { useEffect, useState } from 'react';
import { createFactory } from '../../../../services/factory';

export function useGraphData(pullAnalistas = {}, pullTicketsResolvidos = {}, pullTicketsFechados = {}) {
  // Estado para armazenar dados sobre analistas
  const [analistas, setAnalistas] = useState(pullAnalistas);
  // Estado para armazenar dados sobre tickets
  const [ticketsResolvidos, setTicketsResolvidos] = useState(pullTicketsResolvidos);
  const [ticketsFechados, setTicketsFechados] = useState(pullTicketsFechados);


  useEffect(() => {

    const fetchData = async () => {
      try {
        const fabricando = await createFactory();

        // Obtém detalhes dos tickets
        const tickets = await fabricando.getTickets();

        // Processa resumo dos propriemários dos tickets
        const ignorar = ["Jpsantos"]
        const ownersSummary = fabricando.processOwners(tickets, ignorar);


        const objAnalistas = ownersSummary.map(owner => owner.Owner);
        // Atualiza o estado dos analistas
        setAnalistas(objAnalistas);

        setTicketsResolvidos(ownersSummary.map(owner => owner.Resolvido));

        setTicketsFechados(ownersSummary.map(owner => owner.Fechado));

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
    analistas,
    ticketsResolvidos,
    ticketsFechados,
  };
}
