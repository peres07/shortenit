import JOI from 'joi'

export const customUrlSchema = JOI.object({
  url: JOI.string().regex(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/
  ).required().messages({
    'string.pattern.base': 'Invalid URL'
  }),
  customUrl: JOI.string().min(3).regex(/^[A-Za-z0-9-]+$/).required().messages({
    'string.pattern.base': 'Invalid custom URL'
  })
})
