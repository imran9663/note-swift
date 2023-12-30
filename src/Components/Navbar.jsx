import { convertToHTML } from 'draft-convert';
import { ContentState, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import HtmlToRtfBrowser from 'html-to-rtf-browser';
import html2pdf from 'html2pdf.js';
import React, { useState } from 'react';
import '../Styles/main.css';
import { Icons } from '../assets/icons';
import { Constants } from '../utils/constants';
import Dropdown from './Dropdown'
const Navbar = ({ editorState, setEditorState }) => {

    const [file, setfile] = useState({
        name: '',
        type: '',
        fileExt: ''
    })
    const isActiveStyle = (style) => {
        const currentStyle = editorState.getCurrentInlineStyle();
        return currentStyle.has(style);
    };
    const [toggleDonloadDD, settoggleDonloadDD] = useState(false)
    const handleClick = (param) => {
        if (param === 'CODE') {
            const newState = RichUtils.toggleCode(editorState);
            setEditorState(newState);
        } else {
            const newState = RichUtils.toggleInlineStyle(editorState, param);
            setEditorState(newState);
        }

    }
    const toggleBlockType = (blockType) => {
        const newState = RichUtils.toggleBlockType(editorState, blockType);
        setEditorState(newState);
    };




    function BlockStyleControls (style) {
        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();
        return style === blockType
    }
    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0]
        if (uploadedFile) {
            setfile({ ...file, name: `${String(uploadedFile.name).split('.')[0]}`, type: uploadedFile.type, fileExt: `.${String(uploadedFile.name).split('.')[1]}` })
            const reader = new FileReader();
            reader.onload = (readerEvent) => {
                const content = readerEvent.target.result;

                const contentState = ContentState.createFromText(content);
                const editorStateWithContent = EditorState.createWithContent(contentState);
                setEditorState(editorStateWithContent);
            };

            reader.readAsText(uploadedFile);
            reader.onerror = () => {
                console.log("error", reader.error);
            }
        }


    }
    const getCurrentStyles = () => {
        const selection = editorState.getSelection();
        const currentContent = editorState.getCurrentContent();
        const currentInlineStyle = editorState.getCurrentInlineStyle();

        const styles = [];
        currentContent.getBlockForKey(selection.getStartKey()).findStyleRanges(
            (character) => currentInlineStyle.has(character.getStyle()),
            (start, end) => {
                styles.push({
                    style: currentContent.getBlockForKey(selection.getStartKey()).getInlineStyleAt(start),
                    start,
                    end,
                });
            }
        );

        return styles;
    };
    const handleDownload = () => {
        const contentState = editorState.getCurrentContent();
        const contentText = contentState.getPlainText();
        console.log("contentState style", getCurrentStyles());
        const blob = new Blob([contentText], { type: file.type ? file.type : 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${file.name ? file.name : 'swift-note'}${file.fileExt ? file.fileExt : '.txt'}`;
        a.click();
        URL.revokeObjectURL(url);
    };
    const downloadNoteAsDocument = () => {
        let htmlToRtf = new HtmlToRtfBrowser();
        const contentState = editorState.getCurrentContent();
        const contentHtml = convertToHTML(contentState);
        // console.log("contentHtml", contentHtml);
        const rtfContent = htmlToRtf.convertHtmlToRtf(contentHtml);

        const blob = new Blob([rtfContent], { type: 'application/rtf;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${file.name ? file.name : 'swift-note'}.rtf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const downloadAsPDF = async () => {
        const contentState = editorState.getCurrentContent();
        const contentHtml = convertToHTML(contentState); // You need to implement the convertToHTML function
        const pdfOptions = {
            margin: 10,
            filename: `${file.name ? file.name : 'swift-note'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };


        html2pdf().from(contentHtml).set(pdfOptions).save();
    };
    const handleUndo = () => {
        setEditorState(EditorState.undo(editorState));
    };

    const handleRedo = () => {
        setEditorState(EditorState.redo(editorState));
    };
    const handleHeadingClick = (headingType) => {
        const newState = RichUtils.toggleBlockType(editorState, headingType);
        setEditorState(newState);
    };
    const handleDownloadDropdown = () => {
        settoggleDonloadDD((prevState) => !prevState)
    }
    return (
        <div style={{ minHeight: '2rem', paddingTop: '3px', paddingBottom: '3px' }}
            className=" sticky flex  top-0 z-50 justify-between gap-10 items-center px-3 border-b border-slate-400 dark:border-slate-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
            <Icons.Swiftlogo width={36} height={36} className='dark:text-slate-400 text-slate-900' />
            <div className="input border-l border-slate-400 dark:border-slate-200 px-2">
                <input type="text"
                    placeholder='swift-note (1)'
                    value={file.name}
                    onChange={(e) => (setfile({ ...file, name: e.target.value }))}
                    className="text-slate-950 dark:text-slate-200  py-2 bg-transparent  border-0 focus-visible:border-0  border-transparent  active:border-0 outline-none " />
            </div>
            <div className="elements h-100 w-100 flex flex-row justify-between items-center gap-1  border-l pl-2 py-1 border-slate-400 dark:border-slate-200">

                <button data-tooltip-target="tooltip-default" data-tooltip-placement="bottom" onClick={() => handleClick('BOLD')}
                    className={`border-1 rounded-sm border-slate-200 p-2 ${isActiveStyle(Constants.bold) ? 'dark:bg-slate-600 bg-slate-300 ' : ''}`}>
                    <Icons.Bold fill='#e2e8f0' />
                </button>

                <button onClick={() => handleClick(Constants.italic)} className={`border-1  rounded-sm border-slate-200 p-2 ${isActiveStyle(Constants.italic) ? 'dark:bg-slate-600 bg-slate-300 ' : ''}`}>
                    <Icons.Itaclic fill='#e2e8f0' />
                </button>
                <button onClick={() => handleClick(Constants.underline)} className={`border-1  rounded-sm border-slate-200 p-2 ${isActiveStyle(Constants.underline) ? 'dark:bg-slate-600 bg-slate-300 ' : ''}`}>
                    <Icons.Underline fill='#e2e8f0' />
                </button>
                <button onClick={() => handleClick(Constants.strikethrough)} className={`border-1  rounded-sm border-slate-200 p-2 ${isActiveStyle(Constants.strikethrough) ? 'dark:bg-slate-600 bg-slate-300 ' : ''}`}>
                    <Icons.Strike fill='#e2e8f0' />
                </button>
                <button onClick={() => handleClick(Constants.code)} className={`border-1  rounded-sm border-slate-200 p-2 ${isActiveStyle(Constants.strikethrough) ? 'dark:bg-slate-600 bg-slate-300 ' : ''}`}>
                    <Icons.Code fill='#e2e8f0' />
                </button>
                <button onClick={() => toggleBlockType(Constants.OL)} className={`border-1 border-slate-200 p-2 ${BlockStyleControls(Constants.OL) ? 'dark:bg-slate-600 bg-slate-300 ' : ''}`}>
                    <Icons.OrderdList fill='#e2e8f0' />
                </button>
                <button onClick={() => toggleBlockType(Constants.UL)} className={`border-1 border-slate-200 p-2 ${BlockStyleControls(Constants.UL) ? 'dark:bg-slate-600 bg-slate-300 ' : ''}`}>
                    <Icons.UnOrderdList fill='#e2e8f0' />
                </button>
                < Dropdown
                    editorState={editorState}
                    setEditorState={setEditorState}
                />

                <button onClick={() => handleUndo()} className={`border-1 border-slate-200 p-2 `}>
                    <Icons.RotateLeft fill='#e2e8f0' />

                </button>
                <button onClick={() => handleRedo()} className={`border-1 border-slate-200 p-2 `}>
                    <Icons.RotateRight fill='#e2e8f0' />
                </button>
            </div>
            <div className=" w-fit flex gap-2 flex-row justify-start items-center border-l px-2 border-slate-400 dark:border-slate-200">
                <a href="/" target='_blank' type="button" className="py-1 px-3 text-sm font-medium text-center inline-flex items-center rounded-lg border
                 text-slate-600 focus:outline-none bg-white  border-gray-200 hover:bg-slate-200
                 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800
                  dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                    <Icons.Plus fill='#e2e8f0' className='w-4 h-4 me-2' /> New
                </a>
                <div className="py-1">
                    <label htmlFor='file_upload' type="button" className="py-1 cursor-pointer px-3 text-sm font-medium text-center inline-flex items-center rounded-lg border
                 text-slate-600 focus:outline-none bg-white  border-gray-200 hover:bg-slate-200
                 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800
                  dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        <Icons.Upload fill='#e2e8f0' className='w-4 h-4 me-2' /> Upload
                    </label>
                    <input
                        onChange={handleFileUpload}
                        accept='text/*,application/rtf,application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document' type="file" name="file_upload" id="file_upload" className='hidden' />
                </div>


                <div className=" relative  text-sm font-medium text-center inline-flex items-center
                 text-slate-200 focus:outline-none bg-white rounded-lg border border-gray-200
                 focus:z-10 focus:ring-4 focus:ring-gray-200
                  dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600">
                    <button
                        onClick={handleDownload}
                        type="button" className="flex flex-row pl-3 py-1 text-slate-600   dark:hover:text-white dark:hover:bg-gray-700">
                        <Icons.Download fill='#e2e8f0' className='w-4 h-4 me-2' /> Download
                    </button>
                    <button onClick={handleDownloadDropdown} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className=" ml-2 pr-2 py-1 border-l border-gray-200 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                        <Icons.Chevaron fill='#e2e8f0' className='w-4 h-4  text-slate-600' />
                    </button>
                    {
                        toggleDonloadDD &&
                        <div id="dropdown" className="z-10 absolute top-8 left-0 
                         bg-white  text-gray-950  divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <button
                                    onClick={downloadNoteAsDocument}
                                    type="button" className="flex flex-row gap-2 px-4 py-2 w-full  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <Icons.Doc fill='#e2e8f0' className='w-4 h-4 me-2' /> Documnet
                                </button>
                                    <button
                                        onClick={downloadAsPDF}
                                        type="button" className="flex flex-row gap-2 px-4 py-2 w-full  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        <Icons.Pdf fill='#e2e8f0' className='w-4 h-4 me-2' /> PDF
                                    </button>

                            </ul>
                        </div>
                    }
                </div>
            </div>
        </div>

    );
};

export default Navbar;
