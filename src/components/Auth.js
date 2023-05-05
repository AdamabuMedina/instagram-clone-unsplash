import { useEffect } from "react"
import { authenticationUrl } from "../unsplash/unsplash"

const Auth = () => {
  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    location.assign(authenticationUrl)
  }, [])

  return null
}

export default Auth
