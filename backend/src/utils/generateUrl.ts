import { saveUrl } from '../database/manager/saveUrl.js'
import { findUrl } from '../database/manager/findUrl.js'
import { findShortened } from '../database/manager/findShortened.js'

function generate (): string {
  const length = 6
  const characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * characters.length)
    )
  }
  return result
}

export async function generateUrl (url: string): Promise<boolean | string> {
  try {
    const findUrlResult = await findUrl(url)

    if (findUrlResult !== false) {
      return findUrlResult.shortened_url
    }

    let generatedUrl = generate()
    const findShortenedResult = await findShortened(generatedUrl)

    if (findShortenedResult !== false) {
      generatedUrl = generate()
    }

    const saveUrlResult = await saveUrl(generatedUrl, url, 0, new Date())

    if (!saveUrlResult) {
      throw new Error('Could not save the URL')
    }

    return generatedUrl
  } catch (error) {
    console.error(error)
    return false
  }
}
