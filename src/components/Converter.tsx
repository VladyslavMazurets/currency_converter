import React, { useEffect, useState } from 'react'

import { fetchFromAPI } from '../utils/fetchFromAPI';
import InputAmound from './InputAmound';

function Converter() {

    const [allCurrencies, setAllCurrencies] = useState<Array<string>>([]);
    const [choiceCurrencies, setChoiceCurrencies] = useState<Array<string>>([]);

    const [amoundFrom, setAmoundFrom] = useState<string>();
    const [amoundTo, setAmoundTo] = useState<string>();

    const [choiceFrom, setChoiceFrom] = useState<string>();
    const [choiceTo, setChoiceTo] = useState<string>();
    const [labelFrom, setLabelFrom] = useState<string>();
    const [labelTo, setLabelTo] = useState<string>();

    useEffect(() => {
        fetchFromAPI('currencies?api_key=1509376c38-f3a5c6ecea-rj6v8z')
            .then((data) => setAllCurrencies(data.currencies));
    }, []);

    useEffect(() => {
        fetchFromAPI(`convert?from=${choiceFrom}&to=${choiceTo}&amount=${amoundFrom}&api_key=1509376c38-f3a5c6ecea-rj6v8z`)
            .then((data) => setChoiceCurrencies(Object.values(data.result)[0] as any));
    }, [choiceFrom, choiceTo, amoundFrom, amoundTo])

    return (
        <div className='w-auto h-screen flex flex-col text-center 
        items-center justify-center bg-emerald-200'>
            <div className='flex flex-col justify-center mb-6'>
                <b className='text-4xl font-sans mb-2'>
                    {choiceFrom && choiceTo && amoundFrom !== undefined ?
                        `${amoundFrom} ${choiceFrom} to ${choiceTo} - Convert ${labelFrom} to ${labelTo}` :
                        `EUR to UAH - Convert Euros to Ukrainian Hryvni`
                    }
                </b>
                <p className='text-2xl font-sans font-medium'>
                    Currency Converter
                </p>
            </div>

            <div className='w-1/2 bg-white shadow-2xl'>
                <div className='flex text-center items-center justify-around'>

                    <InputAmound allCurrencies={allCurrencies}
                        setChoice={setChoiceFrom}
                        setLabel={setLabelFrom}
                        amound={amoundFrom!} setAmound={setAmoundFrom}
                    />

                    <InputAmound allCurrencies={allCurrencies}
                        setChoice={setChoiceTo}
                        setLabel={setLabelTo}
                        amound={choiceCurrencies!} setAmound={setAmoundTo}
                    />

                </div>
            </div>
        </div>
    )
}

export default Converter