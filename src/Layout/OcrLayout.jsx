import { ContentState, EditorState } from 'draft-js';
import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import OcrSideBar from '../Components/OcrSideBar';
import TextArea from '../Components/TextArea';
import '../Styles/main.css';
import { Icons } from '../assets/icons';
const OcrLayout = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [uploadedFilesForScan, setUploadedFilesForScan] = useState(null);
    const [openMobileSidebar, setOpenMobileSidebar] = useState(false)
    const handleUnload = (event) => {
        event.preventDefault();
        return ''
    }
    const getOCRData = (data) => {
            const contentState = ContentState.createFromText(data.toString());
        const editorStateWithContent = EditorState.createWithContent(contentState);
        setEditorState(editorStateWithContent);
        setOpenMobileSidebar(false)
    }
    useEffect(() => {
        window.addEventListener('beforeunload', (event) => handleUnload(event))
        return () => {
            window.removeEventListener('beforeunload', (event) => handleUnload(event))
        }
    }, [])

    return (
        <>
            <div className=" flex flex-row">
                {/* <Sidebar /> */}
                <div className=' h-screen relative flex flex-col flex-1 overflow-hidden bg-white dark:bg-slate-600 text-slate-900 dark:text-white'>
                    <Navbar editorState={editorState} setEditorState={setEditorState} setUploadedFilesForScan={setUploadedFilesForScan} />
                    <div className="flex flex-row relative">
                        <div className=" hidden md:block  w-full md:w-1/4 ">
                            <OcrSideBar files={uploadedFilesForScan} getOCRData={getOCRData} />
                        </div>
                        <div id="mobile-side-bar" className={`flex flex-row-reverse justify-center items-start md:hidden w-full absolute top-0 left-0  z-50 
                           transform  ${openMobileSidebar ? "translate-x-0" : "translate-x-[-95%]"}
                             `}>
                            <button onClick={() => setOpenMobileSidebar(!openMobileSidebar)} type="button" className="text-white bg-gray-800 hover:bg-gray-900  font-medium rounded-br-lg rounded-tr-lg border-l-0 text-sm px-1.5 py-1.5 border-2 border-cyan-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:ring-slate-700 dark:border-slate-700">
                                <Icons.ChevronRight className='w-4 h-4 stroke-cyan-300' />
                            </button>
                            <div className=" w-full ">
                                <OcrSideBar files={uploadedFilesForScan} getOCRData={getOCRData} />
                            </div>

                        </div>
                        <div className="w-full md:w-3/4 ">
                         <TextArea editorState={editorState} setEditorState={setEditorState} />
                        </div>
                    </div>
                    {/* <FileEditor /> */}
                    <Footer editorState={editorState} setEditorState={setEditorState} />
                </div>

            </div>
        </>
    );
};

export default OcrLayout;
