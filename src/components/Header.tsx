import React, { useEffect, useState } from 'react'
import { fetchFromAPI } from '../utils/fetchFromAPI';

function Header() {

    const [currencyEUR, setCurrencyEUR] = useState<number>();
    const [currencyUSD, setCurrencyUSD] = useState<number>();
    const [currencyGBP, setCurrencyGBP] = useState<number>();


    useEffect(() => {
        fetchFromAPI(`convert?from=EUR&to=UAH&amount=1`)
            .then((data) => setCurrencyEUR(data.info.rate));

        console.log(currencyEUR);

        fetchFromAPI(`convert?from=USD&to=UAH&amount=1`)
            .then((data) => setCurrencyUSD(data.info.rate))

        fetchFromAPI(`convert?from=GBP&to=UAH&amount=1`)
            .then((data) => setCurrencyGBP(data.info.rate))

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