import { query } from '../utils/query.js'

export async function saveUrl (shortenedUrl: string, url: string, clicks: number, createdAt: Date, custom: boolean): Promise<boolean> {
  try {
    await query(
            `
            INSERT INTO urls (shortened_url, url, total_clicks, created_at, custom)
            VALUES ($1, $2, $3, $4, $5)
            `,
            [shortenedUrl, url, clicks, createdAt, custom]
    )
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
