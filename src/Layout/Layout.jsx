import { EditorState } from 'draft-js';
import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import TextArea from '../Components/TextArea';
import '../Styles/main.css';
const Layout = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const handleUnload = (event) => {
        event.preventDefault();
        return ''
    }
    useEffect(() => {
        window.addEventListener('beforeunload', (event) => handleUnload(event))
        return () => {
            window.removeEventListener('beforeunload', (event) => handleUnload(event))
        }
    }, [])

    return (
        <>
            <div id='layout' className=" flex flex-row overflow-hidden">
                {/* <Sidebar /> */}
                <div className=' h-screen flex flex-col flex-1 overflow-hidden bg-white dark:bg-slate-600 text-slate-900 dark:text-white '>
                    <Navbar editorState={editorState} setEditorState={setEditorState} />
                    <TextArea editorState={editorState} setEditorState={setEditorState} />
                    {/* <FileEditor /> */}
                    <Footer editorState={editorState} setEditorState={setEditorState} />
                </div>

            </div>
        </>
    );
};

export default Layout;
