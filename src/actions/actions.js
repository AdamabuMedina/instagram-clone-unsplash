import { ADD_IMAGES, LIKED_PHOTO, UNLIKED_PHOTO } from "../constants.js"

export const addImages = images => ({
  type: ADD_IMAGES,
  images,
})

export const likedPhoto = id => ({
  type: LIKED_PHOTO,
  id,
})

export const unlikedPhoto = id => ({
  type: UNLIKED_PHOTO,
  id,
})
