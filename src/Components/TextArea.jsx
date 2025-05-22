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

        'header-one': {
            fontSize: '24px',
            fontWeight: 'bold',
        },
        'header-two': {
            fontSize: '20px',
            fontWeight: 'bold',
        },
    }
    const blockRenderMap = DefaultDraftBlockRenderMap.merge({
        CODE: { element: 'code' },
        'header-one': {
            element: 'h1',
        },
        'header-two': {
            element: 'h2',
        },
        'header-three': {
            element: 'h3',
        },
        'header-four': {
            element: 'h4',
        },
        'header-five': {
            element: 'h5',
        },
        'header-six': {
            element: 'h6',
        },
    });
    const blockStyleFn = (contentBlock) => {
        const type = contentBlock.getType();
        if (type.startsWith('header')) {
            return `header-style ${type}`;
        }
    };
    return (
        <div className='px-1 pt-1 font-coustom dark:bg-slate-800 bg-white flex'>
            <Editor
                className='font-custom pad-t-1'
                placeholder='Start your swift notes here ...'
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                onChange={handleEditorChange}
                autoCorrect={"true"}
                spellCheck={true}
                customStyleMap={styleMap}
                blockRenderMap={blockRenderMap}
                blockStyleFn={blockStyleFn}
            />
        </div>
    );
};

export default TextArea;
