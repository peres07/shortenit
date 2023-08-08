import { saveUrl } from '../database/manager/saveUrl.js'
import { findShortened } from '../database/manager/findShortened.js'
import { findUrl } from '../database/manager/findUrl.js'

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

export async function generateUrl (url: string): Promise<boolean | string | Error> {
  try {
    if (url.includes('shortenit')) {
      throw new Error('You can not shorten a shortened URL')
    }

    let generatedUrl = generate()
    const findShortenedResult = await findShortened(generatedUrl)
    const findUrlAlreadyExists = await findUrl(url)

    if (findShortenedResult !== false) {
      generatedUrl = generate()
    }

    if (findUrlAlreadyExists !== false) {
      return findUrlAlreadyExists.shortened_url
    }

    const saveUrlResult = await saveUrl(generatedUrl, url, 0, new Date(), false)

    if (!saveUrlResult) {
      throw new Error('Could not save the URL')
    }

    return generatedUrl
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
    return new Error('Could not save the URL')
  }
}
