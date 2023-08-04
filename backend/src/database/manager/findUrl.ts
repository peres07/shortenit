import { query } from '../utils/query.js'
import type { Url } from '../../types/url.js'

export async function findUrl (url: string): Promise<false | Url> {
  try {
    const result = await query(
            `
            SELECT * FROM urls
            WHERE url = $1 AND custom = false
            `,
            [url]
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
