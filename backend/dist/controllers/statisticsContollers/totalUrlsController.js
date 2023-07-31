import { selectTotalClicks } from '../../database/statistics/selectTotalClicks.js';
export default async function allUrls(req, res) {
    try {
        const allUrls = await selectTotalClicks();
        if (allUrls === false) {
            throw new Error('Could not get all urls');
        }
        const totalClicks = allUrls.rows.reduce((acc, curr) => acc + curr.total_clicks, 0);
        return res.status(200).json({ totalShortened: allUrls.rowCount, totalClicks });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error });
    }
}
