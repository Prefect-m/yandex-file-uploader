import React, { useContext } from "react"
import { FileUploader } from "./components/fileUploader/FileUploader"
import { Hello } from "./components/hello/Hello"
import { HelloContext } from "./context"

export const App = () => {
  const { isActive } = useContext(HelloContext)

  return (
    <>
      {isActive && <Hello />}
      <FileUploader />
    </>
  )
}
