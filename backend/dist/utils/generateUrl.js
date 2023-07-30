import { saveUrl } from '../database/saveUrl.js';
import { findUrl } from '../database/findUrl.js';
export async function generateUrl(url) {
    try {
        const length = 6;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        const findUrlResult = await findUrl(url);
        if (findUrlResult !== false) {
            return findUrlResult.shortened_url;
        }
        const saveUrlResult = await saveUrl(result, url);
        if (!saveUrlResult) {
            throw new Error('Could not save the URL');
        }
        return result;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
