import { forwardRef } from "react"

export const Button = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <button className={className} {...props} ref={ref}>
      {children}
    </button>
  )
})
