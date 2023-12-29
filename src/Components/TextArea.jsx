import React from 'react';
import { Editor, RichUtils, DefaultDraftBlockRenderMap } from 'draft-js';
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
    const styleMap = {
        CODE: {
            backgroundColor: '#282a36',
            color: '#f8f8f2',
            fontFamily: 'monospace',
            padding: '0.2em',
            margin: '0',
            borderRadius: '0.3em',
        },
    }
    const blockRenderMap = DefaultDraftBlockRenderMap.merge({
        CODE: { element: 'code' },
    });
    return (
        <div className='px-1 pt-1 font-coustom bg-slate-800 flex'>
            <Editor
                className='font-coustom pad-t-1'
                placeholder='Start your swift notes here ...'
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                onChange={handleEditorChange}
                autoCorrect={true}
                spellCheck={true}
                customStyleMap={styleMap}
                blockRenderMap={blockRenderMap}
            />
        </div>
    );
};

export default TextArea;
