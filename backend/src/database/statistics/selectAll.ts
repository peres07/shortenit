import { query } from '../utils/query.js'
import type { Statistics } from '../../types/statistics.js'

export async function selectAll (): Promise<false | Statistics> {
  try {
    const result = await query(
      'SELECT * FROM urls'
    )
    return result
  } catch (error) {
    console.error(error)
    return false
  }
}
