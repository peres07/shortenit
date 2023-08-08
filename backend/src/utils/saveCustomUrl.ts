import { findShortened } from '../database/manager/findShortened.js'
import { saveUrl } from '../database/manager/saveUrl.js'

export async function saveCustomUrl (url: string, customUrl: string): Promise<string | Error> {
  try {
    if (url.includes('shortenit')) {
      throw new Error('You can not shorten a shortened URL')
    }

    const findShortenedResult = await findShortened(customUrl)

    if (findShortenedResult !== false) {
      throw new Error('The custom URL is already registered')
    }

    const saveUrlResult = await saveUrl(customUrl, url, 0, new Date(), true)

    if (!saveUrlResult) {
      throw new Error('Could not save the URL')
    }

    return customUrl
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
    return new Error('Could not save the URL')
  }
}
