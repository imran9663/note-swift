import { ContentState, EditorState } from 'draft-js';
import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import OcrSideBar from '../Components/OcrSideBar';
import TextArea from '../Components/TextArea';
import '../Styles/main.css';
const OcrLayout = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [uploadedFilesForScan, setUploadedFilesForScan] = useState(null);
    const handleUnload = (event) => {
        event.preventDefault();
        return ''
    }
    const getOCRData = (data) => {
            const contentState = ContentState.createFromText(data.toString());
        const editorStateWithContent = EditorState.createWithContent(contentState);
        setEditorState(editorStateWithContent)
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
                <div className=' h-screen flex flex-col flex-1 overflow-hidden bg-white dark:bg-slate-600 text-slate-900 dark:text-white'>
                    <Navbar editorState={editorState} setEditorState={setEditorState} setUploadedFilesForScan={setUploadedFilesForScan} />
                    <div className="flex flex-row">
                        <OcrSideBar files={uploadedFilesForScan} getOCRData={getOCRData} />
                        <div className="w-3/4">
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
