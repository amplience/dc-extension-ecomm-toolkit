import React, { useEffect, useState } from 'react';

// import './App.css';
import Stack from '@mui/material/Stack';

import AutoCompleteSingle from '../AutoCompleteSingle/AutoCompleteSingle';
import AutoCompleteMultiple from '../AutoCompleteMultiple/AutoCompleteMultiple';
import TreeViewSingle from '../TreeViewSingle/TreeViewSingle';

import amplienceSDK from '../../lib/sdk'

function App() {
  const [ampSDK, setAmpSDK] = useState<any>(undefined);

  useEffect(() => {
    amplienceSDK().then(setAmpSDK)
    console.log('sdk', ampSDK)
  }, [ampSDK]);

  let component = <></>
  if (ampSDK?.view === 'single') {
    component = <AutoCompleteSingle ampSDK={ampSDK} />
  } else if (ampSDK?.view === 'multi') {
    component = <AutoCompleteMultiple ampSDK={ampSDK} />
  } else if (ampSDK?.view === 'tree') {
    component = <TreeViewSingle ampSDK={ampSDK} />
  } else {
    component = <></>
  }

  return <div className="App">
    <Stack spacing={3} sx={{ width: '100%' }}>{component}</Stack>
  </div>
}

export default App;