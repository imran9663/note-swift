import { EditorState } from 'draft-js';
import { createContext, useContext, useState } from "react";

export const MainContext = createContext({})

export const MainContextProvider = ({ children }) => {
    const [command, setcommand] = useState({
        name: '',
        hasStyle: false
    })
    const [GlobalEditorState, setGlobalEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    let values = {
        command, setcommand,
        GlobalEditorState, setGlobalEditorState
    }
    return (
        <MainContext.Provider value={values}>
            {children}
        </MainContext.Provider>
    )
}
export const useMainContext = () => {
    const { command, setcommand } = useContext(MainContext)
    return { command, setcommand }
}