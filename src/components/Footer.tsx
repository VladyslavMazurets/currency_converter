import React from 'react'
import { BsInstagram, BsFacebook, BsTelegram } from 'react-icons/bs';

function Footer() {
    return (
        <div className='w-full bg-sky-700 mx-auto py-5'>
            <div className='flex flex-col text-center items-center 
            justify-around text-xl text-amber-200 font-semibold sm:flex-row'>
                <div className='mb-6 sm:mb-0'>
                    © 2022 Created by Vladyslav Mazurets
                </div>

                <div>
                    <span className='p-2 border-b-2 border-amber-200'>
                        Follow Me
                    </span>
                    <div className='flex justify-between mt-6 font-bold 
                    text-2xl text-amber-100'>
                        <BsInstagram aria-label='instagram.com' onClick={() =>
                            window.open('https://www.instagram.com/what_is_1ove/')} />
                        <BsFacebook aria-label='facebook.com' onClick={() =>
                            window.open('https://www.facebook.com/profile.php?id=100009904380563')} />
                        <BsTelegram aria-label='telegram.com' onClick={() =>
                            window.open('https://t.me/Shaman_K1ng')} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer