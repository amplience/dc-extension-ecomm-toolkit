import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

// import './App.css';
import Stack from '@mui/material/Stack'

import AutoCompleteSingle from '../AutoCompleteSingle/AutoCompleteSingle'
import AutoCompleteMultiple from '../AutoCompleteMultiple/AutoCompleteMultiple'
import TreeViewSingle from '../TreeViewSingle/TreeViewSingle'
import ProductSelector from '../ProductSelector'

import amplienceSDK from '../../lib/sdk'
import { Typography } from '@mui/material'

function App() {
    const [ampSDK, setAmpSDK] = useState<any>(undefined)

    useEffect(() => {
        amplienceSDK().then(setAmpSDK)
    }, [ampSDK])

    let component = <></>

    if (ampSDK?.view === 'single') {
        component = <AutoCompleteSingle ampSDK={ampSDK} />
    } else if (ampSDK?.view === 'multi') {
        component = <AutoCompleteMultiple ampSDK={ampSDK} />
    } else if (ampSDK?.view === 'tree') {
        component = <TreeViewSingle ampSDK={ampSDK} />
    } else if (ampSDK?.view === 'product') {
        component = <ProductSelector ampSDK={ampSDK} />
    } else {
        component = (
            <>
                <CircularProgress />
                <div>Loading View..</div>
            </>
        )
    }

    return (
        <div className='App'>
            <Stack spacing={3} sx={{ width: '100%' }}>
                <Typography variant='body1'>{ampSDK?.getTitle()}</Typography>
                <Typography variant='caption'>{ampSDK?.getDescription()}</Typography>
                {component}
            </Stack>
        </div>
    )
}

export default App
