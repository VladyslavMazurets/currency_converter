import React, { useEffect, useState } from 'react'
import Select from 'react-select'

import { fetchFromAPI } from '../utils/fetchFromAPI';

function Converter() {

    const [allCurrencies, setAllCurrencies] = useState<Array<string>>([]);
    const [amound, setAmound] = useState<string>()

    useEffect(() => {
        fetchFromAPI('currencies')
            .then((data) => setAllCurrencies(data.result));
    }, []);

    const objectKeys: string[] = Object.keys(allCurrencies);
    const objectValues: string[] = Object.values(allCurrencies);

    return (
        <div className='w-auto h-screen flex flex-col text-center 
        items-center justify-center bg-emerald-200'>
            <div className='flex flex-col justify-center mb-6'>
                <b className='text-4xl font-sans mb-2'>
                    1 EUR to UAH - Convert Euros to Ukrainian Hryvni
                </b>
                <p className='text-2xl font-sans font-medium italic'>
                    Currency Converter
                </p>
            </div>

            <div className='w-1/2 bg-white'>
                <div className='flex text-center items-center justify-around'>
                    <div className='flex flex-col my-4'>
                        <span className='text-2xl font-medium my-4'>
                            From Currency
                        </span>
                        <Select className='mb-3 text-lg'
                            placeholder='Select currency'
                        />
                        <input name='from' placeholder='Amount'
                            className='mb-5 border-2 bg-gray-200 text-2xl'
                            type="text"
                            value={amound}
                            onChange={e => setAmound(e.target.value.replace(/[^0-9.]/g, ''))} />
                    </div>

                    <div className='flex flex-col my-4'>
                        <span className='text-2xl font-medium my-4'>
                            To Currency
                        </span>
                        <Select className='mb-3 text-lg'
                            placeholder='Select currency' />
                        <input placeholder='Amount' name='to'
                            className='mb-5 border-2 bg-gray-200 text-2xl'
                            type="text"
                            value={amound}
                            onChange={e => setAmound(e.target.value.replace(/[^0-9.]/g, ''))} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Converter