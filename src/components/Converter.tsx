import React, { useEffect, useState } from 'react'

import { fetchFromAPI } from '../utils/fetchFromAPI';
import InputAmound from './InputAmound';

function Converter() {
    const [amountFrom, setAmountFrom] = useState<number>();
    const [amountTo, setAmountTo] = useState<number>();

    const [choiceFrom, setChoiceFrom] = useState<string>();
    const [choiceTo, setChoiceTo] = useState<string>();
    const [labelFrom, setLabelFrom] = useState<string>();
    const [labelTo, setLabelTo] = useState<string>();

    const convertFromTo = () => {
        if (amountFrom) {
            fetchFromAPI(`convert?from=${choiceFrom}&to=${choiceTo}&amount=${amountFrom}`)
                .then((data) => setAmountTo(Number(parseFloat(data.result).toFixed(2))));
        }
    };

    const convertToFrom = () => {
        if (amountTo) {
            fetchFromAPI(`convert?from=${choiceTo}&to=${choiceFrom}&amount=${amountTo}`)
                .then((data) => setAmountFrom(Number(parseFloat(data.result).toFixed(2))));
        }
    };


    useEffect(() => {
        convertFromTo();
    }, [choiceFrom, amountFrom])

    useEffect(() => {
        convertToFrom();
    }, [choiceTo, amountTo])

    return (
        <div className='w-auto h-screen flex flex-col text-center 
        items-center justify-center bg-emerald-200'>
            <div className='flex flex-col justify-center mb-6'>
                <b className='text-4xl font-sans mb-2'>
                    {choiceFrom && choiceTo && amountFrom !== undefined || null ?
                        `${amountFrom} ${choiceFrom} to ${choiceTo} 
                        - Convert ${labelFrom} to ${labelTo}` :
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
                        <InputAmound
                            setChoice={setChoiceFrom}
                            setLabel={setLabelFrom}
                            amount={amountFrom!}
                            setAmound={setAmountFrom}
                            name={'from'}
                        />
                    </div>

                    <div className='flex flex-col my-4'>
                        <span className='text-3xl font-serif font-medium mb-5 mt-1'>
                            To Currency
                        </span>
                        <InputAmound
                            setChoice={setChoiceTo}
                            setLabel={setLabelTo}
                            amount={amountTo!}
                            setAmound={setAmountTo}
                            name={'to'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Converter