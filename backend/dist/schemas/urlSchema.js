import JOI from 'joi';
export const urlSchema = JOI.object({
    url: JOI.string().uri().required()
});
