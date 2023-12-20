import React from 'react'

import TextArea from '../Components/TextArea'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import Dummy from '../Components/Dummy'
import { MainContextProvider } from '../Context/MainContext'

const Layout = () => {
    return (
        <div className=' h-screen overflow-hidden bg-white dark:bg-slate-800 text-slate-900 dark:text-white'>
            <MainContextProvider>
            <Navbar />
            {/* <Sidebar /> */}
                <TextArea />
                {/* <Dummy /> */}
            </MainContextProvider>
        </div>
    )
}

export default Layout
