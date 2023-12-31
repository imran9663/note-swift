import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
const Footer = ({ editorState, setEditorState }) => {
    const [charCount, setCharCount] = useState(0);
    const [lineCount, setLineCount] = useState(0);
    const [columnCount, setColumnCount] = useState(0);
    useEffect(() => {
        // Update character count, line count, and column count
        const contentState = editorState.getCurrentContent();
        const plainText = contentState.getPlainText();
        const lines = plainText.split('\n');
        const lineCount = lines.length;
        const columnCount = lines.length > 0 ? lines[lines.length - 1].length : 0;
        const charCount = plainText.length;

        setLineCount(lineCount);
        setColumnCount(columnCount);
        setCharCount(charCount);
    }, [editorState]);
    return (
        <><div style={{ minHeight: '1rem', paddingTop: '3px' }} className="z-10 border-t bg-white dark:bg-slate-800  border-slate-400 flex gap-2 flex-row justify-between items-end px-1 ">
            <div className=" dak:text-slate-400 text-slate-950  text-sm flex flex-row justify-end items-center ">
                <p className="dark:text-slate-400 text-slate-950 "> Made with ❤ by <a className=' dark:text-slate-400 text-slate-950 underline underline-offset-2'
                    href='https://imranpashai.netlify.app/' target='_blank'>Imran Pasha I</a></p>
            </div>
            <div className=' flex gap-2 flex-row justify-end items-center pr-3  dark:text-slate-400 text-slate-950 text-sm '>
                <p>Character : {charCount}</p>
                <p>Line : {lineCount}</p>
                <p>Col: {columnCount}</p>
            </div>
        </div>

        </>
    )
}

export default Footer