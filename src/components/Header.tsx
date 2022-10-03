import React, { useEffect, useState } from 'react'
import { fetchFromAPI } from '../utils/fetchFromAPI';

function Header() {

    const [currencyEUR, setCurrencyEUR] = useState<number>();
    const [currencyUSD, setCurrencyUSD] = useState<number>();
    const [currencyGBP, setCurrencyGBP] = useState<number>();


    useEffect(() => {
        fetchFromAPI(`fetch-one?from=EUR&to=UAH&api_key=1509376c38-f3a5c6ecea-rj6v8z`)
            .then((data) => setCurrencyEUR(data.result.UAH));

        fetchFromAPI(`fetch-one?from=USD&to=UAH&api_key=1509376c38-f3a5c6ecea-rj6v8z`)
            .then((data) => setCurrencyUSD(data.result.UAH))

        fetchFromAPI(`fetch-one?from=GBP&to=UAH&api_key=1509376c38-f3a5c6ecea-rj6v8z`)
            .then((data) => setCurrencyGBP(data.result.UAH))

    }, []);

    return (
        <>
            <nav className="relative flex flex-wrap justify-between px-2 py-6 bg-emerald-500 ">
                <div className='container mx-auto flex flex-wrap items-center justify-between'>
                    <div className='font-bold font-medium text-4xl'>
                        Currency Converter
                    </div>

                    <div className=' flex gap-5'>
                        <div className=''>
                            <span className='fi fi-eu' /> <span className='font-semibold font-mono text-xl'>
                                EUR {currencyEUR?.toFixed(2)} ₴
                            </span>
                        </div>
                        <div className=''>
                            <span className='fi fi-us' /> <span className='font-semibold font-mono text-xl'>
                                USD {currencyUSD?.toFixed(2)} ₴
                            </span> 
                        </div>
                        <div className=''>
                            <span className='fi fi-gb' /> <span className='font-semibold font-mono text-xl'>
                                GBP {currencyGBP?.toFixed(2)} ₴
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header