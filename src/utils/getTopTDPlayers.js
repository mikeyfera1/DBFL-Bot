const { google } = require('googleapis');
const sheets = google.sheets('v4');

async function getTopPlayersByTDs(sheetId, range = 'DBFL Records (2025 Edition)!A2:G18') {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });

    const authClient = await auth.getClient();

    const response = await sheets.spreadsheets.values.get({
        auth: authClient,
        spreadsheetId: sheetId,
        range: range,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
        console.log('No data found.');
        return [];
    }

    // Example assumes first column is name, second column is TDs
    const players = rows.map((row, index) => {
        const name = row[0] || `Player ${index + 1}`;
        const tds = parseInt(row[2]) + parseInt(row[3]) || 0;
        return { name, tds, raw: row };
    });

    // Sort descending by touchdowns
    const sorted = players.sort((a, b) => b.tds - a.tds);

    // Return top 3
    return sorted.slice(0, 3);
}

module.exports = getTopPlayersByTDs;