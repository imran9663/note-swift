import { convertToHTML } from 'draft-convert';
import { ContentState, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import HtmlToRtfBrowser from 'html-to-rtf-browser';
import html2pdf from 'html2pdf.js';
import React, { useState, useEffect } from 'react';
import '../Styles/main.css';
import { Icons } from '../assets/icons';
import { Constants, pathNames } from '../utils/constants';
import Dropdown from './Dropdown'
import { Link, useLocation } from 'react-router';
const Navbar = ({ editorState, setEditorState, setUploadedFilesForScan }) => {
    let location = useLocation();

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
    const handleFilesUploadedForScan = (e) => {
        const { files } = e.target;
        if (files) {
            setUploadedFilesForScan(files)
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
        <>
        <div style={{ minHeight: '2rem', paddingTop: '3px', paddingBottom: '3px' }}
                className=" md:h-auto h-10 sticky flex  top-0 z-50 justify-between gap-2 md:gap-10 items-center px-3 md:border-b border-slate-400 dark:border-slate-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
            <Icons.Swiftlogo width={36} height={36} stroke='#00b3b3' fill='#00b3b3' />
                <div className=" hidden md:block input border-l border-slate-400 dark:border-slate-200 px-2">
                <input type="text"
                    placeholder='swift-note (1)'
                    value={file.name}
                    onChange={(e) => (setfile({ ...file, name: e.target.value }))}
                    className="text-slate-950 dark:text-slate-200  py-2 bg-transparent  border-0 focus-visible:border-0  border-transparent  active:border-0 outline-none " />
            </div>
                <div className=" hidden md:flex elements h-100 w-100  flex-row justify-between items-center gap-1  border-l pl-2 py-1 border-slate-400 dark:border-slate-200">
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
                {location.pathname !== pathNames.scan &&
                        <><Link title='scan Images' to={`${pathNames.scan}`} className="text-dark bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg py-1 px-1 md:px-3 text-sm text-center  flex flex-row justify-between gap-2 items-center">
                            <Icons.Scan className='w-4 md:h-4' /> <p className='hidden text-[6px] md:text-sm md:block '>Scan</p>

                    </Link>
                    </>
                }
                {location.pathname === pathNames.default && <>
                        <a href="/" target='_blank' title='New Document' type="button" className="py-1 px-1 md:px-3  text-sm font-medium text-center inline-flex items-center rounded-lg border
                 text-slate-600 focus:outline-none bg-white  border-slate-200 hover:bg-slate-200
                 focus:z-10 focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-700 dark:bg-slate-800
                  dark:text-slate-400 dark:border-slate-600 dark:hover:text-white dark:hover:bg-slate-700"
                >
                            <Icons.Plus fill='#e2e8f0' className='w-4 h-4 md:me-2' /> <p className='hidden text-[6px] md:text-sm md:block'>New </p>
                </a>
                <div className="py-1">
                            <label title='Upload' htmlFor='file_upload' type="button" className=" cursor-pointer py-1 px-1 md:px-3  text-sm font-medium text-center inline-flex items-center rounded-lg border
                 text-slate-600 focus:outline-none bg-white  border-slate-200 hover:bg-slate-200
                 focus:z-10 focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-700 dark:bg-slate-800
                  dark:text-slate-400 dark:border-slate-600 dark:hover:text-white dark:hover:bg-slate-700">
                                <Icons.Upload fill='#e2e8f0' className='w-4 h-4 md:me-2 text-[6px] md:text-sm ' /> <p className='hidden text-[6px] md:text-sm md:block'>Upload</p>
                    </label>
                    <input
                        onChange={handleFileUpload}
                        accept='text/*,application/rtf,application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document' type="file" name="file_upload" id="file_upload" className='hidden' />
                </div>
                </>}

                {
                    location.pathname === pathNames.scan &&
                    <>
                        <div className="py-1">
                                <label htmlFor='file_upload' type="button" className=" cursor-pointer py-1 px-1 md:px-3  text-[6px] md:text-sm font-medium text-center inline-flex items-center rounded-lg border
                 text-slate-600 focus:outline-none bg-white  border-gray-200 hover:bg-slate-200
                 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800
                  dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <Icons.Upload fill='#e2e8f0' className='w-4 h-4 me-2' /> Upload to Scan
                            </label>
                            <input
                                onChange={handleFilesUploadedForScan}
                                accept='image/*' multiple type="file" name="file_upload" id="file_upload" className='hidden' />
                        </div>
                    </>
                }


                <div className=" relative  text-sm font-medium text-center inline-flex items-center
                 text-slate-200 focus:outline-none bg-white rounded-lg border border-gray-200
                 focus:z-10 focus:ring-4 focus:ring-gray-200
                  dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600">
                    <button
                        onClick={handleDownload}
                            type="button" className="flex flex-row py-1 px-1 md:px-3  text-slate-600 dark:text-slate-400   dark:hover:text-white dark:hover:bg-gray-700 text-[6px] md:text-sm">
                            <Icons.Download fill='#e2e8f0' className='w-4 h-4 me-2 ' /> Download
                    </button>
                    <button onClick={handleDownloadDropdown} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className=" ml-2 pr-2 py-1 border-l dark:text-slate-200 border-gray-200 dark:hover:text-white dark:hover:bg-gray-700 dark:border-gray-600" type="button">
                            <Icons.Chevaron fill='#e2e8f0' className='w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2  text-slate-600 dark:text-slate-400' />
                    </button>
                    {
                        toggleDonloadDD &&
                        <div id="dropdown" className="z-10 absolute top-8 left-0 
                         bg-white  text-gray-950  divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <button
                                    onClick={downloadNoteAsDocument}
                                    type="button" className="flex flex-row gap-2 px-4 py-2 w-full  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            <Icons.Doc fill='#e2e8f0' className='w-4 h-4 me-2' /> MS Word
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
            <div className=" md:hidden flex elements h-100 w-100  flex-row justify-between items-center gap-1  px-2 pl-2 py-1 border-b border-slate-400 dark:border-slate-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                <button data-tooltip-target="tooltip-default" data-tooltip-placement="bottom" onClick={() => handleClick('BOLD')}
                    className={`border-1 rounded-sm border-slate-200 p-1 ${isActiveStyle(Constants.bold) ? 'dark:bg-slate-600 bg-slate-300 ' : ''}`}>
                    <Icons.Bold width={10} height={10} fill='#e2e8f0' />
                </button>

                <button onClick={() => handleClick(Constants.italic)} className={`border-1  rounded-sm border-slate-200 p-2 ${isActiveStyle(Constants.italic) ? 'dark:bg-slate-600 bg-slate-300 ' : ''}`}>
                    <Icons.Itaclic width={10} height={10} fill='#e2e8f0' />
                </button>
                <button onClick={() => handleClick(Constants.underline)} className={`border-1  rounded-sm border-slate-200 p-2 ${isActiveStyle(Constants.underline) ? 'dark:bg-slate-600 bg-slate-300 ' : ''}`}>
                    <Icons.Underline width={10} height={10} fill='#e2e8f0' />
                </button>
                <button onClick={() => handleClick(Constants.strikethrough)} className={`border-1  rounded-sm border-slate-200 p-2 ${isActiveStyle(Constants.strikethrough) ? 'dark:bg-slate-600 bg-slate-300 ' : ''}`}>
                    <Icons.Strike width={10} height={10} fill='#e2e8f0' />
                </button>
                <button onClick={() => handleClick(Constants.code)} className={`border-1  rounded-sm border-slate-200 p-2 ${isActiveStyle(Constants.strikethrough) ? 'dark:bg-slate-600 bg-slate-300 ' : ''}`}>
                    <Icons.Code width={10} height={10} fill='#e2e8f0' />
                </button>
                <button onClick={() => toggleBlockType(Constants.OL)} className={`border-1 border-slate-200 p-2 ${BlockStyleControls(Constants.OL) ? 'dark:bg-slate-600 bg-slate-300 ' : ''}`}>
                    <Icons.OrderdList width={10} height={10} fill='#e2e8f0' />
                </button>
                <button onClick={() => toggleBlockType(Constants.UL)} className={`border-1 border-slate-200 p-2 ${BlockStyleControls(Constants.UL) ? 'dark:bg-slate-600 bg-slate-300 ' : ''}`}>
                    <Icons.UnOrderdList width={10} height={10} fill='#e2e8f0' />
                </button>
                < Dropdown
                    editorState={editorState}
                    setEditorState={setEditorState}
                />

                <button onClick={() => handleUndo()} className={`border-1 border-slate-200 p-2 `}>
                    <Icons.RotateLeft width={10} height={10} fill='#e2e8f0' />

                </button>
                <button onClick={() => handleRedo()} className={`border-1 border-slate-200 p-2 `}>
                    <Icons.RotateRight width={10} height={10} fill='#e2e8f0' />
                </button>
            </div>
        </>
        // <>


        //     <nav className="bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700">
        //         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        //             <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
        //                 <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
        //                 <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
        //             </a>
        //             <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-slate-500 rounded-lg md:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 dark:focus:ring-slate-600" aria-controls="navbar-dropdown" aria-expanded="false">
        //                 <span className="sr-only">Open main menu</span>
        //                 <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        //                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
        //                 </svg>
        //             </button>
        //             <div  className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
        //                 <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-slate-100 rounded-lg bg-slate-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-slate-800 md:dark:bg-slate-900 dark:border-slate-700">
        //                     <li>
        //                         <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</a>
        //                     </li>
        //                     <li>
        //                         <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 px-3 text-slate-900 rounded-sm hover:bg-slate-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-slate-700 dark:hover:bg-slate-700 md:dark:hover:bg-transparent">Dropdown <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        //                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
        //                         </svg></button>
        //                         {/* Dropdown menu */}
        //                         <div id="dropdownNavbar" className="z-10 hidden font-normal bg-white divide-y divide-slate-100 rounded-lg shadow-sm w-44 dark:bg-slate-700 dark:divide-slate-600">
        //                             <ul className="py-2 text-sm text-slate-700 dark:text-slate-400" aria-labelledby="dropdownLargeButton">
        //                                 <li>
        //                                     <a href="#" className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:text-white">Dashboard</a>
        //                                 </li>
        //                                 <li>
        //                                     <a href="#" className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:text-white">Settings</a>
        //                                 </li>
        //                                 <li>
        //                                     <a href="#" className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:text-white">Earnings</a>
        //                                 </li>
        //                             </ul>
        //                             <div className="py-1">
        //                                 <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 dark:text-slate-200 dark:hover:text-white">Sign out</a>
        //                             </div>
        //                         </div>
        //                     </li>
        //                     <li>
        //                         <a href="#" className="block py-2 px-3 text-slate-900 rounded-sm hover:bg-slate-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
        //                     </li>
        //                     <li>
        //                         <a href="#" className="block py-2 px-3 text-slate-900 rounded-sm hover:bg-slate-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
        //                     </li>
        //                     <li>
        //                         <a href="#" className="block py-2 px-3 text-slate-900 rounded-sm hover:bg-slate-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
        //                     </li>
        //                 </ul>
        //             </div>
        //         </div>
        //     </nav>


        // </>

    );
};

export default Navbar;
