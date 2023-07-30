import { findShortened } from '../database/findShortened.js';
export default async function shortenUrl(req, res) {
    try {
        const url = req.params.url;
        const urlFound = await findShortened(url);
        if (urlFound === false) {
            throw new Error('Could not find the shortened URL');
        }
        res.redirect(urlFound.url);
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.redirect('/');
        }
    }
}
