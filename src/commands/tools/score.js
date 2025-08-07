const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { google } = require('googleapis');
const sheets = google.sheets('v4');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('score')
        .setDescription('Gets the current DBFL Game Score (Live)'),

    async execute(interaction, client) {

        // await interaction.reply({
        //     content: `${interaction.user.username} just checked the live score! 📊`,
        //     ephemeral: false
        // });

        const auth = new google.auth.GoogleAuth({
            keyFile: 'credentials.json',
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
        });

        const authClient = await auth.getClient();

        let response = await sheets.spreadsheets.values.get({
            auth: authClient,
            spreadsheetId: '1xREw4GOWNdrfecTE13t4uWIstXvR5WdhGiwK1PjLWXE',
            range: 'DBFL Records (2025 Edition)!W2:W120'
        });

        const weeks = response.data.values.flat();

        const week = weeks[weeks.length - 1];
        let date = new Date().toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second:'2-digit',
            hour12: false,
            timeZone: 'America/New_York'
        });

        date = date.split(' ')[0];
        if (date.includes(",")) {
            date = date.slice(0,-1);
        }

        let index = weeks.indexOf(week);
        index += 2;

        response = await sheets.spreadsheets.values.get({
            auth: authClient,
            spreadsheetId: '1xREw4GOWNdrfecTE13t4uWIstXvR5WdhGiwK1PjLWXE',
            range: `DBFL Records (2025 Edition)!Y${index}:Z${index}`
        });

        const score = response.data.values.flat();

        response = await sheets.spreadsheets.values.get({
            auth: authClient,
            spreadsheetId: '1xREw4GOWNdrfecTE13t4uWIstXvR5WdhGiwK1PjLWXE',
            range: `DBFL Records (2025 Edition)!V2:V120`
        });

        const dates = response.data.values.flat();

        const gameDate = dates[dates.length - 1]

        if (date != gameDate) {
            await interaction.reply({
                content: `Sorry!! Wrong Date!! Check Back on the next Game Day on **${gameDate}** 📊`,
                ephemeral: false
            });
        }

        else {
            let date = new Date().toLocaleString('en-US', {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second:'2-digit',
                hour12: false,
                timeZone: 'America/New_York'
            });
            const embed = new EmbedBuilder()
                .setTitle(`DBFL Live Score (WEEK ${week})`)
                .setDescription(`Last Updated - ${date}`)
                .setColor(0xac2928)
                .setFooter({
                    text: 'Make sure to check out the score every once in a while'
                })
                .addFields([
                    {name: 'Team One', value: `*${score[0]}*`},
                    {name: 'Team Two', value: `*${score[1]}*`},
                ]);
                

            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        }
    },
};