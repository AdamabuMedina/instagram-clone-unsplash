import { ADD_IMAGES, LIKED_PHOTO, UNLIKED_PHOTO } from "../constants.js"

const reducers = (state = [], action) => {
  switch (action.type) {
    case ADD_IMAGES:
      return [...state, ...action.images]

    case LIKED_PHOTO:
      return state.map(img => {
        if (img.id === action.id) {
          return {
            id: action.id,
            likes: action.likes,
            liked_by_user: action.liked_by_user,
            urls: {
              small: img.urls.small,
              regular: img.urls.regular,
            },
            user: {
              first_name: img.user.first_name,
              profile_image: { small: img.user.profile_image.small },
              links: { html: img.user.links.html },
            },
            created_at: img.created_at,
          }
        }
        return img
      })

    case UNLIKED_PHOTO:
      return state.map(img => {
        if (img.id === action.id) {
          return {
            id: action.id,
            likes: action.likes,
            liked_by_user: action.liked_by_user,
            urls: {
              small: img.urls.small,
              regular: img.urls.regular,
            },
            user: {
              first_name: img.user.first_name,
              profile_image: { small: img.user.profile_image.small },
              links: { html: img.user.links.html },
            },
            created_at: img.created_at,
          }
        }
        return img
      })

    default:
      return state
  }
}

export default reducers
