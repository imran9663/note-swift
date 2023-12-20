import React from 'react'

import TextArea from '../Components/TextArea'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'

const Layout = () => {
    return (
        <div className=' h-screen overflow-hidden bg-white dark:bg-slate-800 text-slate-900 dark:text-white'>
            <Navbar />
            {/* <Sidebar /> */}
            <TextArea />
        </div>
    )
}

export default Layout
