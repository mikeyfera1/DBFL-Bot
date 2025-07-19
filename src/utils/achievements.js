const { google } = require('googleapis');
const sheets = google.sheets('v4');

async function getPlayerAchievements(client, sheetId, name, num, touchdowns, yards, interceptions, td_a, yd_a, int_a) {
    const tds = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300];
    const yds = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900, 4000];
    const ints = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const authClient = await auth.getClient();

    const channel = await client.channels.fetch('1388683062493184110');

    const list_td = td_a ? td_a.split(',').map(item => Number(item.trim())) : [];
    const list_yd = yd_a ? yd_a.split(',').map(item => Number(item.trim())) : [];
    const list_int = int_a ? int_a.split(',').map(item => Number(item.trim())) : [];

    for (let i = 0; i < tds.length; i++) {
        if (touchdowns > tds[i] && !list_td.includes(tds[i])) {
            const message = await channel.send(`@everyone\n\n📢 **${name}** has achieved **${tds[i]}+** career touchdowns!!!`);
            await message.react('🔥')
            list_td.push(tds[i]);
        }
    }

    for (let i = 0; i < yds.length; i++) {
        if (yards > yds[i] && !list_yd.includes(yds[i])) {
            const message = await channel.send(`@everyone\n\n📢 **${name}** has achieved **${yds[i]}+** career offensive yards!!!`);
            await message.react('🔥')
            list_yd.push(yds[i]);
        }
    }

    for (let i = 0; i < ints.length; i++) {
        if (interceptions > ints[i] && !list_int.includes(ints[i])) {
            const message = await channel.send(`@everyone\n\n📢 **${name}** has achieved **${ints[i]}+** career interceptions!!!`);
            await message.react('🔥')
            list_int.push(ints[i]);
        }
    }

    const updated_td = list_td.join(', ');
    const updated_yd = list_yd.join(', ');
    const updated_int = list_int.join(', ');

    await sheets.spreadsheets.values.update({
        auth: authClient,
        spreadsheetId: sheetId,
        range: `DBFL Records (2025 Edition)!I${num}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [[updated_td]]
        }
    });

    await sheets.spreadsheets.values.update({
        auth: authClient,
        spreadsheetId: sheetId,
        range: `DBFL Records (2025 Edition)!N${num}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [[updated_yd]]
        }
    });

    await sheets.spreadsheets.values.update({
        auth: authClient,
        spreadsheetId: sheetId,
        range: `DBFL Records (2025 Edition)!R${num}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [[updated_int]]
        }
    });
}

module.exports = getPlayerAchievements;