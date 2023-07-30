import { query } from '../utils/query.js'

export async function updateClicks (shortenedUrl: string, clicks: number): Promise<boolean> {
  try {
    await query(
                `
                UPDATE urls
                SET total_clicks = $2
                WHERE shortened_url = $1
                `,
                [shortenedUrl, clicks]
    )
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
