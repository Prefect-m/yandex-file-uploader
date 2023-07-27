import axios from "axios"

const yandexURI = "https://cloud-api.yandex.net/v1/disk/resources/upload"
// const token = "y0_AgAAAABvpaW8AADLWwAAAADowhb1vfol6zhRR0Coyr-5CrRJVzg47Tg"

export const fileUpload = async (files, config, token) => {
  let result
  for await (let file of files) {
    let params = {
      path: `${file.name}`,
      overwrite: true,
    }
    await axios
      .get(`${yandexURI}?path=${params.path}&overwrite=${params.overwrite}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })
      .then(function (res) {
        axios.put(res.data.href, file, config)
        result = res
      })
    // .catch(function (err) {
    //   console.log(err)
    // })
  }
  return result
}
