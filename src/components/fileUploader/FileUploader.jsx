import React, { useContext, useEffect, useState } from "react"
import { Input } from "../input/Input"
import { useDropzone } from "react-dropzone"
import { fileUpload } from "../../services/file-upload"
import { Loader } from "../loader/Loader"
import { Preview } from "../preview/Preview"
import { Button } from "../button/Button"
import { HelloContext } from "../../context"
import { toast } from "react-toastify"

export const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState([])
  const [isUploading, setIssUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [accessToken, setAccessToken] = useState("")
  const { isActive, token, deleteToken } = useContext(HelloContext)
  const max = 100

  useEffect(() => {
    if (token) {
      setAccessToken(token)
    }
  }, [isActive, token])

  const config = {
    onUploadProgress: (progressEvent) => {
      let uploadPercent = parseInt(
        Math.round((progressEvent.loaded / progressEvent.total) * 100)
      )
      setProgress(uploadPercent)
    },
  }

  const dropHandler = async (data) => {
    try {
      const files = data
      const selectedArray = Array.from(files)
      const images = selectedArray.map((img) => window.URL.createObjectURL(img))
      setPreview(images)
      setSelectedFile(files)
    } catch (err) {
      console.log(err)
    }
  }

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop: dropHandler,
      accept: "image/*",
      multiple: true,
      maxSize: 10000000,
      maxFiles: max,
    })

  const handleUpload = async () => {
    try {
      setIssUploading(true)
      const data = await fileUpload(selectedFile, config, accessToken)
      if (data.status === 200) {
        setSelectedFile([])
        setPreview([])
        toast("Загрузка прошла успешно")
        setIssUploading(false)
      }
    } catch (err) {
      toast("Не валидный токен")
      setIssUploading(false)
    }
  }

  return (
    <div className="container">
      <h1>Загрузка на Яндекс диск</h1>
      <div className="btn danger" onClick={deleteToken}>
        <Button>Удалить токен API</Button>
      </div>
      <div className="file-uploader" {...getRootProps()}>
        <div className="preview">{preview && <Preview images={preview} />}</div>
        {isUploading && <Loader progress={progress} />}
        <span className="maxCountImage">
          Максимальное количество выбираемых файлов: {max}
        </span>
        <Input {...getInputProps()} />
        {isDragActive ? (
          <p>Перетащите файлы сюда...</p>
        ) : (
          <p>Перетащите файлы сюда или кликните для выбора</p>
        )}

        {isDragReject && <p>Разрешенны только изображения</p>}
      </div>
      <div className="btn">
        <Button onClick={handleUpload} disabled={!preview.length}>
          Загрузить на диск
        </Button>
        <Button
          onClick={() => {
            setPreview([])
            setSelectedFile([])
          }}
          disabled={!preview.length}
        >
          Очистить
        </Button>
      </div>
    </div>
  )
}
