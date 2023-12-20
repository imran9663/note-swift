import React from 'react'
import logo from '../assets/icons/logo.png'
import { ReactComponent as Bold } from '../assets/icons/Boldsolid.svg'
import { ReactComponent as Itaclic } from '../assets/icons/italic-solid.svg'
import { ReactComponent as OrderdList } from '../assets/icons/list-ol-solid.svg'
import { ReactComponent as UnOrderdList } from '../assets/icons/list-ul-solid.svg'
import { ReactComponent as Underline } from '../assets/icons/underline-solid.svg'
import { ReactComponent as Download } from '../assets/icons/download.svg'
import { ReactComponent as Plus } from '../assets/icons/Plus.svg'
import Dropdown from './Dropdown'

const Navbar = () => {
    return (
        <div className="flex sticky top-0 z-50 justify-between gap-10 items-center px-3 py-2  border-b border-slate-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
            <img src={logo} alt="" className="w-8 h-8 " />
            <div className="input  border-l px-2">
                <input type="text" placeholder='Untitled document' className="text-slate-200   py-2 bg-transparent  border-0 focus-visible:border-0 outline-none border-transparent  active:border-0 outline-none " />
            </div>
            <div className="elements h-100 w-100 flex flex-row justify-between items-center  border-l pl-2 border-slate-200">
                <button className='border-1 border-slate-200 p-2 '>
                    <Bold fill='#e2e8f0' />
                </button>
                <button className='border-1 border-slate-200 p-2 '>
                    <Itaclic fill='#e2e8f0' />
                </button>
                <button className='border-1 border-slate-200 p-2 '>
                    <Underline fill='#e2e8f0' />
                </button>
                <button className='border-1 border-slate-200 p-2 '>
                    <OrderdList fill='#e2e8f0' />
                </button>
                <button className='border-1 border-slate-200 p-2 '>
                    <UnOrderdList fill='#e2e8f0' />
                </button>
                <Dropdown />
            </div>
            <div className=" w-fit flex gap-2 flex-row justify-start items-center border-l px-2 border-slate-200">
                <a href="/" target='_blank' type="button" className="py-1 px-5 text-sm font-medium text-center inline-flex items-center text-slate-200 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    <Plus className='w-4 h-4 me-2' /> New
                </a>
                <button type="button" className="py-1 px-5 text-sm font-medium text-center inline-flex items-center text-slate-200 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    <Download className='w-4 h-4 me-2' /> Download
                </button>
            </div>
        </div>
    )
}

export default Navbar