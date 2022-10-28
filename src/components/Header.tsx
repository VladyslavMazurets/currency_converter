import React, { useEffect, useState } from 'react'
import { fetchFromAPI } from '../utils/fetchFromAPI';

function Header() {

    const [currencyEUR, setCurrencyEUR] = useState<number>();
    const [currencyUSD, setCurrencyUSD] = useState<number>();
    const [currencyGBP, setCurrencyGBP] = useState<number>();


    useEffect(() => {
        fetchFromAPI(`convert?from=EUR&to=UAH&amount=1`)
            .then((data) => setCurrencyEUR(data.info.rate));

        fetchFromAPI(`convert?from=USD&to=UAH&amount=1`)
            .then((data) => setCurrencyUSD(data.info.rate));

        fetchFromAPI(`convert?from=GBP&to=UAH&amount=1`)
            .then((data) => setCurrencyGBP(data.info.rate));
    }, []);

    return (
        <>
            <nav className="relative flex flex-wrap justify-center px-2 
            py-6 bg-sky-700	shadow-2xl">
                <div className="flex flex-col items-center sm:container 
                sm:mx-auto sm:flex-wrap lg:flex-row lg:justify-between">
                    <div className='font-bold text-3xl text-amber-200 
                    mb-6  lg:text-4xl'>
                        Currency Converter
                    </div>

                    <div className='flex flex-col sm:flex-row'>

                        <div className='flex flex-row mb-2 text-lg 
                        text-amber-200 sm:mb-0 sm:text-xl'>
                            <span className='fi fi-eu mr-2' />
                            <span
                                className='font-semibold font-mono sm:mr-4'>
                                EUR {currencyEUR?.toFixed(2)} ₴
                            </span>
                        </div>

                        <div className='flex flex-row mb-2 text-lg 
                        text-amber-200 sm:mb-0 sm:text-xl'>
                            <span className='fi fi-us mr-2' /> <span
                                className='font-semibold font-mono sm:mr-4'>
                                USD {currencyUSD?.toFixed(2)} ₴
                            </span>
                        </div>

                        <div className='flex flex-row mb-2 text-lg 
                        text-amber-200 sm:mb-0 sm:text-xl'>
                            <span className='fi fi-gb mr-2' /> <span
                                className='font-semibold font-mono'>
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