import React, { useEffect, useState } from 'react'
import Select from 'react-select'

import { fetchFromAPI } from '../utils/fetchFromAPI';

interface IValuta {
    value: string;
    label: string;
}

function Converter() {

    const [allCurrencies, setAllCurrencies] = useState<Array<string>>([]);
    
    const [amound, setAmound] = useState<string>();

    const [choiceFrom, setChoiceFrom] = useState<string>();
    const [choiceTo, setChoiceTo] = useState<string>();
    const [labelFrom, setLabelFrom] = useState<string>();
    const [labelTo, setLabelTo] = useState<string>();

    useEffect(() => {
        fetchFromAPI('currencies?api_key=1509376c38-f3a5c6ecea-rj6v8z')
            .then((data) => setAllCurrencies(data.currencies));
    }, []);

    const objectKeys: string[] = Object.keys(allCurrencies);
    const objectValues: string[] = Object.values(allCurrencies);

    var options: IValuta[] = [];

    for (let i = 0; i < objectKeys.length; i++) {

        var valuta = {
            value: objectKeys[i],
            label: objectValues[i]
        } as IValuta;

        options.push(valuta);
    }
    console.log(options);
    return (
        <div className='w-auto h-screen flex flex-col text-center 
        items-center justify-center bg-emerald-200'>
            <div className='flex flex-col justify-center mb-6'>
                <b className='text-4xl font-sans mb-2'>
                    {choiceFrom && choiceTo ?
                        `${amound} ${choiceFrom} to ${choiceTo} - Convert ${labelFrom} to ${labelTo}` :
                        `1 EUR to UAH - Convert Euros to Ukrainian Hryvni`
                    }
                </b>
                <p className='text-2xl font-sans font-medium italic'>
                    Currency Converter
                </p>
            </div>

            <div className='w-1/2 bg-white shadow-2xl'>
                <div className='flex text-center items-center justify-around'>
                    <div className='flex flex-col my-4'>
                        <span className='text-3xl font-serif font-medium my-4'>
                            From Currency
                        </span>
                        <Select className='mb-3 text-xl'
                            placeholder='Select currency'
                            options={options}
                            onChange={e => {setChoiceFrom(e?.value); setLabelFrom(e?.label)}}
                        />
                        <input name='from' placeholder='Amount'
                            className='mb-5 border-b-4 py-4 px-5
                            border-b-stone-700 focus:border-b-lime-600 
                            bg-gray-100 text-2xl focus:outline-none focus:bg-gray-200'
                            type="text"
                            value={amound}
                            onChange={e => setAmound(e.target.value.replace(/[^0-9.]/g, ''))} />
                    </div>

                    <div className='flex flex-col my-4'>
                        <span className='text-3xl font-serif font-medium my-4'>
                            To Currency
                        </span>
                        <Select className='mb-3 text-xl'
                            placeholder='Select currency'
                            options={options}
                            onChange={e => {setChoiceTo(e?.value); setLabelTo(e?.label)}}
                        />
                        <input placeholder='Amount' name='to'
                            className='mb-5 border-b-4 py-4 px-5
                            border-b-stone-700 focus:border-b-lime-600 
                            bg-gray-100 text-2xl focus:outline-none focus:bg-gray-200'
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