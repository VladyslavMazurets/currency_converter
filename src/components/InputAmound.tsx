import React, { useState, useEffect } from 'react'
import Select from 'react-select'

import { fetchFromAPI } from '../utils/fetchFromAPI';

interface IValuta {
    value: string,
    label: string
}

interface Props {
    amound: string,
    setChoice: (val: string) => void,
    setLabel: (val: string) => void,
    setAmound: (val: string) => void
    name: string
}
function InputAmound({ amound, setChoice, setLabel,
    setAmound, name }: Props) {

    const [allCurrencies, setAllCurrencies] = useState<Array<string>>([]);


    const objectKeys: string[] = Object.keys(allCurrencies);
    const objectValues: string[] = Object.values(allCurrencies);

    var options: IValuta[] = [];

    useEffect(() => {
        fetchFromAPI('currencies?api_key=1509376c38-f3a5c6ecea-rj6v8z')
            .then((data) => setAllCurrencies(data.currencies));
    }, []);

    for (let i = 0; i < objectKeys.length; i++) {

        var valuta = {
            value: objectKeys[i],
            label: objectValues[i]
        } as IValuta;

        options.push(valuta);
    };

    return (
        <>
            <Select className='mb-3 text-xl'
                placeholder='Select currency'
                options={options}
                onChange={(e) => {
                    setChoice(e?.value!);
                    setLabel(e?.label!);
                }}
            />
            <input placeholder='Amount'
                className='mb-5 border-b-4 py-4 px-5
                            border-b-stone-700 focus:border-b-lime-600 
                            bg-gray-100 text-2xl focus:outline-none focus:bg-gray-200'
                type="text"
                name={name}
                value={parseFloat(amound)}
                onChange={(e) =>
                    setAmound(e.target.value.replace(/[^0-9.]/g, ''))} />
        </>
    )
}

export default InputAmound