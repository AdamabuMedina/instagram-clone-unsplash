/* eslint-disable array-callback-return */
import { useEffect } from "react"
import { NavLink, withRouter } from "react-router-dom"
import { setAccessTokenUnplash, listPhoto } from "../unsplash/unsplash.js"

const PhotoDetails = ({
  images,
  match,
  addImages,
  likedPhoto,
  unlikedPhoto,
}) => {
  useEffect(() => {
    if (
      localStorage.getItem("token") === "undefined" ||
      localStorage.getItem("token") === "" ||
      !localStorage.getItem("token")
    ) {
      setAccessToken()
    }

    loadImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setAccessToken = () => {
    const code = window.location.search.split("code=")[1]

    if (code) {
      setAccessTokenUnplash(code)
    }
  }

  const loadImages = () => {
    const start = images.length + 1
    const imagesPromise = listPhoto(start, localStorage.getItem("token"))

    imagesPromise.then(img => addImages(img))
  }

  return (
    <div className="main-container">
      <NavLink to="/photos" className="back-link">
        Назад
      </NavLink>
      {images.map((img, i) => {
        if (i === match.params.id) {
          const date = `${img.created_at.slice(8, 10)}.${img.created_at.slice(
            5,
            7
          )}.${img.created_at.slice(0, 4)}`
          const liked = img.liked_by_user
            ? "btn btn-like liked"
            : "btn btn-like"

          return (
            <div key={img.id} className="details-container">
              <div className="details-container--info">
                <a
                  href={img.user.links.html}
                  className="author"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={img.user.profile_image.small}
                    alt={img.user.name}
                    className="author-img"
                  />
                  <span className="author-name">{img.user.name}</span>
                </a>
                <time className="date" dateTime={img.created_at}>
                  {date}
                </time>
                <button
                  className={liked}
                  type="button"
                  onClick={event =>
                    img.liked_by_user
                      ? unlikedPhoto(img.id)
                      : likedPhoto(img.id)
                  }
                >
                  {img.likes}
                </button>
              </div>
              <img
                className="details-container--img"
                src={img.urls.regular}
                alt={img.description}
              />
            </div>
          )
        }
      })}
    </div>
  )
}

export default withRouter(PhotoDetails)
