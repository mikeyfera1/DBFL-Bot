const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { google } = require('googleapis');
const sheets = google.sheets('v4');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('aiden')
        .setDescription('Player Statistics for Aiden Shaffer'),
    async execute(interaction, client) {

        await interaction.reply({
            content: `${interaction.user.username} just checked out Aiden Shaffer's stats! 📊`,
            ephemeral: false
        });

        const auth = new google.auth.GoogleAuth({
                    keyFile: 'credentials.json',
                    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
                });
        
                const authClient = await auth.getClient();
        
                const response = await sheets.spreadsheets.values.get({
                    auth: authClient,
                    spreadsheetId: '1xREw4GOWNdrfecTE13t4uWIstXvR5WdhGiwK1PjLWXE',
                    range: 'DBFL Records (2025 Edition)!C7:T7'
                });
        
                const values = response.data.values.flat();
        
                const [
                    pass_tds,
                    rec_tds,
                    off_yds,
                    ints_qb,
                    ints_def,
                    rating,
                    filler1,
                    touchdowns,
                    yards,
                    off_ints,
                    def_ints,
                    filler2,
                    qb_rank,
                    wr_rank,
                    def_rank,
                    filler3,
                    wins,
                    losses
                ] = values;
        const embed = new EmbedBuilder()
        .setTitle(`Aiden Shaffer`)
        .setColor(0xac2928)
        .setThumbnail('https://cdn.discordapp.com/attachments/1220085546190110900/1361520473925619954/DBFL_BB_A_Rating.png?ex=68010880&is=67ffb700&hm=354a09092bde8815ead3ec855a76952ca0c9b122736e29dfdd7cfe1b70a6fa0b&')
        .setImage('https://cdn.discordapp.com/attachments/1220085546190110900/1364755539451449486/Aiden_DBFL_2025.gif?ex=680ad324&is=680981a4&hm=5f4f7a4113b6b746324514525c006003c417a7ffea82aa42f9d2b324c62f5342&')
        .setFooter({
            text: 'Make sure to check out other player statistics!!!'
        })
        .addFields([
            {name: 'Record', value: `*${wins}-${losses}*`},
            {name: 'Position', value: 'WR/TE'},
            {name: 'Touchdowns', value: `${parseInt(pass_tds) + parseInt(rec_tds)} (${touchdowns}) TDS | Rank: ***${qb_rank}***`},
            {name: 'YARDS (OFF)', value: `${off_yds} (${yards}) YDS`},
            {name: 'INTS (OFF)', value: `${ints_qb} (${off_ints}) INTS`},
            {name: 'INTS (DEF)', value: `${ints_def} (${def_ints}) INTS | Rank: ***${def_rank}***`},
            {name: 'Rating', value: `**${rating}** OVR`}
        ]);

        await interaction.followUp({
            embeds: [embed],
            ephemeral: true
        });
    },
};