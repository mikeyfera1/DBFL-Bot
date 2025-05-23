const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { google } = require('googleapis');
const sheets = google.sheets('v4');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('franco')
        .setDescription('Player Statistics for Franco Liberatore'),
    async execute(interaction, client) {

        // Send public message to the channel, so that people can see you used a command without seeing it
        await interaction.reply({
            content: `${interaction.user.username} just checked out Franco Liberatore's stats! 📊`,
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
                    range: 'DBFL Records (2025 Edition)!C6:T6'
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
        .setTitle(`Franco Liberatore`)
        .setColor(0xac2928)
        .setThumbnail('https://cdn.discordapp.com/attachments/1220085546190110900/1361520473925619954/DBFL_BB_A_Rating.png?ex=68010880&is=67ffb700&hm=354a09092bde8815ead3ec855a76952ca0c9b122736e29dfdd7cfe1b70a6fa0b&')
        .setImage('https://cdn.discordapp.com/attachments/1220085546190110900/1364754812163457147/Franco_DBFL_2025.gif?ex=680ad277&is=680980f7&hm=fbd106e0bb5e2b9150b3704ff8a1c71f1d8c4e1dfd5b0b7345e24e8ecd033119&')
        .setFooter({
            text: 'Make sure to check out other player statistics!!!'
        })
        .addFields([
            {name: 'Record', value: `*${wins}-${losses}*`},
            {name: 'Position', value: 'WR'},
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