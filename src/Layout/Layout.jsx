import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import TextArea from '../Components/TextArea';
import { EditorState } from 'draft-js';
const Layout = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    return (
        <div className=' h-screen overflow-hidden bg-white dark:bg-slate-800 text-slate-900 dark:text-white'>
            <Navbar editorState={editorState} setEditorState={setEditorState} />
            <TextArea editorState={editorState} setEditorState={setEditorState} />
        </div>
    );
};

export default Layout;
