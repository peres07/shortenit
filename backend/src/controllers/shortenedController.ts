import { type Request, type Response } from 'express'

import { findShortened } from '../database/manager/findShortened.js'
import { updateClicks } from '../database/manager/updateClicks.js'

export default async function shortenUrl (req: Request, res: Response): Promise<void> {
  try {
    const url = req.params.url
    const urlFound = await findShortened(url)
    if (urlFound === false) {
      throw new Error('Could not find the shortened URL')
    }
    const clicks = urlFound.total_clicks + 1
    await updateClicks(urlFound.shortened_url, clicks)
    if (!urlFound.url.startsWith('http') || !urlFound.url.startsWith('https')) {
      urlFound.url = 'https://' + urlFound.url
    }
    res.redirect(urlFound.url)
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      res.redirect('/')
    }
  }
}
