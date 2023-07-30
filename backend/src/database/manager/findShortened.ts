import { query } from '../utils/query.js'
import type { Url } from '../../types/url.js'

export async function findShortened (shortenedUrl: string): Promise<false | Url> {
  try {
    const result = await query(
      'SELECT * FROM urls WHERE shortened_url = $1',
      [shortenedUrl]
    )
    if (result.rowCount === 0) {
      return false
    }
    return result.rows[0]
  } catch (error) {
    console.error(error)
    return false
  }
}
