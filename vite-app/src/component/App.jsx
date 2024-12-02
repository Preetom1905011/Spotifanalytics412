import React from 'react'
import Header from './header'
import SelectTab from './SelectTab'
import GraphTab from './GraphTab'

export default function App() {
  return (
    <div className='body'>
      <Header/>
      <div className='layout'>
        <SelectTab/>
        <GraphTab/>
      </div>
    </div>
  )
}
