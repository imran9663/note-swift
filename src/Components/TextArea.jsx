import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import React, { useEffect, useRef, useState } from "react";
import { useMainContext } from '../Context/MainContext';
import { Constants } from '../utils/constants';
const TextArea = (props) => {
    const { command, } = useMainContext()
    useEffect(() => {
        editorRef.current.focus();
        if (command.name != '') {
            console.log(command.name);
            switch (command.name) {
                case Constants.bold:
                    handleClick(command.name)
                    break;
                case Constants.italic:
                    handleClick(command.name)
                    break;
                case Constants.underline:
                    handleClick(command.name)
                    break;
                case Constants.h1:
                    handleClick(command.name)
                    break;
            default:
                    toggleBlockType(command.name)
                break;
            }
        }
    }, [command])

    const editorRef = useRef("");
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );
    const onChange = (newEditorState) => {
        setEditorState(newEditorState);
    };
    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };
    const handleClick = (paramCmd) => {
        console.log("par", paramCmd);
        const newState = RichUtils.toggleInlineStyle(editorState, paramCmd);

        setEditorState(newState);
    };
    const toggleBlockType = (blockType) => {
        console.log("toggle block", blockType);
        const newState = RichUtils.toggleBlockType(editorState, blockType);
        setEditorState(newState);

    };
    const styleMap = {
        'STRIKETHROUGH': {
            textDecoration: 'line-through',
        },
    };

    // H1 = 32
    // H2 = 24
    // H3 = 19
    // H4 = 16
    // H5 = 14
    // H6 = 13
    return <div className='m-2'><Editor
        ref={editorRef}
        className="mt-2 mx-3"
        placeholder={"Start your Note here ..."}
        editorState={editorState}
        autoCapitalize="true"
        spellCheck
        customStyleMap={styleMap}
        stripPastedStyles={false}
        handleKeyCommand={handleKeyCommand}
        onChange={setEditorState} />
    </div>;

};

export default TextArea;
