import React, { useEffect, useState } from 'react'

import { fetchFromAPI } from '../utils/fetchFromAPI';
import CurrencyTable from './CurrencyTable';
import InputAmount from './InputAmount';

function Converter() {
    const [amountFrom, setAmountFrom] = useState<string>('');
    const [amountTo, setAmountTo] = useState<string>('');

    const [flagFrom, setFlagFrom] = useState<string>('');
    const [flagTo, setFlagTo] = useState<string>('');

    const [choiceFrom, setChoiceFrom] = useState<string>();
    const [choiceTo, setChoiceTo] = useState<string>();
    const [labelFrom, setLabelFrom] = useState<string>();
    const [labelTo, setLabelTo] = useState<string>();

    const defaultFrom = 'EUR';
    const defaultTo = 'UAH';

    const countryFlags = async () => {
        const { query } = await fetchFromAPI(`convert?from=${choiceFrom}&to=${choiceTo}&amount=100`)
        setFlagFrom(query.from);
        setFlagTo(query.to);
    };

    const convertFromTo = async () => {
        if (amountFrom.trim().length !== 0) {
            const { result } = await fetchFromAPI(`convert?from=${choiceFrom}&to=${choiceTo}&amount=${amountFrom}`)
            setAmountTo(result.toString());
        } else {
            setAmountFrom('');
            setAmountTo('');
        }
    };

    const convertToFrom = async () => {
        if (amountTo.trim().length !== 0) {
            const { result } = await fetchFromAPI(`convert?from=${choiceTo}&to=${choiceFrom}&amount=${amountTo}`)
            setAmountFrom(result.toString());
        } else {
            setAmountFrom('');
            setAmountTo('');
        }
    };

    useEffect(() => {
        countryFlags();
    }, [choiceFrom, choiceTo]);

    useEffect(() => {
        convertFromTo();
    }, [choiceFrom, amountFrom]);

    useEffect(() => {
        convertToFrom();
    }, [choiceTo, amountTo]);

    return (
        <div className='w-full h-full flex flex-col text-center 
        items-center justify-center bg-emerald-200 py-24'>
            <div className='flex flex-col justify-center mb-6'>
                <b className='text-4xl font-sans pt-5 pb-2'>
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

            <div className='w-1/2 bg-cyan-50 shadow-2xl my-6'>
                <div className='flex text-center items-center 
                justify-around'>

                    <div className='flex flex-col my-4'>
                        <span className='text-3xl font-serif font-semibold
                         mb-5 mt-1'>
                            From Currency
                        </span>
                        <InputAmount
                            setChoice={setChoiceFrom}
                            setLabel={setLabelFrom}
                            amount={amountFrom!}
                            setAmount={setAmountFrom}
                            flag={flagFrom}
                            defaultValFrom={defaultFrom}
                            defaultValTo={defaultTo}
                            name={'From'}
                        />
                    </div>

                    <div className='flex flex-col my-4'>
                        <span className='text-3xl font-serif font-semibold 
                        mb-5 mt-1'>
                            To Currency
                        </span>
                        <InputAmount
                            setChoice={setChoiceTo}
                            setLabel={setLabelTo}
                            amount={amountTo!}
                            setAmount={setAmountTo}
                            flag={flagTo}
                            defaultValFrom={defaultTo}
                            defaultValTo={defaultFrom}
                            name={'To'}
                        />
                    </div>
                </div>
            </div>

            <div className='flex flex-row items-center gap-20'>

                <CurrencyTable
                    choiceFrom={choiceFrom!}
                    choiceTo={choiceTo!}
                    labelFrom={labelFrom!}
                    labelTo={labelTo!}
                    flagFrom={flagFrom}
                    flagTo={flagTo}
                    defaultValFrom={defaultFrom}
                    defaultValTo={defaultTo}
                />

                <CurrencyTable
                    choiceFrom={choiceTo!}
                    choiceTo={choiceFrom!}
                    labelFrom={labelTo!}
                    labelTo={labelFrom!}
                    flagFrom={flagTo}
                    flagTo={flagFrom}
                    defaultValFrom={defaultTo}
                    defaultValTo={defaultFrom}
                />

            </div>

        </div>
    )
}

export default Converter