import { isTemplateElement } from '@babel/types';
import React, { useEffect } from 'react'
import { fetchFromAPI } from '../utils/fetchFromAPI';

interface IProps {
    choiceFrom: string,
    choiceTo: string,
    labelFrom: string,
    labelTo: string
}

type Sorted = {
    value: number;
}

const defaultData = [
    { value: 1 }, { value: 5 }, { value: 10 },
    { value: 25 }, { value: 50 }, { value: 100 },
    { value: 500 }, { value: 1000 }, { value: 5000 },
    { value: 10000 }, { value: 50000 }
];

function CurrencyTable({ choiceFrom, choiceTo, labelFrom, labelTo }
    : IProps) {

    const dataCurrencies: Sorted[] = [];

    async function fetchData() {
        defaultData.map(async (number, index) => {
            const { result } = await fetchFromAPI(`convert?from=${choiceFrom}&to=${choiceTo}&amount=${number.value}`);
            dataCurrencies[index] = { value: result };
        })
    }

    useEffect(() => {
        fetchData();
        console.log(dataCurrencies);
    }, [choiceFrom, choiceTo]
    )

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

                <div className='flex flex-row'>
                    <div className='flex flex-col'>
                        {defaultData.map((values, index) => {
                            return (
                                <span key={index} className="text-xl 
                                font-medium">
                                    {values.value} {choiceFrom}
                                </span>
                            )
                        })
                        }
                    </div>

                    <div className='flex flex-col'>
                        {dataCurrencies.map((props, index) => {
                            return (
                                <span key={index}>
                                    {props.value} {choiceTo}
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