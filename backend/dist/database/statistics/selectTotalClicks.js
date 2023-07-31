import { query } from '../utils/query.js';
export async function selectTotalClicks() {
    try {
        const result = await query('SELECT total_clicks FROM urls');
        return result;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
