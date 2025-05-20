import React, { useState } from 'react'
import { Icons } from '../assets/icons'
import supportLang from '../utils/languages.json'
const DropdownWithSearch = (props) => {
  const [search, setSearch] = useState('');
  const [selectedCode, setSelectedCode] = useState('eng');
  const [placeholder, setPlaceholder] = useState('English');
  const[showDd,setShowDd]=useState(false)
  const handleChange = (e) => {
    const { value, id } = e.target;
    setSearch(value)
  }
  const handleOptionClick = (item) => {
    setSearch('')
    setPlaceholder(()=>item.language)
    setSelectedCode(() => item.code)
    props.setSelectedLng(item.code)
    setShowDd(false)
  }
  return (
    <>
      <div style={{width:'fit-content'}} className="relative top-0 left-0  flex flex-col">
        <div className="flex h-10 border border-b-2 border-slate-500 items-center max-w-sm mx-auto 
          dark:border-slate-700 text-sm dark:placeholder:text-slate-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-1 pointer-events-none">
              <Icons.Code className='text-slate-500' />
            </div>
            <input onChange={handleChange} type="text" id="simple-search" className="dark:bg-transparent
             bg-transparent border border-none
              text-gray-900 dark:text-white text-sm rounded-lg block w-full ps-10 px-1.5 focus:outline-0 focus:border-none " placeholder={placeholder} />
          </div>
          <button onClick={()=>setShowDd(!showDd)} type="submit" className="p-1.5 ms-2 text-sm font-medium
          text-white bg-gradient-to-r from-cyan-400 via-cyan-500
                           to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
                          focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg 
                         text-center ">
            <Icons.Chevaron />
            <span className="sr-only">Search</span>
          </button>
        </div>
        {showDd &&<div style={{ maxHeight: '30vh', overflow: 'hidden', overflowY: 'auto' }} id="dropdown" className="w-full rounded-b-lg z-10 absolute top-10 left-0 bg-white divide-y divide-gray-100  shadow-sm  dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">

            {supportLang.filter((lang) => {
              if (search !== '') {
                return String(lang.language).toLowerCase().includes(search.toLowerCase())
              } else {
                return lang
              }
            }).map(item =>
              <li>
                <button
                  onClick={() => handleOptionClick(item)}
                  //text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 
                  type="button" value={item.code} className={`inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-start ${selectedCode === item.code ? 'text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 ':''}`}>{item.language}</button>
              </li>)}

          </ul>
        </div>}

        </div>
    </>
  )
}

export default DropdownWithSearch