import { type Request, type Response } from 'express'

import { customUrlSchema } from '../../schemas/customUrlSchema.js'
import { saveCustomUrl } from '../../utils/saveCustomUrl.js'

export default async function customUrl (req: Request, res: Response): Promise<Response> {
  try {
    await customUrlSchema.validateAsync(req.body)
    const { url, customUrl } = req.body

    const shortenedUrl = await saveCustomUrl(url, customUrl)

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
