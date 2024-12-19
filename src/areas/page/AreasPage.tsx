import React from 'react'
import { TablaAreas } from '../components/TablaAreas'
import { FormAreas } from '../components/modal/FormAreas'


export const AreasPage = () => {
  return (
    <div>
            {<FormAreas/>}
      {<TablaAreas/>}
      
      </div>
  )
}
