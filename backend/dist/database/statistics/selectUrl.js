import { query } from '../utils/query.js';
export async function selectUrl(shortenedUrl) {
    try {
        const result = await query('SELECT * FROM urls WHERE shortened_url = $1', [shortenedUrl]);
        if (result.rowCount === 0) {
            return false;
        }
        return result.rows[0];
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
