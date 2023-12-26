import React, { useState } from 'react';
import { Editor, EditorState, ContentState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Constants } from '../utils/constants';
import { Icons } from '../assets/icons';
import Dropdown from './Dropdown'
import '../Styles/main.css'
import { type } from '@testing-library/user-event/dist/type';
const Navbar = ({ editorState, setEditorState }) => {

    const [file, setfile] = useState({
        name: '',
        type: ''
    })
    const isActiveStyle = (style) => {
        const currentStyle = editorState.getCurrentInlineStyle();
        return currentStyle.has(style);
    };
    const handleClick = (param) => {
        const newState = RichUtils.toggleInlineStyle(editorState, param);
        setEditorState(newState);
    }
    const toggleBlockType = (blockType) => {
        // console.log("toggle block", blockType)
        const newState = RichUtils.toggleBlockType(editorState, blockType);
        setEditorState(newState);
    };


    const handleSelect = (blockType) => {
        toggleBlockType(blockType)
    }

    function BlockStyleControls (style) {
        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();
        console.log("blkType", blockType);
    }
    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0]
        console.log("uploadedFile", uploadedFile);
        if (uploadedFile) {
            setfile({ ...file, name: uploadedFile.name, type: uploadedFile.type })
            const reader = new FileReader();
            reader.onload = (readerEvent) => {
                const content = readerEvent.target.result;
                // const blocksFromHTML = convertFromHTML(content);
                // const state = ContentState.createFromBlockArray(
                //     blocksFromHTML.contentBlocks,
                //     blocksFromHTML.entityMap
                // );
                const contentState = ContentState.createFromText(content);
                const editorStateWithContent = EditorState.createWithContent(contentState);
                setEditorState(editorStateWithContent);
            };

            reader.readAsText(uploadedFile);
            reader.onerror = () => {
                console.log("error", reader.error);
            }
        }
        // reader.onload = (e) => {
        //     const fileContents = e.target.result;
        //     const html = `<p>${fileContents}</p>`;
        //     const blocksFromHTML = convertFromHTML(html);
        //     const contentState = ContentState.createFromBlockArray(
        //         blocksFromHTML.contentBlocks,
        //         blocksFromHTML.entityMap
        //     );
        //     const editorState = EditorState.createWithContent(contentState);
        //     onChange(editorState);
        // };

    }
    const handleDownload = () => {
        const contentState = editorState.getCurrentContent();
        const contentText = contentState.getPlainText();
        console.log("contentText", contentText);
        // const blob = new Blob([contentText], { type: 'text/plain' });
        // const url = URL.createObjectURL(blob);

        // const a = document.createElement('a');
        // a.href = url;
        // a.download = 'downloaded_content.txt';
        // a.click();

        // URL.revokeObjectURL(url);
    };

    return (
        <div className=" sticky flex  top-0 z-50 justify-between gap-10 items-center px-3 py-2  border-b border-slate-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
            <img src={Icons.logo} alt="" className="w-8 h-8 " />
            <div className="input   border-l border-slate-200 px-2">
                <input type="text"
                    placeholder='Untitled document'
                    value={file.name}
                    onChange={(e) => (setfile({ ...file, name: e.target.value }))}
                    className="text-slate-200 py-2 bg-transparent  border-0 focus-visible:border-0 outline-none border-transparent  active:border-0 outline-none " />
            </div>
            <div className="elements h-100 w-100 flex flex-row justify-between items-center gap-1  border-l pl-2 py-1 border-slate-200">
                <button onClick={() => handleClick('BOLD')} className={`border-1 rounded-sm border-slate-200 p-2 ${isActiveStyle(Constants.bold) ? 'bg-slate-600' : ''}`}>
                    <Icons.Bold fill='#e2e8f0' />
                </button>
                <button onClick={() => handleClick(Constants.italic)} className={`border-1  rounded-sm border-slate-200 p-2 ${isActiveStyle(Constants.italic) ? 'bg-slate-600' : ''}`}>
                    <Icons.Itaclic fill='#e2e8f0' />
                </button>
                <button onClick={() => handleClick(Constants.underline)} className={`border-1  rounded-sm border-slate-200 p-2 ${isActiveStyle(Constants.underline) ? 'bg-slate-600' : ''}`}>
                    <Icons.Underline fill='#e2e8f0' />
                </button>
                <button onClick={() => handleClick(Constants.strikethrough)} className={`border-1  rounded-sm border-slate-200 p-2 ${isActiveStyle(Constants.strikethrough) ? 'bg-slate-600' : ''}`}>
                    <Icons.Strike fill='#e2e8f0' />
                </button>
                <button onClick={() => toggleBlockType(Constants.OL)} className={`border-1 border-slate-200 p-2 ${BlockStyleControls(Constants.OL) ? 'bg-slate-600' : ''}`}>
                    <Icons.OrderdList fill='#e2e8f0' />
                </button>
                <button onClick={() => toggleBlockType(Constants.UL)} className={`border-1 border-slate-200 p-2 ${BlockStyleControls(Constants.UL) ? 'bg-slate-600' : ''}`}>
                    <Icons.UnOrderdList fill='#e2e8f0' />
                </button>
                < Dropdown
                    handleSelect={handleSelect}
                />
            </div>
            <div className=" w-fit flex gap-2 flex-row justify-start items-center border-l px-2 border-slate-200">
                <a href="/" target='_blank' type="button" className="py-1 px-3 text-sm font-medium text-center inline-flex items-center text-slate-200 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    <Icons.Plus className='w-4 h-4 me-2' /> New
                </a>
                <div className="py-1">
                    <label htmlFor='file_upload' type="button" className="py-1 px-3 cursor-pointer text-sm font-medium text-center inline-flex items-center text-slate-200 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        <Icons.Upload className='w-4 h-4 me-2' /> Upload
                    </label>
                    <input
                        onChange={handleFileUpload}
                        accept='text/*' type="file" name="file_upload" id="file_upload" className='hidden' />
                </div>
                <button
                    onClick={handleDownload}
                    type="button" className="py-1 px-3 text-sm font-medium text-center inline-flex items-center text-slate-200 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    <Icons.Download className='w-4 h-4 me-2' /> Download
                </button>
            </div>
        </div>
    );
};

export default Navbar;
