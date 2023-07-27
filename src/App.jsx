import React, { useContext } from "react"
import { FileUploader } from "./components/fileUploader/FileUploader"
import { Hello } from "./components/hello/Hello"
import { HelloContext } from "./context/context"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const App = () => {
  const { isActive } = useContext(HelloContext)

  return (
    <>
      {isActive && <Hello />}
      <main>
        <FileUploader />
        <ToastContainer position="bottom-right" theme="dark" autoClose={2000} />
      </main>
    </>
  )
}
