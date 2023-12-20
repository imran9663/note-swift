import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import React, { useEffect, useRef, useState } from "react";
import { useMainContext } from '../Context/MainContext';
import { Constants } from '../utils/constants';
const TextArea = (props) => {
    const { command, setcommand } = useMainContext()
    const [toggleFlag, settoggleFlag] = useState(false)
    const [lastCmd, setlastCmd] = useState('')
    useEffect(() => {
        console.log("Commad==>", command);
        command != '' && handleClick(command)
        switch (command) {
            case Constants.bold || Constants.italic || Constants.underline:
                handleClick(command)
                break;

            default:
                toggleBlockType(command)
                break;
        }
    }, [command, toggleFlag])

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
        setEditorState(RichUtils.toggleInlineStyle(editorState, paramCmd));
    };
    const toggleBlockType = (blockType) => {
        RichUtils.toggleBlockType(editorState, blockType);
        // RichUtils.toggleBlockType(editorState, blockType);
    };
    const styleMap = {
        'STRIKETHROUGH': {
            textDecoration: 'line-through',
        },
        'H1': {
            fontSize: '32px'
        },
        'H2': {
            fontSize: '24px'
        },
        'H3': {
            fontSize: '19px'
        },
        'H4': {
            fontSize: '16px'
        },
        'H5': {
            fontSize: '14px'
        },
        'H6': {
            fontSize: '14px'
        },
        'N': {
            fontSize: '12px'
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
        className="mt-2"
        placeholder={"Satrt your Note here ..."}
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
