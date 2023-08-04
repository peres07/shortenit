import { type Request, type Response } from 'express'

import { selectUrl } from '../../database/statistics/selectUrl.js'
import { randomUrlSchema } from '../../schemas/randomUrlSchema.js'

export default async function urlStatistics (req: Request, res: Response): Promise<Response> {
  try {
    await randomUrlSchema.validateAsync(req.body)
    let { url } = req.body
    url = url.split('/')[3]
    const urlStatistics = await selectUrl(url)
    if (urlStatistics === false) {
      throw new Error('Could not get url statistics')
    }
    return res.status(200).json({
      url: urlStatistics.url,
      shortenedUrl: urlStatistics.shortened_url,
      totalClicks: urlStatistics.total_clicks,
      createdAt: urlStatistics.created_at,
      custom: urlStatistics.custom
    })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message })
    }
    return res.status(500).json({ error })
  }
}
