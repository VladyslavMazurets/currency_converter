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
}

function InputAmound({ amount, setChoice, setLabel,
    setAmount, name, flag, defaultValFrom }: Props) {

    const [allCurrencies, setAllCurrencies] = useState<string[]>([]);
    
    const objectKeys: string[] = Object.keys(allCurrencies);
    const objectValues: any = Object.values(allCurrencies);
    
    var options: IValuta[] = [];
    const countryFlag = flag.slice(0, 2).toLocaleLowerCase();

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
            <div className='flex flex-col items-center'>
                <Select className='mb-3 text-xs w-3/4 sm:text-xl sm:w-full'
                    placeholder='Select currency'
                    options={options}
                    onChange={(e) => {
                        setChoice(e?.value!);
                        setLabel(e?.label!);
                    }}
                />
                <div className='w-full flex items-center justify-center px-4'>

                    <span className={`fi fi-${countryFlag === 'un' ?
                        defaultValFrom.slice(0, 2).toLowerCase() :
                        countryFlag} text-xl mr-2 mb-5 sm:text-3xl`} />

                    <span className='text-2xl mb-7 mr-2'> - </span>

                    <input placeholder={`Amount ${name}`}
                        className='w-3/4 mb-5 border-b-4 py-4 px-5
                            border-b-stone-700 focus:border-b-green-400 
                            bg-gray-50 text-sm sm:text-2xl sm:w-full 
                            focus:outline-none focus:bg-gray-200'
                        type="text"
                        name={name}
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value.replace(/[^0-9.]/g, '') as any)

                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default InputAmound