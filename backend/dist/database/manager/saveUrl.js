import { query } from '../utils/query.js';
export async function saveUrl(shortenedUrl, url, clicks, createdAt) {
    try {
        await query(`
            INSERT INTO urls (shortened_url, url, total_clicks, created_at)
            VALUES ($1, $2, $3, $4)
            `, [shortenedUrl, url, clicks, createdAt]);
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
