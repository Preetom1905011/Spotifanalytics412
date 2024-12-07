import React from 'react'
import LineChart from './LineChart'

export default function GraphTab({result, plotVar}) {
  return (
    <div className='graphTab'>
        <LineChart result={result}
          plotVar={plotVar} />
    </div>
  )
}
