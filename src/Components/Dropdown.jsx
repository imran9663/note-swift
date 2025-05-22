import { RichUtils } from 'draft-js';
import { Constants } from "../utils/constants";

export default function Dropdown ({ editorState, setEditorState, }) {
    const handleHeadingClick = (e) => {
        const { value } = e.target
        const newState = RichUtils.toggleBlockType(editorState, value);
        setEditorState(newState);
    };
    return (
        <div className="relative inline-block text-left border-0 ">
            <select onChange={handleHeadingClick} className=" w-12 md:w-auto justify-center overflow-x-auto md:overflow-hidden  shadow-sm ring-0  rounded-md py-1 px-1 md:px-3  md:text-sm font-semibold
             dark:bg-slate-800 dark:text-slate-200  dark:hover:bg-slate-600
              text-gray-950   hover:bg-slate-300
            after:content-['*'] after:ml-0.5 text-[6px] ">
                <option value={Constants.h1} className='appearance-none dark:text-slate-200 hover:bg-slate-300 px-4 py-2 dark:bg-slate-800  min-w-5 text-4xl dark:hover:bg-slate-600 dark:hover:text-slate-100 ' >H1 Heading...</option>
                <option value={Constants.h2} className='appearance-none dark:text-slate-200 hover:bg-slate-300 px-4 py-2 dark:bg-slate-800  min-w-5 text-3xl dark:hover:bg-slate-600 dark:hover:text-slate-100 ' > H2 Heading...</option>
                <option value={Constants.h3} className='appearance-none dark:text-slate-200 hover:bg-slate-300 px-4 py-2 dark:bg-slate-800  min-w-5 text-2xl dark:hover:bg-slate-600 dark:hover:text-slate-100 ' > H3 Heading...</option>
                <option value={Constants.h4} className='appearance-none dark:text-slate-200 hover:bg-slate-300 px-4 py-2 dark:bg-slate-800  min-w-5 text-xl dark:hover:bg-slate-600 dark:hover:text-slate-100 ' > H4 Heading...</option>
                <option value={Constants.h5} className='appearance-none dark:text-slate-200 hover:bg-slate-300 px-4 py-2 dark:bg-slate-800  min-w-5 text-md dark:hover:bg-slate-600 dark:hover:text-slate-100 ' > H5 Heading...</option>
                <option value={Constants.h6} className='appearance-none dark:text-slate-200 hover:bg-slate-300 px-4 py-2 dark:bg-slate-800  min-w-5 text-sm dark:hover:bg-slate-600 dark:hover:text-slate-100 ' > H6 Heading...</option>
                <option value={Constants.normal} selected className='dark:text-slate-200  px-4 py-2 dark:bg-slate-800  min-w-5 text-sm dark:hover:bg-slate-600 dark:hover:text-slate-100 ' > N Normal...</option>
            </select>
        </div>

    )
}
