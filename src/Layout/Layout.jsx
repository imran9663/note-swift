import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import TextArea from '../Components/TextArea';
import { EditorState } from 'draft-js';
import Footer from '../Components/Footer';
import FileEditor from '../Components/FileEditor';
const Layout = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    return (
        <div className=' h-screen  overflow-hidden bg-white dark:bg-slate-800 text-slate-900 dark:text-white'>
            <Navbar editorState={editorState} setEditorState={setEditorState} />
            <TextArea editorState={editorState} setEditorState={setEditorState} />
            <Footer editorState={editorState} setEditorState={setEditorState} />
            {/* <FileEditor /> */}
        </div>
    );
};

export default Layout;
