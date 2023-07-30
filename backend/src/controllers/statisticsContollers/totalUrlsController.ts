import { type Request, type Response } from 'express'
import { selectAll } from '../../database/statistics/selectAll.js'

export default async function allUrls (req: Request, res: Response): Promise<Response> {
  try {
    const allUrls = await selectAll()
    if (allUrls === false) {
      throw new Error('Could not get all urls')
    }
    return res.status(200).json({ totalShortened: allUrls.rowCount })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message })
    }
    return res.status(500).json({ error })
  }
}
