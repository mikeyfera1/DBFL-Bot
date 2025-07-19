const { google } = require('googleapis');
const sheets = google.sheets('v4');

module.exports = {
    data: {
        name: `upload-info`
    },
    async execute(interaction, client) {

        // DBFL Player ID Database
        let players = {
            "squiggles2612": 1464,
            "grzzlbr": 4233,
            "cybernaut": 4233,
            "pbjbananaboi23": 3584,
            "ritvik21": 3233,
            "big.frank9": 1918,
            "aidenshaff": 2263,
            "sha1243": 2263,
            "louliberatore72": 2164,
            "gauc6746": 11103,
            "bordo576": 4123,
            "allenho.": 2104,
            "phynds45": 2194,
            "john_549": 8464,
            "michael_sb28": 2103,
            "idrnkjuice": 6599,
            "joshbros": 2823,
            "_beshi_": 7234,
            "that_dude_05": 4874,
            "ecig0661": 6434,
            "gf1n.": 1415
        }

        const id = players[interaction.user.username];
        const passTDs = interaction.fields.getTextInputValue("passTDInfo") || 0;
        const recTDs = interaction.fields.getTextInputValue("recTDInfo") || 0;
        const ints = interaction.fields.getTextInputValue('intInfo') || "0,0";
        const [offINTs, defINTs] = ints.split(',').map(v => v.trim() || "0");
        const recs = interaction.fields.getTextInputValue("recInfo") || 0;
        const yards = interaction.fields.getTextInputValue("yardsInfo") || 0;

        const auth = new google.auth.GoogleAuth({
            keyFile: 'credentials.json',
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });

        const authClient = await auth.getClient();

        const spreadsheetId = '1YKy7yLZcFY7h4hDHQsKnAK2QmE6xKCMbqhpua7j6H3U';
        const range = 'DBManager!A:H';

        const values = [[new Date().toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second:'2-digit',
            hour12: false,
            timeZone: 'America/New_York'
        }), id, passTDs, defINTs, offINTs, yards, recs, recTDs]];

        await sheets.spreadsheets.values.append({
            auth: authClient,
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            requestBody: {
                values: values
            }
        });

        await interaction.reply({
            content: `${interaction.user.username} just uploaded stats!! 📊`, ephemeral: false
        });
    }
}