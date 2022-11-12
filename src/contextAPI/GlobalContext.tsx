import React,{createContext} from 'react'

const GlobalContextProvider = createContext({});

const GlobalContextContainer = ({children}:any) => {
  return (
    <GlobalContextProvider.Provider value={{}}>
        {children}
    </GlobalContextProvider.Provider>
  )
}

export  {
    GlobalContextContainer,
    GlobalContextProvider
}
