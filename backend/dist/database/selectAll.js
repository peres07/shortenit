import { query } from './utils/query.js';
export async function selectAll() {
    try {
        const result = await query('SELECT * FROM urls');
        return result;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
