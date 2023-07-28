import { query } from './utils/query.js'

export async function saveUrl (shortenedUrl: string, url: string): Promise<boolean> {
  try {
    await query(
            `
            INSERT INTO urls (shortened_url, url)
            VALUES ($1, $2)
            `,
            [shortenedUrl, url]
    )
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
