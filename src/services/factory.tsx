import formatarNomes from "../util/strings/formatarNomes";

async function createFactory() {
  const API = import.meta.env.VITE_API;

  class Factory {

    async getTickets() {
      const tickets = "";
      const url = API;

      try {

        const response = await fetch(url, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Oops, algo aconteceu, verifique o servidor: Status: ${response.status}`);
        }

        return await response.json();

      } catch (error) {
        console.error(error);
      }

      return tickets;
    }


    filterTicketsByState(tickets: any[], state: string) {
      return tickets.filter(ticket => ticket.State.toLowerCase() === state.toLowerCase());
    }

    filterTicketsByOwners(tickets: any[], owners: string[]) {
      return tickets.filter(ticket => owners.includes(ticket.Owner.toLowerCase()));
    }

    processOwners(tickets: any, ignorarAnalista: string[]) {
      const ownersSummary: { [key: string]: any; } = {};

      Object.values(tickets).forEach((ticket: any) => {
        const key = ticket.Owner;

        // Ignorar analistas na lista
        if (!ignorarAnalista.includes(key.toLowerCase())) {
          if (!ownersSummary[key]) {
            ownersSummary[key] = {
              Owner: formatarNomes(ticket.Owner),
              Resolvido: 0,
              Fechado: 0
            };
          }

          if (ticket.State.toLowerCase() === 'resolvido') {
            ownersSummary[key].Resolvido++;
          } else if (ticket.State.toLowerCase() === 'fechado') {
            ownersSummary[key].Fechado++;
          }
        }
      });


      return Object.values(ownersSummary);
    }


    devolverApenasTotalDeTicketsResolvidos(tickets: any[], ignorarAnalista: string[]): number {
      let resolvidos = 0;

      tickets.forEach((ticket: any) => {

        if (!ignorarAnalista.includes(ticket.Owner.toLowerCase())) {

          if (ticket.State.toLowerCase() === 'resolvido') {
            resolvidos++;
          }
        }
      });

      return resolvidos;

    }

    devolverApenasTotalDeTicketsFechados(tickets: any[], ignorarAnalista: string[]): number {
      let fechados = 0;

      tickets.forEach((ticket: any) => {

        if (!ignorarAnalista.includes(ticket.Owner.toLowerCase())) {

          if (ticket.State.toLowerCase() === 'fechado') {
            fechados++;
          }
        }
      });

      return fechados;

    }

    devolverApenasTotalDeTicketsAbertos(tickets: any[], ignorarAnalista: string[]): number {
      let abertos = 0;

      tickets.forEach((ticket: any) => {

        if (!ignorarAnalista.includes(ticket.Owner.toLowerCase())) {

          if (ticket.State.toLowerCase() === 'novo' || ticket.State.toLowerCase() === 'open') {
            abertos++;
          }
        }
      });

      return abertos;

    }
    


  }

  return new Factory();
}

export {
  createFactory,
};
