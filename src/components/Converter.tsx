import React, { useEffect, useState } from 'react'

import { fetchFromAPI } from '../utils/fetchFromAPI';
import InputAmound from './InputAmound';

function Converter() {

    const [allCurrencies, setAllCurrencies] = useState<Array<string>>([]);
    const [choiceCurrencies, setChoiceCurrencies] = useState<Array<string>>([]);

    const [amound, setAmound] = useState<string>();

    const [choiceFrom, setChoiceFrom] = useState<string>();
    const [choiceTo, setChoiceTo] = useState<string>();
    const [labelFrom, setLabelFrom] = useState<string>();
    const [labelTo, setLabelTo] = useState<string>();

    useEffect(() => {
        fetchFromAPI('currencies?api_key=1509376c38-f3a5c6ecea-rj6v8z')
            .then((data) => setAllCurrencies(data.currencies));
    }, []);

    useEffect(() => {
        fetchFromAPI(`convert?from=${choiceFrom}&to=${choiceTo}&amount=${amound}&api_key=1509376c38-f3a5c6ecea-rj6v8z`)
            .then((data) => setChoiceCurrencies(data.result));
    }, [choiceFrom, choiceTo, amound])

    console.log(choiceCurrencies);

    return (
        <div className='w-auto h-screen flex flex-col text-center 
        items-center justify-center bg-emerald-200'>
            <div className='flex flex-col justify-center mb-6'>
                <b className='text-4xl font-sans mb-2'>
                    {choiceFrom && choiceTo && amound !== undefined ?
                        `${amound} ${choiceFrom} to ${choiceTo} - Convert ${labelFrom} to ${labelTo}` :
                        `1 EUR to UAH - Convert Euros to Ukrainian Hryvni`
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
                        amound={amound!} setAmound={setAmound}
                    />

                    <InputAmound allCurrencies={allCurrencies}
                        setChoice={setChoiceTo}
                        setLabel={setLabelTo}
                        amound={amound!} setAmound={setAmound}
                    />

                </div>
            </div>
        </div>
    )
}

export default Converter