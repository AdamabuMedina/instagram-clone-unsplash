import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Switch, Route, Redirect } from "react-router-dom"
import PhotoList from "../components/PhotoList.js"
import PhotoDetails from "../components/PhotoDetails.js"
import Header from "../components/Header.js"
import Auth from "../components/Auth.js"
import { likePhoto, unlikePhoto } from "../unsplash/unsplash.js"
import { addImages, likedPhoto, unlikedPhoto } from "../actions/actions.js"

const App = () => {
  const images = useSelector(state => state)
  const dispatch = useDispatch()

  const addImagesToState = useCallback(
    images => dispatch(addImages(images)),
    [dispatch]
  )
  const likePhotoAction = useCallback(
    id => dispatch(likedPhoto(id)),
    [dispatch]
  )
  const unlikePhotoAction = useCallback(
    id => dispatch(unlikedPhoto(id)),
    [dispatch]
  )

  const likeUpdate = useCallback(
    id => {
      const targetElement = images.find(item => item.id === id)
      if (!targetElement.liked_by_user) {
        targetElement.liked_by_user = true
        targetElement.likes++
        likePhoto(targetElement.id, localStorage.getItem("token"))
        likePhotoAction(id)
      } else {
        targetElement.liked_by_user = false
        targetElement.likes--
        unlikePhoto(targetElement.id, localStorage.getItem("token"))
        unlikePhotoAction(id)
      }
    },
    [images, likePhotoAction, unlikePhotoAction]
  )

  return (
    <Switch>
      <Route exact path="/" component={Auth} />
      <Route exact path="/photos">
        <Header />
        <PhotoList
          images={images}
          addImages={addImagesToState}
          likedPhoto={likeUpdate}
          unlikedPhoto={likeUpdate}
        />
      </Route>
      <Route path="/photos/:id">
        <Header />
        <PhotoDetails
          images={images}
          addImages={addImagesToState}
          likedPhoto={likeUpdate}
          unlikedPhoto={likeUpdate}
        />
      </Route>
      <Redirect to="/photos" />
    </Switch>
  )
}

export default App
