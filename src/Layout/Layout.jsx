import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import TextArea from '../Components/TextArea';
import { EditorState } from 'draft-js';
import Footer from '../Components/Footer';
import FileEditor from '../Components/FileEditor';
import Sidebar from '../Components/Sidebar';
import '../Styles/main.css'
const Layout = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    return (
        <>
            <div className=" flex flex-row">
                {/* <Sidebar /> */}
                <div className=' h-screen flex flex-col flex-1 overflow-hidden bg-white dark:bg-slate-600 text-slate-900 dark:text-white'>
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
