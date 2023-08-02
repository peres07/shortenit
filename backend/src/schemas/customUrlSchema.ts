import JOI from 'joi'

export const customUrlSchema = JOI.object({
  url: JOI.string().uri().required(),
  customUrl: JOI.string().min(3).required()
})
