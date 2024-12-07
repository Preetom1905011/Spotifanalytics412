import React, { useState } from 'react'
import Header from './header'
import SelectTab from './SelectTab'
import GraphTab from './GraphTab'

export default function App() {
  
  const [result, setResult] = useState(null);
  const [plotVar, setPlotVar] = useState(null);

  return (
    <div className='body'>
      <Header/>
      <div className='layout'>
        <SelectTab
          result={result}
          setResult={setResult}
          setPlotVar={setPlotVar}
        />
        <GraphTab
          result={result}
          plotVar={plotVar}
        />
      </div>
    </div>
  )
}
