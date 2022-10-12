import React, { useState, useEffect } from 'react'
import Select from 'react-select'

import { fetchFromAPI } from '../utils/fetchFromAPI';

interface IValuta {
    value: string,
    label: string
}

interface Props {
    amount: number,
    setChoice: (val: string) => void,
    setLabel: (val: string) => void,
    setAmound: (val: number) => void
    name: string
}
function InputAmound({ amount, setChoice, setLabel,
    setAmound, name }: Props) {

    const [allCurrencies, setAllCurrencies] = useState<string[]>([]);

    const objectKeys: string[] = Object.keys(allCurrencies);
    const objectValues: any = Object.values(allCurrencies);

    var options: IValuta[] = [];

    useEffect(() => {
        fetchFromAPI('symbols')
            .then((data) => setAllCurrencies(Object.values(data.symbols)));
    }, []);

    for (let i = 0; i < objectKeys.length; i++) {

        var valuta = {
            value: objectValues[i].code,
            label: objectValues[i].description
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
                            bg-gray-100 text-2xl focus:outline-none 
                            focus:bg-gray-200'
                type="text"
                min="0" max="100000"
                step="0.25"
                name={name}
                value={amount === undefined ? '' : amount}
                onChange={(e) =>
                    setAmound(e.target.value.replace(/[^0-9.]/g, '') as any)} />
        </>
    )
}

export default InputAmound