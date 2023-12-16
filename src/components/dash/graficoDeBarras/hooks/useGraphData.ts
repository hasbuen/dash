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
        
        // Processa resumo dos proprietários dos tickets
        const ownersSummary = fabricando.processOwners(tickets);

  
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
  }, []);

  return {
    analistas,
    ticketsResolvidos,
    ticketsFechados,
  };
}
