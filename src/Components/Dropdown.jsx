import { useMainContext } from "../Context/MainContext";
import { Constants } from "../utils/constants";




export default function Dropdown () {
    const { command, setcommand } = useMainContext()
    const handleChange = (e) => {
        setcommand(() => ({ ...command, name: e.target.value }))
    }
    return (
        <div className="relative inline-block text-left border-0 ">
            <select onChange={handleChange} defaultValue={Constants.normal} className=" justify-center  rounded-md bg-slate-800 px-3  py-1 text-sm font-semibold text-slate-200  shadow-sm ring-0 hover:bg-slate-600
            after:content-['*'] after:ml-0.5 after:text-red-500  ">
                <option value={Constants.h1} className='text-slate-200  px-4 py-2 bg-slate-800  min-w-5 text-4xl hover: bg-slate-600 text-slate-100' >H1 Heading...</option>
                <option value={Constants.h2} className='text-slate-200  px-4 py-2 bg-slate-800 min-w-5 text-3xl hover: bg-slate-600 text-slate-100' > H2 Heading...</option>
                <option value={Constants.h3} className='text-slate-200  px-4 py-2 bg-slate-800 min-w-5 text-2xl hover: bg-slate-600 text-slate-100' > H3 Heading...</option>
                <option value={Constants.h4} className='text-slate-200  px-4 py-2 bg-slate-800 min-w-5 text-xl hover: bg-slate-600 text-slate-100' > H4 Heading...</option>
                <option value={Constants.h5} className='text-slate-200  px-4 py-2 bg-slate-800 min-w-5 text-lg hover: bg-slate-600 text-slate-100' > H5 Heading...</option>
                <option value={Constants.h6} className='text-slate-200  px-4 py-2 bg-slate-800 min-w-5 text-base hover: bg-slate-600 text-slate-100' > H6 Heading...</option>
                <option value={Constants.normal} selected className='text-slate-200  px-4 py-2 bg-slate-800 min-w-5 text-sm hover: bg-slate-600 text-slate-100' > N Normal...</option>
            </select>
        </div>

    )
}
