import GraficoDeBarras from './components/dash/graficoDeBarras/GraficoDeBarras';

function App() {

  const dummyData = {
    analistas: [],
    ticketsResolvidos: [],
    ticketsFechados: [],
  };

  return (
    <>
      <div>
        <a href="https://rhede.serviceup.app/portal/index.html" target="_blank"
          className="underline-none text-3xl font-bold hover:underline-none text-green-900">
          <h1>Suporte i9</h1>
        </a>

        <div className='mt-4 p-4 shadow-md bg-primary'>
          <GraficoDeBarras
            analistas={dummyData.analistas}
            ticketsResolvidos={dummyData.ticketsResolvidos}
            ticketsFechados={dummyData.ticketsFechados}
          />
        </div>

      </div>
    </>
  );
}

export default App;
