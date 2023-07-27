import { forwardRef } from "react"

export const Input = forwardRef(({ type, ...props }, ref) => {
  return <input type={type} {...props} ref={ref} />
})
