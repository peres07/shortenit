import JOI from 'joi'

export const randomUrlSchema = JOI.object({
  url: JOI.string().uri().required()
})
