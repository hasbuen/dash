import GraficoDeBarras from './components/dash/graficoDeBarras/GraficoDeBarras';

function App() {

  const dummyData = {
    analistas: [],
    ticketsResolvidos: [],
    ticketsFechados: [],
  };

  return (
    <>
      <div className='mt-4 m-12'>

        <a href="https://rhede.serviceup.app/portal/index.html" target="_blank"
          className="underline-none text-3xl font-bold hover:underline-none text-green-900">
          <h1>{import.meta.env.VITE_SETOR}</h1>
        </a>

      </div>

      <div className='mt-auto m-4 bg-primary'>
        <GraficoDeBarras
          analistas={dummyData.analistas}
          ticketsResolvidos={dummyData.ticketsResolvidos}
          ticketsFechados={dummyData.ticketsFechados}
        />
      </div>

    </>
  );
}

export default App;
