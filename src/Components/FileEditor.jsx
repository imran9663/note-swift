import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, ContentState } from 'draft-js';
import '../Styles/main.css'
const FileEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const isActiveStyle = (style) => {
        const currentStyle = editorState.getCurrentInlineStyle();
        return currentStyle.has(style);
    };

    const handleStyleClick = (style) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    const handleListClick = (listType) => {
        setEditorState(RichUtils.toggleBlockType(editorState, listType));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const content = e.target.result;
                // const editorStateWithContent = EditorState.createWithContent(
                //     convertToRaw(EditorState.createWithContent(ContentState.createFromText(content)).getCurrentContent())
                // );
                const contentState = ContentState.createFromText(content);
                const editorStateWithContent = EditorState.createWithContent(contentState);
                // const convertedContent = convertToRaw(editorStateWithContent)
                setEditorState(editorStateWithContent);
            };

            reader.readAsText(file);
        }
    };

    const handleDownload = () => {
        const contentState = editorState.getCurrentContent();
        const contentText = contentState.getPlainText();

        // Convert content styles to RTF format
        // const rtfContent = `{{\\rtf1\\ansi\\deff0\\nouicompat\\deflang1033{\\fonttbl{\\f0\\fnil\\fcharset0 Arial;}}{\\colortbl ;\\red0\\green0\\blue0;}\\viewkind4\\uc1\\pard\\cf1\\f0\\fs17 ${contentText} \\par}}`;

        const blob = new Blob([contentText], { type: 'application/rtf' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'edited_content.rtf';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className='p-4'>
            <div className=' sticky flex  pb-2 flex-row justify-start items-center gap-2 border-b-2 border-slate-500'>
                <div>
                    <button className="py-1 px-3 text-sm font-medium text-center inline-flex items-center text-slate-200 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={() => handleStyleClick('BOLD')}
                        style={{ fontWeight: isActiveStyle('BOLD') ? 'bold' : 'normal' }}
                    >
                        B
                    </button>
                    <button className="py-1 px-3 text-sm font-medium text-center inline-flex items-center text-slate-200 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={() => handleStyleClick('UNDERLINE')}
                        style={{ textDecoration: isActiveStyle('UNDERLINE') ? 'underline' : 'none' }}
                    >
                        U
                    </button>
                </div>
                <div>
                    <button className="py-1 px-3 text-sm font-medium text-center inline-flex items-center text-slate-200 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={() => handleListClick('unordered-list-item')}
                        style={{ listStyleType: 'none', marginLeft: '0' }}
                    >
                        UL
                    </button>
                    <button className="py-1 px-3 text-sm font-medium text-center inline-flex items-center text-slate-200 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={() => handleListClick('ordered-list-item')}
                        style={{ listStyleType: 'decimal', marginLeft: '0' }}
                    >
                        OL
                    </button>
                    <input className='' type="file" accept="text/*" onChange={handleFileChange} />
                    <button className="py-1 px-3 text-sm font-medium text-center inline-flex items-center text-slate-200 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={handleDownload}>Download as RTF</button>
                </div>

            </div>

            <Editor
                editorState={editorState}
                placeholder='Write here ...'
                onChange={(newEditorState) => setEditorState(newEditorState)}
            />
        </div>
    );
};

export default FileEditor;
