import React, { useEffect, useState } from 'react'
import { categories } from '../utils/doctor_category'
import { motion } from 'framer-motion'
import RowContainer from './RowContainer'
import { useStateValue } from '../context/StateProvider'

const DoctorMenu = () => {

    const [filter, setfilter] = useState('gastric')

    const [{ mediList },
        // dispatch
    ] = useStateValue()

    useEffect(() => { }, [filter])

    return (
        <section className='w-full my-6' id='menu'>
            <div className='flex flex-col items-center justify-center'>
                <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-[#55AAAA] to-[#008080] transition-all ease-in-out duration-100 mr-auto'>
                    Door Step Delivery
                </p>
            </div>
            <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none'>
                {categories && categories.map(cat => (
                    <motion.div whileTap={{ scale: 0.6 }} key={cat.id}
                        className={`group ${filter === cat.urlParamName ? 'bg-[#55aaaa]' : 'bg-card'} w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-lg flex flex-col gap-3 items-center justify-center duration-150 transition-all ease-in-out hover:bg-[#55aaaa]`} onClick={() => setfilter(cat.urlParamName)}>
                        <div className={`h-10 w-10 ${filter === cat.urlParamName ? 'bg-card' : 'bg-[#55aaaa]'} rounded-full group-hover:bg-card flex items-center justify-center`}>
                        {/* @ts-ignore */}
                            <img src={cat.imgUrl} className={`${filter === cat.pack_size
                                ? 'text-textColor'
                                : 'text-card'
                                } group-hover:text-textColor text-lg rounded-full`} />
                        </div>
                        <p className={`${filter === cat.urlParamName ? 'text-card' : 'text-textColor'} text-sm group-hover:text-card`}>{cat.name}</p>
                    </motion.div>
                ))}
            </div>
            <div className='w-full'>
                {/* @ts-ignore */}
                <RowContainer flag={false} data={mediList?.filter(n => n.category === filter)} />

            </div>
        </section>
    )
}

export default DoctorMenu