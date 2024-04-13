export function setStoredSceneKey(sceneKey: string) {
  try {
    window.sessionStorage.setItem("sceneKey", sceneKey)
  } catch {
    console.error("Failed to store scene key")
  }
}

export function getStoredSceneKey() {
  return window.sessionStorage.getItem("sceneKey")
}
