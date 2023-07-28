import { type Request, type Response } from 'express'

import { generateUrl } from '../utils/generateUrl.js'
import { urlSchema } from '../schemas/urlSchema.js'

export default async function shortenUrl (req: Request, res: Response): Promise<Response> {
  try {
    await urlSchema.validateAsync(req.body)
    const { url } = req.body
    const urlShortened = await generateUrl(url)
    if (urlShortened === false) {
      throw new Error('Could not generate a shortened URL')
    }
    return res.status(200).json({ urlShortened })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message })
    }
    return res.status(500).json({ error })
  }
}
