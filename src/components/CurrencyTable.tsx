import { isValidDateValue } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState } from 'react'
import { fetchFromAPI } from '../utils/fetchFromAPI';

interface IProps {
    choiceFrom: string,
    choiceTo: string,
    labelFrom: string,
    labelTo: string
}

const defaultData = [
    { value: 1 }, { value: 5 }, { value: 10 },
    { value: 25 }, { value: 50 }, { value: 100 },
    { value: 500 }, { value: 1000 }, { value: 5000 },
    { value: 10000 }, { value: 50000 }];

function CurrencyTable({ choiceFrom, choiceTo, labelFrom, labelTo }
    : IProps) {

    const [currenciesValues, setCurrenciesValues] = useState<any[]>([])

    useEffect(() => {
        getCurrenciesValues();
    }, [choiceFrom, choiceTo])

    async function getCurrenciesValues() {
        const promise = await Promise.all(defaultData.map(async (number) => {
            const { result } = await fetchFromAPI(`convert?from=${choiceFrom}&to=${choiceTo}&amount=${number.value}`);
            return result
        }))
        setCurrenciesValues(promise);
    }

    return (
        <>
            <div className='bg-white mt-20 p-10 border-0 rounded-xl 
            shadow-2xl'>
                <p className='text-2xl font-bold'>
                    {`Convert ${labelFrom} to ${labelTo}`}
                </p>

                <div className='flex flex-row justify-between mt-2'>
                    <p className='w-full text-xl font-semibold	
                        border-b-2 pb-2'>
                        {choiceFrom}
                    </p>
                    <p className='w-full text-xl font-semibold	
                        border-b-2 pb-2'>
                        {choiceTo}
                    </p>
                </div>

                <div className='flex flex-row justify-around'>

                    <div className='flex flex-col items-start'>
                        {defaultData.map((values, index) => {
                            return (
                                <span key={index} className="text-xl 
                                font-medium pb-2">
                                    {values.value} {choiceFrom}
                                </span>
                            )
                        })
                        }
                    </div>

                    <div className='flex flex-col items-start'>
                        {currenciesValues.map((values, index) => {
                            return (
                                <span key={index} className="w-48 text-xl 
                                font-medium	pb-2">
                                    {values} {choiceTo}
                                </span>
                            )
                        })
                        }
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default CurrencyTable