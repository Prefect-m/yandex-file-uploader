import React, { useContext, useEffect, useState } from "react"
import { Input } from "../input/Input"
import { useDropzone } from "react-dropzone"
import { fileUpload } from "../../services/file-upload"
import { LoadingProgress } from "../loading-progress/Loading-progress"
import { Preview } from "../preview/Preview"
import { Button } from "../button/Button"
import { HelloContext } from "../../context/context"
import { toast } from "react-toastify"

export const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState([])
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
      const arrayData = Array.from(data)
      const isImages = (file) => file.type.startsWith("image/")
      const isOntherFiles = (file) => !file.type.startsWith("image/")

      const images = arrayData.filter(isImages)
      const otherFiles = arrayData.filter(isOntherFiles)
      const imagesWithUrls = images.map((file) =>
        window.URL.createObjectURL(file)
      )
      if (!images.length) {
        setSelectedFile(otherFiles)
      } else {
        setSelectedFile(images)
        setPreview(imagesWithUrls)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop: dropHandler,
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
        {isUploading && <LoadingProgress progress={progress} />}
        <span className="maxCountImage">
          Максимальное количество выбираемых файлов: {max}
        </span>
        <div className="choiseFiles">
          выбранные файлы:
          {selectedFile &&
            selectedFile.map((file, i) => (
              <span key={i}>
                {i + 1} - {file.path}
              </span>
            ))}
        </div>
        <Input {...getInputProps()} />
        {isDragActive ? (
          <p>Перетащите файлы сюда...</p>
        ) : (
          <p>Перетащите файлы сюда или кликните для выбора</p>
        )}

        {isDragReject && <p>Разрешенны только изображения</p>}
      </div>
      <div className="btn">
        <Button
          onClick={handleUpload}
          disabled={!selectedFile && !preview.length}
        >
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
