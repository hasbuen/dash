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

    processOwners(tickets: any) {
      const ownersSummary: { [key: string]: any; } = {};

      Object.values(tickets).forEach((ticket: any) => {
        const key = ticket.Owner.toLowerCase();
        if (!ownersSummary[key]) {
          ownersSummary[key] = {
            Owner: ticket.Owner,
            Resolvido: 0,
            Fechado: 0
          };
        }

        if (ticket.State.toLowerCase() === 'resolvido') {
          ownersSummary[key].Resolvido++;
        } else if (ticket.State.toLowerCase() === 'fechado') {
          ownersSummary[key].Fechado++;
        }
      });

      return Object.values(ownersSummary);
    }


  }

  return new Factory();
}

export {
  createFactory,
};
