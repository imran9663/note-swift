import React from "react";
import { Icons } from "../assets/icons";


const NoImages = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-6 rounded-2xl  bg-slate-800 text-slate-700 shadow-xl transition">
            <div className="flex flex-col items-center text-center space-y-4">
                <Icons.UploadCloud className="w-24 h-24 text-slate-700" />
                <h2 className="text-xl font-semibold">No Images Uploaded</h2>
                <p className="text-slate-700 text-sm max-w-md mt-1">
                    Click the <strong>"Upload to Scan"</strong> button or simply use <br />
                    <kbd className="bg-slate-600 px-2 py-1  rounded-md text-sm text-slate-500">Ctrl + V</kbd> to add images from your clipboard.
                </p>
                {/* <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition">
                    <Icons.UploadCloud className="w-5 h-5" />
                    Upload to Scan
                </button> */}
                <div className="flex items-center gap-2 text-sm text-slate-700 mt-1">
                    <Icons.ClipboardPaste className="w-4 h-4 text-slate-700" />
                    Or use Ctrl + V to paste images
                </div>
            </div>
        </div>
    );
};

export default NoImages;
