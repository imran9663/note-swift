import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import React, { useEffect, useRef } from "react";
const TextArea = (props) => {

    const { editorState, setEditorState } = props

    useEffect(() => {
        editorRef.current.focus();
    }, [])

    const editorRef = useRef("");

    useEffect(() => {
        console.log("getPlainText", editorState.getCurrentContent());
    }, [editorState])


    const onChange = (newEditorState) => (setEditorState(newEditorState))
    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };
    const handleClick = (paramCmd) => {
        // console.log("par", paramCmd);
        const newState = RichUtils.toggleInlineStyle(editorState, paramCmd);
        onChange(newState);
    };
    const toggleBlockType = (blockType) => {
        // console.log("toggle block", blockType);
        const newState = RichUtils.toggleBlockType(editorState, blockType);
        onChange(newState);

    };
    const handleChange = (newState) => onChange(newState)
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
        onChange={handleChange} />
    </div>;

};

export default TextArea;
