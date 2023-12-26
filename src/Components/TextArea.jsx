import React from 'react';
import { Editor, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

const TextArea = ({ editorState, setEditorState }) => {
    const handleEditorChange = (newEditorState) => {
        setEditorState(newEditorState);
    };
    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            handleEditorChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    return (
        <div className='m-2'>
            <Editor



                placeholder='write Someting here ...'
                editorState={editorState}
                onChange={handleEditorChange}
            />
        </div>
    );
};

export default TextArea;
