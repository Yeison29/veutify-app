export const purgeCaracterImage = (image: string) => {
  image = image
    .replace('[', '')
    .replace(']', '')
    .replace(/"/, '')
  return image
}
