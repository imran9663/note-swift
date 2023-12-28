import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap } from 'draft-js';
import 'draft-js/dist/Draft.css';

const MyEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    // Define a custom block type for code blocks
    const CODE_BLOCK_TYPE = 'code-block';

    // Define a custom style map for the Dracula theme
    const customStyleMap = {
        CODE: {
            backgroundColor: '#282a36',
            color: '#f8f8f2',
            fontFamily: 'monospace',
            padding: '0.2em',
            margin: '0',
            borderRadius: '0.3em',
        },
    // Add other custom styles as needed
    };

    useEffect(() => {
        // Set the custom style map
        setEditorState(EditorState.set(editorState, { inlineStyleOverride: customStyleMap }));
    }, [editorState]);

    const handleStyleClick = (style) => {
        // Handle code block separately
        if (style === 'CODE') {
            setEditorState((prevState) => {
                const newEditorState = RichUtils.toggleBlockType(prevState, CODE_BLOCK_TYPE);
                return newEditorState;
            });
        } else {
        // For other styles, use RichUtils.toggleInlineStyle
            setEditorState(RichUtils.toggleInlineStyle(editorState, style));
        }
    };

    // Define a custom block renderer for the code block
    const blockRenderMap = DefaultDraftBlockRenderMap.merge({
        [CODE_BLOCK_TYPE]: { element: 'code' },
    });

    const blockRendererFn = (contentBlock) => {
        const type = contentBlock.getType();
        if (type === CODE_BLOCK_TYPE) {
            return {
                component: 'code',
                props: {
                    style: {
                        whiteSpace: 'pre-wrap',
                    },
                },
            };
        }
    };

    return (
        <div>
            <div>
                <button onClick={() => handleStyleClick('BOLD')}>Bold</button>
                <button onClick={() => handleStyleClick('ITALIC')}>Italic</button>
                <button onClick={() => handleStyleClick('UNDERLINE')}>Underline</button>
                <button onClick={() => handleStyleClick('CODE')}>Code</button>
                {/* Add other styling buttons as needed */}
            </div>
            <div>
                <Editor
                    editorState={editorState}
                    onChange={(newEditorState) => setEditorState(newEditorState)}
                    customStyleMap={customStyleMap}
                    blockRenderMap={blockRenderMap}
                    blockRendererFn={blockRendererFn}
                />
            </div>
        </div>
    );
};

export default MyEditor;
