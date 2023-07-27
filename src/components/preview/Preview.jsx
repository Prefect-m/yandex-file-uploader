import React from "react"

export const Preview = ({ images }) => {
  return (
    <>
      {images.map((img, i) => (
        <div className="previewImage" key={i}>
          <img src={img} key={i} />
        </div>
      ))}
    </>
  )
}
