import React from 'react'

const TextArea = () => {
    return (
        <div className="px-4 py-2 h-full border-1 overflow-hidden border-red-400 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="newText" className="sr-only">Your comment</label>
            <textarea autofocus id="newText" className="w-full h-dvh  resize-none px-0 text-sm text-gray-900 bg-white border-0
             dark:bg-gray-800
             focus:ring-0
              dark:text-white
               dark:placeholder-gray-400
               focus:border-0
               focus-within:border-0 
               focus-within: outline-none
               "

                placeholder="Start typing here..." required defaultValue={""} />
        </div>
    )
}

export default TextArea