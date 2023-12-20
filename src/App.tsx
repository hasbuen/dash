import { Stack, Text } from '@chakra-ui/react';
import { Header } from './components/commons/Header/index';
import Bar from './components/dash/Bar/index';
import Abertos from './components/dash/Radial/Abertos';
import Resolvidos from './components/dash/Radial/Resolvidos';
import Fechados from './components/dash/Radial/Fechados';

function App() {
  return (
    <>
      <Stack
        direction={['column', 'row']}
        p='5'
        spacing={4}
        alignItems='center'
        maxW='100%'
        mx='auto'
        position='relative'
      >
        <Header />
        <Abertos />
        <Resolvidos />
        <Fechados />
      </Stack>


      <Stack direction={['column', 'row']}
        p='5'
        spacing={4}
        alignItems='left'
        maxW='100%'
        mx='auto'
        position='relative'
      >
        <Bar />
        
      </Stack>
    </>
  );
}

export default App;
