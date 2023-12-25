import React, { useState } from 'react'
import { EditorState } from 'draft-js';
import TextArea from '../Components/TextArea'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import { MainContextProvider } from '../Context/MainContext'
import 'draft-js/dist/Draft.css';
import FileEditor from '../Components/FileEditor';

const Layout = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    return (
        <div className=' h-screen overflow-hidden bg-white dark:bg-slate-800 text-slate-900 dark:text-white'>
            <MainContextProvider>
                <Navbar
                    editorState={editorState}
                    setEditorState={setEditorState} />
                {/* <Sidebar /> */}
                <TextArea editorState={editorState}
                    setEditorState={setEditorState} />
                {/* <Dummy /> */}
                {/* <FileEditor /> */}
            </MainContextProvider>
        </div>
    )
}

export default Layout
