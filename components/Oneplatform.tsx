import React from 'react'

const Oneplatform = () => {
    return (
        <div className='px-[3%] flex lg:flex-row flex-col justify-between gap-10 text-white border-b border-[#4B4B4B] py-20'>
            <div className='flex flex-col gap-1'>
                <h1 className='lg:text-[34px] text-3xl leading-none'>One Platform.</h1>
                <h1 className='lg:text-6xl text-3xl  leading-none'>Every Interaction</h1>
            </div>
            <div className='flex items-center max-w-2xl'>
                <p className='text-sm lg:text-[22px] md:text-left text-right'>
                    Whether it&apos;s booking an appointment, sharing a lab report, calling after hours, or requesting urgent care, Norma connects the right people and workflows instantly. One intelligent AI remembers every interaction and keeps your clinic running smoothly.
                </p>
            </div>
        </div>
    )
}

export default Oneplatform