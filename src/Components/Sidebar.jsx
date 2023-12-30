import React from 'react'
import '../Styles/main.css';
import { Icons } from '../assets/icons';
const Sidebar = () => {
    return (
        <>
            <div
                className=" w-10 flex flex-row flex-wrap border-r justify-start items-start pl-2 py-1 border-slate-200 bg-slate-800">

                <button

                    // onClick={() => handleClick('BOLD')} 
                    className={`border-1 rounded-sm border-slate-200 p-2 
                 `}
                >
                    <Icons.Bold fill='#e2e8f0' />
                </button>

                <button
                    //  onClick={() => handleClick(Constants.italic)} 
                    className={`border-1  rounded-sm border-slate-200 p-2 
                 `}
                >
                    <Icons.Itaclic fill='#e2e8f0' />
                </button>
                <button
                    //  onClick={() => handleClick(Constants.underline)} 
                    className={`border-1  rounded-sm border-slate-200 p-2 
                 `}
                >
                    <Icons.Underline fill='#e2e8f0' />
                </button>
                <button
                    //  onClick={() => handleClick(Constants.strikethrough)} 
                    className={`border-1  rounded-sm border-slate-200 p-2 
                 `}
                >
                    <Icons.Strike fill='#e2e8f0' />
                </button>
                {/* <button
                 onClick={() => handleClick(Constants.code)} 
                 className={`border-1  rounded-sm border-slate-200 p-2 
                 ${isActiveStyle(Constants.strikethrough) ? 'bg-slate-600' : ''}`}
                 >
                    
                    C
                </button> */}
                <button
                    //  onClick={() => toggleBlockType(Constants.OL)} 
                    className={`border-1 border-slate-200 p-2 
                 `}
                >
                    <Icons.OrderdList fill='#e2e8f0' />
                </button>
                <button
                    //  onClick={() => toggleBlockType(Constants.UL)} 
                    className={`border-1 border-slate-200 p-2 
                 `}
                >
                    <Icons.UnOrderdList fill='#e2e8f0' />
                </button>
                {/* < Dropdown
                    handleSelect={handleSelect}
                /> */}
                {/* <div>
                    {headingStyles.map((level) => (
                        <button
                         key={level} 
                         className={`border-1 border-slate-200 p-2 `} onClick={() => applyBlockType(`header-
                         ${level}`)}
                         >
                            H{level}
                        </button>
                    ))}
                </div> */}
                <button
                    //  onClick={() => handleUndo()} 
                    className={`border-1 border-slate-200 p-2 
                 `}
                >
                    <Icons.RotateLeft fill='#e2e8f0' />

                </button>
                <button
                    //  onClick={() => handleRedo()} 
                    className={`border-1 border-slate-200 p-2 
                 `}
                >
                    <Icons.RotateRight fill='#e2e8f0' />
                </button>
            </div>
        </>
    )
}

export default Sidebar