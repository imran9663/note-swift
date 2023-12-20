import { createContext, useContext, useState } from "react";

export const MainContext = createContext({
    typeCmd: '',
    typoFn: () => { },
})

export const MainContextProvider = ({ children }) => {
    const [command, setcommand] = useState('')
    return (
        <MainContext.Provider value={{ command, setcommand }}>
            {children}
        </MainContext.Provider>
    )
}
export const useMainContext = () => {
    const { command, setcommand } = useContext(MainContext)
    return { command, setcommand }
}