import React, { useState, useEffect } from 'react'
import Select from 'react-select'

import { fetchFromAPI } from '../utils/fetchFromAPI';

interface IValuta {
    value: string,
    label: string,
}

interface Props {
    amount: string,
    setChoice: (val: string) => void,
    setLabel: (val: string) => void,
    setAmount: (val: string) => void
    name: string,
    flag: string,
    defaultValFrom: string,
    defaultValTo: string
}

function InputAmound({ amount, setChoice, setLabel,
    setAmount, name, flag, defaultValFrom, defaultValTo }: Props) {

    const [allCurrencies, setAllCurrencies] = useState<string[]>([]);
    const countryFlag = flag.slice(0, 2).toLocaleLowerCase();

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
            <div className='flex items-center justify-center'>

                <span className={`fi fi-${countryFlag === 'un' ?
                    defaultValFrom.slice(0, 2).toLowerCase() :
                    countryFlag} text-3xl mr-2 mb-5`} />

                <span className='text-4xl mb-7 mr-2'> - </span>

                <input placeholder={`Amount ${name}`}
                    className='mb-5 border-b-4 py-4 px-5
                            border-b-stone-700 focus:border-b-green-400 
                            bg-gray-50 text-2xl focus:outline-none 
                            focus:bg-gray-200'
                    type="text"
                    name={name}
                    value={amount}
                    onChange={(e) =>
                        setAmount(e.target.value.replace(/[^0-9.]/g, '') as any)}
                />
            </div>
        </>
    )
}

export default InputAmound