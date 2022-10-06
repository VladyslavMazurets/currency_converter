import React, { useEffect, useState } from 'react'

import { fetchFromAPI } from '../utils/fetchFromAPI';
import InputAmound from './InputAmound';

function Converter() {

    const [allCurrencies, setAllCurrencies] = useState<Array<string>>([]);
    const [choiceCurrencies, setChoiceCurrencies] = useState<string>();

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
        {
            choiceFrom && choiceTo && amoundFrom !== undefined ?
                fetchFromAPI(`convert?from=${choiceFrom}&to=${choiceTo}&amount=${amoundFrom}&api_key=1509376c38-f3a5c6ecea-rj6v8z`)
                    .then((data) => setChoiceCurrencies(Object.values(data.result)[0] as any))
                :
                fetchFromAPI(`convert?from=EUR&to=UAH&amount=1&api_key=1509376c38-f3a5c6ecea-rj6v8z`)
                    .then((data) => setChoiceCurrencies(Object.values(data.result)[0] as any))
        }
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

                    <div className='flex flex-col my-4'>
                        <span className='text-3xl font-serif font-medium mb-5 mt-1'>
                            From Currency
                        </span>
                        <InputAmound allCurrencies={allCurrencies}
                            setChoice={setChoiceFrom}
                            setLabel={setLabelFrom}
                            choiceCurrencies={choiceCurrencies!}
                            amound={amoundFrom!}
                            setAmound={setAmoundFrom}
                            name={'from'}
                        />
                    </div>

                    <div className='flex flex-col my-4'>
                        <span className='text-3xl font-serif font-medium mb-5 mt-1'>
                            To Currency
                        </span>
                        <InputAmound allCurrencies={allCurrencies}
                            setChoice={setChoiceTo}
                            setLabel={setLabelTo}
                            amound={amoundTo!}
                            setAmound={setAmoundTo}
                            choiceCurrencies={choiceCurrencies!}
                            name={'to'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Converter