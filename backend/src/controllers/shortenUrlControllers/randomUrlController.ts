import { type Request, type Response } from 'express'

import { generateUrl } from '../../utils/generateUrl.js'
import { randomUrlSchema } from '../../schemas/randomUrlSchema.js'

export default async function randomUrl (req: Request, res: Response): Promise<Response> {
  try {
    await randomUrlSchema.validateAsync(req.body)
    const { url } = req.body

    const shortenedUrl = await generateUrl(url)

    if (shortenedUrl instanceof Error) {
      throw new Error(shortenedUrl.message)
    }

    return res.status(200).json({ shortenedUrl })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message })
    }
    return res.status(500).json({ error })
  }
}
