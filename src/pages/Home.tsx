import React, { useContext } from 'react'
import { GlobalContextProvider } from '../contextAPI/GlobalContext'

export default function Home() {
  const { logout }: any = useContext(GlobalContextProvider);
  return (
    <>
      <div>Home</div>
      <button className="btn btn-primary" onClick={logout}>Log out</button>
    </>
  )
}
