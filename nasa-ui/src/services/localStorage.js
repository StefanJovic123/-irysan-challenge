import { FAVORITES_LS_KEY } from "constants/app.constant"

export const getFavorites = () => {
  const favorites = JSON.parse(window.localStorage.getItem(FAVORITES_LS_KEY)) || []
  return favorites
}
