/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import Masonry from "react-masonry-component"
import { setAccessTokenUnplash, listPhoto } from "../unsplash/unsplash.js"

const PhotoList = props => {
  const isResized = useRef(false)

  const setAccessToken = () => {
    const code = window.location.search.split("code=")[1]
    if (code) {
      setAccessTokenUnplash(code)
    }
  }

  const loadImages = async () => {
    const start = props.images.length + 1
    const images = await listPhoto(start, localStorage.getItem("token"))
    props.addImages(images)
  }

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if (scrollTop + clientHeight === scrollHeight) {
      loadImages()
    }
  }

  useEffect(() => {
    if (!isResized.current) {
      loadImages()
      isResized.current = true
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("token") === "undefined" ||
      localStorage.getItem("token") === ""
    ) {
      setAccessToken()
    }
  }, [])

  return (
    <div className="main-container">
      <Masonry className="list-photos">
        {props.images.map((img, i) => {
          const date = new Date(img.created_at).toLocaleDateString()
          const liked = img.liked_by_user
            ? "btn btn-like liked"
            : "btn btn-like"

          const handleLike = event => {
            if (img.liked_by_user) {
              props.unlikedPhoto(img.id)
            } else {
              props.likedPhoto(img.id)
            }
          }

          return (
            <div key={img.id} className="list-photos__item">
              <img
                src={img.urls.small}
                className="list-photos__item--img"
                alt={img.description}
              />
              <div className="list-photos__item--stats">
                <a
                  href={img.user.links.html}
                  className="author"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={img.user.profile_image.small}
                    alt={img.user.first_name}
                    className="author-img"
                  />
                  <span className="author__name">{img.user.first_name}</span>
                </a>
                <time className="date" dateTime={img.created_at}>
                  {date}
                </time>
                <button className={liked} type="button" onClick={handleLike}>
                  {img.likes}
                </button>
                <Link to={`/photos/${i}`} className="photo-detail">
                  <button className="btn btn-detail">Подробнее</button>
                </Link>
              </div>
            </div>
          )
        })}
      </Masonry>
      <div className="spinner-border text-info" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  )
}

export default PhotoList
