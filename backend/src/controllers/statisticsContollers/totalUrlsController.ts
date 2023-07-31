import { type Request, type Response } from 'express'
import { selectTotalClicks } from '../../database/statistics/selectTotalClicks.js'

export default async function allUrls (req: Request, res: Response): Promise<Response> {
  try {
    const allUrls = await selectTotalClicks()
    if (allUrls === false) {
      throw new Error('Could not get all urls')
    }
    const totalClicks = allUrls.rows.reduce((acc: number, curr: any) => acc + (curr.total_clicks as number), 0)
    return res.status(200).json({ totalShortened: allUrls.rowCount, totalClicks })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message })
    }
    return res.status(500).json({ error })
  }
}
