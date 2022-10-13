import React, { useEffect } from 'react'
import { fetchFromAPI } from '../utils/fetchFromAPI';

interface IProps {
    choiceFrom: string,
    choiceTo: string,
    labelFrom: string,
    labelTo: string
}

const defaultData = [
    { id: 1, value: '1' }, { id: 2, value: '5' }, { id: 3, value: '10' },
    { id: 4, value: '25' }, { id: 5, value: '50' }, { id: 6, value: '100' },
    { id: 7, value: '500' }, { id: 8, value: '1000' }, { id: 9, value: '5000' },
    { id: 10, value: '10000' }, { id: 11, value: '50000' }];

function CurrencyTable({ choiceFrom, choiceTo, labelFrom, labelTo }
    : IProps) {

    var dataFrom: string[] = [];

    async function fetchData() {

        let idObj = 1;

        defaultData.map(async (number) => {
           if(number.id == idObj) { await (
                fetchFromAPI(`convert?from=${choiceFrom}&to=${choiceTo}&amount=${number.value}`)
                    .then((data) => dataFrom.push(data.result.toString())),
                    idObj++
            )}
            return null
        })
    }

    useEffect(() => {
        fetchData();
        console.log(dataFrom);
    }, [choiceFrom, choiceTo])


    return (
        <>
            <div className='bg-white mt-20 p-10 border-0 rounded-xl shadow-2xl'>
                <p className='text-2xl font-medium'>
                    {`Convert ${labelFrom} to ${labelTo}`}
                </p>

                <div className='flex justify-around'>
                    <p className='w-full text-xl 
                    font-medium border-b-2 pb-2'>
                        {choiceFrom} {choiceTo}
                    </p>
                </div>

                <div>

                </div>
            </div>
        </>
    )
}

export default CurrencyTable