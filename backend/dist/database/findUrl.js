import { query } from './utils/query.js';
export async function findUrl(url) {
    try {
        const result = await query(`
            SELECT * FROM urls
            WHERE url = $1
            `, [url]);
        if (result.rows[0] === undefined) {
            return false;
        }
        return result.rows[0];
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
