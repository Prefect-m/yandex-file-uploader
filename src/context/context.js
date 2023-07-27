import { createContext, useEffect, useState } from "react"

export const HelloContext = createContext({
  isActive: true,
  activeHandler: () => {},
  deleteToken: () => {},
  token: "",
})

export const HelloContextProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(true)
  const [token, setToken] = useState("")

  const activeHandler = () => setIsActive(!isActive)

  const deleteToken = () => {
    setIsActive(true)
    setToken("")
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token")
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsActive(false)
      setToken(localStorage.getItem("token"))
    } else {
      setIsActive(true)
    }
  }, [isActive])

  return (
    <HelloContext.Provider
      value={{ isActive, activeHandler, token, deleteToken }}
    >
      {children}
    </HelloContext.Provider>
  )
}
