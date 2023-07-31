import { query } from '../utils/query.js'
import type { Statistics } from '../../types/statistics.js'

export async function selectTotalClicks (): Promise<false | Statistics> {
  try {
    const result = await query(
      'SELECT total_clicks FROM urls'
    )
    return result
  } catch (error) {
    console.error(error)
    return false
  }
}
