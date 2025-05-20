import React, { useState } from 'react'
import { Icons } from '../assets/icons'
import '../Styles/main.css'
import { useEffect } from 'react'
import Tesseract from 'tesseract.js'
import supportedLangs from '../utils/languages.json'
import NoImages from './NoImages'
import DropdownWithSearch from './DropdownWithSearch'
const OcrSideBar = (props) => {
    const { files, getOCRData } = props;
    const [objectFiles, setObjectFiles] = useState([]);
    const [scannedData, setScannedData] = useState([]);
    const [isScanning, setIsScanning] = useState(false);
    const [selectedLng, setSelectedLng] = useState('eng');
    useEffect(() => {
        if (scannedData.length > 0) {
            getOCRData(scannedData)
        }
    }, [scannedData])

    useEffect(() => {
        if (files) {
            const newFiles = Object.values(files).map((newFile) => {
                return ({
                    name: newFile.name,
                    imageUrl: URL.createObjectURL(newFile),
                    isScanning: false,
                    isScanSuccess: false,
                    isScanFailed: false,
                    progress: 0,
                    msg: ''
                })
            })
            setObjectFiles(newFiles)
        }
    }, [files]);
    const handleScanClick = async () => {
        let covetedFiles = [];

        if (objectFiles) {
            setIsScanning(() => true);
            await objectFiles.map((file, index) => {
                Tesseract.recognize(file.imageUrl, selectedLng, {
                    logger: (log) => {
                        const newObj = objectFiles
                        newObj[index].isScanning = true;
                        newObj[index].msg = log.status;
                        if (log.status === 'recognizing text') {
                            newObj[index].progress = (log.progress * 100).toFixed(1)
                        }
                        setObjectFiles(() => [...newObj])
                    }
                }).then((result) => {
                    const newObj = objectFiles
                    newObj[index].isScanning = false;
                    newObj[index].isScanSuccess = true;
                    setObjectFiles(() => [...newObj])
                    covetedFiles.push(result.data.text);
                    const horizontalLine = '\n--------------------------------------------------------------------------------------- \n \f';
                    const dataWithSeparation = String(result.data.text).concat(horizontalLine)
                    setScannedData((prevData) => [...prevData, dataWithSeparation])
                }).catch((err) => {
                    console.log("scanError", err);
                    const newObj = objectFiles
                    // newObj[index].isScanning = false;
                    newObj[index].isScanFailed = true;
                    setObjectFiles(() => [...newObj])
                });
            })

        }
    }
    const handleLngSelect = (e) => {
        const { value } = e.target;
        console.log("selected lng", value);
        setSelectedLng(value)
    }
    const handleCrossClick = (selectInd) => {
        const filteredObjects = objectFiles.filter((item, ind) => ind !== selectInd);
        setObjectFiles(() => [...filteredObjects])
    }
    const handlePaste = (e) => {
        const clipBoardItems = e.clipboardData?.items;
        console.log('clipBoardItems', clipBoardItems)
        if (!clipBoardItems) {
            //show error toast 
            console.log("No Images In Clipboard");
            return
        }
        let clipImages = [];
        for (let i = 0; i < clipBoardItems.length; i++) {
            const item = clipBoardItems[i];
            console.log("item", item);
            if (item.type.indexOf('image') !== 1) {
                const blob = item.getAsFile();
                const imageObject = {
                    name: `Clipboard_image-${i}`,
                    imageUrl: URL.createObjectURL(blob),
                    isScanning: false,
                    isScanSuccess: false,
                    isScanFailed: false,
                    progress: 0,
                    msg: ''
                }
                clipImages.push(imageObject)
            }
        }
        if (clipImages.length > 0) {
            setObjectFiles(() => [...objectFiles, ...clipImages])
        }

    }
    return (
        <>
            <div className="w-1/4 border-r   border-slate-400 dark:border-slate-200  bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                <div className=" w-100  p-2 flex flex-row justify-between items-center ">
                    {/* <div className="w-full relative inline-block text-left border-0 ">

                        <select onChange={handleLngSelect} value={selectedLng}
                            className=" justify-center shadow-sm ring-0  rounded-md px-3  py-1 text-sm font-semibold
                                     dark:bg-slate-800 dark:text-slate-200  dark:hover:bg-slate-600
                                      text-gray-950   hover:bg-slate-300
                                    after:content-['*'] after:ml-0.5 ">
                            {supportedLangs.map((lng) => <option
                                            value={lng.code}
                                className='appearance-none dark:text-slate-200
                                 hover:bg-slate-300 px-4 py-2 dark:bg-slate-800
                                  min-w-5 text-sm dark:hover:bg-slate-600
                                   dark:hover:text-slate-100' >
                                            {lng.language}
                            </option>)}


                        </select>
                    </div> */}
                    <DropdownWithSearch setSelectedLng={setSelectedLng} />

                    <button
                        onClick={handleScanClick}
                        type="button"
                        disabled={objectFiles && objectFiles?.length === 0}
                        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500
                           to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
                          focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg 
                          text-sm px-3 py-1 text-center">
                        <div className="flex flex-row gap-2 justify-center ">
                            <Icons.Scan width={18} /> <p>Scan</p>
                        </div>
                    </button>
                </div>
                <hr className="h-px mb-2  bg-gray-200 border-0 dark:bg-gray-700" />
                <div onPaste={handlePaste} tabIndex={0} style={{ height: '80vh', overflowY: 'auto' }} className="flex mt-4 px-2  flex-row gap-2  flex-wrap justify-around items-start">
                    {objectFiles?.map((previewImage, index) =>
                        <div style={{ height: 'fit-content' }} className='w-24 rounded-sm'>
                            <figure className={"w-24 h-auto relative"}>
                                {isScanning && <div className=" w-24  h-full absolute top-0 left-0 bg-slate-800 opacity-90 flex flex-col justify-center items-center">
                                    {previewImage.isScanSuccess && <Icons.Check stroke='#80ed99' />}
                                    {previewImage.isScanning && <>
                                        <div className="flex flex-col justify-center items-center">
                                            <div role="status">
                                                <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                            </div>
                                            <span style={{ fontSize: '8px' }} className="text-white text-sm">{`${previewImage.msg} `}</span>
                                            <span style={{ fontSize: '8px' }} className="text-white text-sm">{`${previewImage.progress}%`}</span>
                                        </div>
                                    </>
                                    }

                                    {previewImage.isScanFailed && <Icons.Alert stroke='#d90429' />}
                                </div>}
                                <button onClick={ ()=>handleCrossClick(index)}type="button" class=" text-center inline-flex items-center text-white
                                 bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none 
                                  focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 absolute top-0 right-0
                                  m-1">
                                <Icons.Close width={18} height={18}/>
                                </button>
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src={previewImage.imageUrl}
                                    alt="image description"
                                />
                                <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400 truncate">
                                    {previewImage.name}
                                </figcaption>
                            </figure>
                        </div>)}
                    {(!objectFiles || objectFiles?.length === 0) &&
                        <NoImages />
                    }

                </div>


            </div>
        </>
    );
}

export default OcrSideBar
