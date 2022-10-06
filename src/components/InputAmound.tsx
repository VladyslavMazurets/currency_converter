import React from 'react'
import Select from 'react-select'

interface IValuta {
    value: string,
    label: string
}

interface Props {
    allCurrencies: string[],
    amound: string | string[],
    setChoice: (val: string) => void,
    setLabel: (val: string) => void,
    setAmound: (val: string) => void
    choiceCurrencies: string
    name: string
}
function InputAmound({ allCurrencies, amound, setChoice, setLabel,
    setAmound, choiceCurrencies, name }: Props) {

    const objectKeys: string[] = Object.keys(allCurrencies);
    const objectValues: string[] = Object.values(allCurrencies);

    var options: IValuta[] = [];

    for (let i = 0; i < objectKeys.length; i++) {

        var valuta = {
            value: objectKeys[i],
            label: objectValues[i]
        } as IValuta;

        options.push(valuta);
    }

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
                value={amound}
                onChange={(e) => 
                    setAmound(e.target.value.replace(/[^0-9.]/g, ''))} />
        </>
    )
}

export default InputAmound