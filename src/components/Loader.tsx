import React from 'react'

import { Triangle } from 'react-loader-spinner';

function Loader() {
  return (
    <div className='min-h-[95vh]'>
        <div className='flex flex-row justify-center items-center h-[80vh]'>
            <Triangle color='blue' width='140px' height='140px'/>
        </div>
    </div>
  )
}

export default Loader