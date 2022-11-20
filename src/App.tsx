import React,{FC} from 'react';
import GlobalHeader from './component/globalheader/GlobalHeader';
import Routers from './routers/Routers';

const App: FC = () => {
  return (
    <>
    <GlobalHeader />
      <Routers />
    </>
  );
}

export default App;
