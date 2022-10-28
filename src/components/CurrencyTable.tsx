import { isValidDateValue } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState } from 'react'
import { fetchFromAPI } from '../utils/fetchFromAPI';

interface IProps {
    choiceFrom: string,
    choiceTo: string,
    labelFrom: string,
    labelTo: string,
    flagFrom: string,
    flagTo: string,
    defaultValFrom: string,
    defaultValTo: string
}

const defaultData = [
    { value: 1 }, { value: 5 }, { value: 10 },
    { value: 25 }, { value: 50 }, { value: 100 },
    { value: 500 }, { value: 1000 }, { value: 5000 },
    { value: 10000 }, { value: 50000 }
];

function CurrencyTable({ choiceFrom, choiceTo, labelFrom, labelTo, flagFrom,
    flagTo, defaultValFrom, defaultValTo }
    : IProps) {

    const [currenciesValues, setCurrenciesValues] = useState<number[]>([])

    useEffect(() => {
        getCurrenciesValues();
    }, [choiceFrom, choiceTo])

    async function getCurrenciesValues() {
        const promise = await Promise.all(defaultData.map(async (number) => {
            const { result } = await fetchFromAPI(`convert?from=${choiceFrom == undefined
                ? defaultValFrom : choiceFrom}&to=${choiceTo == undefined ?
                    defaultValTo : choiceTo}&amount=${number.value}`);
            return result.toLocaleString('en-US');
        })) as number[]
        setCurrenciesValues(promise);
    }

    const countryFlagFrom = flagFrom.slice(0, 2).toLocaleLowerCase();
    const countryFlagTo = flagTo.slice(0, 2).toLocaleLowerCase();


    return (
        <>
            <div className='w-full bg-zinc-50 mt-10 p-3 border-0 rounded-xl 
            shadow-2xl sm:mt-15 sm:p-6 md:p-8 md:mt-20'>

                <p className='text-xl font-bold mb-5 sm:text-2xl'>
                    {`Convert ${labelFrom == undefined ? defaultValFrom :
                        labelFrom} to ${labelTo == undefined ?
                            defaultValTo : labelTo}`}
                </p>

                <div className='flex flex-row justify-around'>

                    <div className='flex flex-col items-center mr-4'>
                        <div className='flex w-full text-md font-semibold	
                        border-b-2 border-gray-400 pb-2 items-center 
                        justify-start sm:text-xl'>
                            <span className={`fi fi-${countryFlagFrom === 'un' ?
                                defaultValFrom.slice(0, 2).toLowerCase() :
                                countryFlagFrom} mr-2`} />

                            <span>
                                {choiceFrom == undefined ? defaultValFrom :
                                    choiceFrom} </span>
                        </div>

                        <div className='flex flex-col items-start'>
                            {defaultData.map((values, index) => {
                                return (
                                    <span key={index} className="text-md 
                                font-medium pb-2 text-sky-700 sm:text-lg">
                                        {` ${values.value} ${choiceFrom ==
                                            undefined ? defaultValFrom :
                                            choiceFrom} >`}
                                    </span>
                                )
                            })
                            }
                        </div>
                    </div>

                    <div className='flex flex-col items-center'>

                        <div className='flex w-full text-md font-semibold	
                        border-b-2 border-gray-400 pb-2 items-center 
                        justify-start sm:text-xl'>
                            <span className={`fi fi-${countryFlagTo === 'un' ?
                                defaultValTo.slice(0, 2).toLowerCase() :
                                countryFlagTo} mr-2`} />

                            <span>
                                {choiceTo == undefined ? defaultValTo :
                                    choiceTo} </span>
                        </div>

                        <div className='flex flex-col items-start'>
                            {currenciesValues.map((values, index) => {
                                return (
                                    <span key={index} className="text-md 
                                font-medium	pb-2 sm:text-lg">
                                        {values} {choiceTo == undefined ?
                                            defaultValTo : choiceTo}
                                    </span>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default CurrencyTable