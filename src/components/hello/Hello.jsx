import React, { useContext, useEffect, useState } from "react"
import { Input } from "../input/Input"
import { Button } from "../button/Button"
import { HelloContext } from "../../context/context"

export const Hello = () => {
  const [token, setToken] = useState("")
  const { activeHandler } = useContext(HelloContext)

  useEffect(() => {
    if (!token.length) {
      activeHandler()
    }
  }, [])

  const saveToken = () => {
    localStorage.setItem("token", token)
  }

  return (
    <div className="hello">
      <span>Приветствую! Пожалуйста, введите токен YandexAPI</span>
      <Input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <Button
        className="helloBtn"
        onClick={() => {
          saveToken()
          activeHandler()
        }}
      >
        Сохранить
      </Button>
    </div>
  )
}
