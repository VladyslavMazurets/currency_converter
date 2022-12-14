import React, { useEffect, useState } from 'react'

import { RiExchangeLine } from 'react-icons/ri';

import { fetchFromAPI } from '../utils/fetchFromAPI';
import CurrencyTable from './CurrencyTable';
import InputAmount from './InputAmount';
import Loader from './Loader';

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
        const { query: { from, to } } = await fetchFromAPI(`convert?from=${choiceFrom}&to=${choiceTo}&amount=100`)
        setFlagFrom(from);
        setFlagTo(to);
    };

    const convertFromTo = async () => {
        if (amountFrom.length !== 0) {
            const { result } = await fetchFromAPI(`convert?from=${choiceFrom}&to=${choiceTo}&amount=${amountFrom}`)
            setAmountTo(result.toString());
        } else {
            setAmountFrom('');
            setAmountTo('');
        }
    };

    const convertToFrom = async () => {
        if (amountTo.length !== 0) {
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
        convertToFrom();
    }, [choiceTo, amountTo]);

    useEffect(() => {
        convertFromTo();
    }, [choiceFrom, amountFrom]);

    function flipCurrencies(): void {
        var temp = choiceFrom;
        var label = labelFrom;
        setLabelFrom(labelTo);
        setLabelTo(label);
        setChoiceFrom(choiceTo);
        setChoiceTo(temp);
    }

    return (
        <div className='w-full h-full flex flex-col text-center 
        items-center justify-center bg-gray-100 py-24'>
            <div className='flex flex-col justify-center px-2 mb-4'>
                <b className='text-3xl font-sans font-semibold pb-2 
                sm:text-4xl sm:font-bold'>
                    {choiceFrom && choiceTo && amountFrom !== undefined || null ?
                        `${amountFrom} ${choiceFrom} to ${choiceTo} 
                        - Convert ${labelFrom} to ${labelTo}` :
                        `EUR to UAH - Convert Euros to Ukrainian Hryvni`
                    }
                </b>
                <p className='text-2xl font-sans font-medium sm:text-3xl 
                sm:font-semibold'>
                    Currency Converter
                </p>
            </div>

            <div className='w-3/4 bg-zinc-50 shadow-2xl my-6 p-6 lg:w-max'>
                <div className='flex flex-col items-center justify-around 
                lg:flex-row'>

                    <div className='flex flex-col my-2 lg:px-6'>
                        <span className='text-xl font-serif font-semibold
                         mb-5 mt-1 sm:text-2xl'>
                            From Currency
                        </span>
                        <InputAmount
                            setChoice={setChoiceFrom}
                            setLabel={setLabelFrom}
                            amount={amountFrom!}
                            setAmount={setAmountFrom}
                            flag={flagFrom}
                            defaultValFrom={defaultFrom}
                            name={'From'}
                        />
                    </div>

                    <div className='text-4xl rotate-90 text-sky-800 
                    cursor-pointer hover:text-sky-500 
                    active:text-green-400 sm:text-5xl lg:rotate-180'>
                        <RiExchangeLine onClick={() => flipCurrencies()} />
                    </div>

                    <div className='flex flex-col my-2 lg:px-6'>
                        <span className='text-xl font-serif font-semibold 
                        mb-5 mt-1 sm:text-2xl'>
                            To Currency
                        </span>
                        <InputAmount
                            setChoice={setChoiceTo}
                            setLabel={setLabelTo}
                            amount={amountTo!}
                            setAmount={setAmountTo}
                            flag={flagTo}
                            defaultValFrom={defaultTo}
                            name={'To'}
                        />
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-center mx-4 lg:flex-row 
            lg:gap-20 sm:mx-0'>

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