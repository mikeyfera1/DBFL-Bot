const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const getPlayerAchievements = require('../../utils/achievements');
const { google } = require('googleapis');
const sheets = google.sheets('v4');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('elijah')
        .setDescription('Player Statistics for Elijah Blackwell'),
    async execute(interaction, client) {
        // Send public message to the channel, so that people can see you used a command without seeing it
        await interaction.reply({
            content: `${interaction.user.username} just checked out Elijah Blackwell's stats! 📊`,
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
            range: 'DBFL Records (2025 Edition)!C18:T18'
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

        getPlayerAchievements(client,'1xREw4GOWNdrfecTE13t4uWIstXvR5WdhGiwK1PjLWXE', 'EJ', 18, touchdowns, yards, def_ints, filler1, filler2, filler3);


        const embed = new EmbedBuilder()
        .setTitle(`Elijah Blackwell`)
        .setColor(0xac2928)
        .setThumbnail('https://cdn.discordapp.com/attachments/1220085546190110900/1361520473925619954/DBFL_BB_A_Rating.png?ex=68010880&is=67ffb700&hm=354a09092bde8815ead3ec855a76952ca0c9b122736e29dfdd7cfe1b70a6fa0b&')
        .setImage('https://media.discordapp.net/attachments/1220085546190110900/1362137266146770964/Elijah_DBFL_2025.gif?ex=6815bbef&is=68146a6f&hm=7f6ad2b6baa70efd996335f0ae3b6b1e6a22d467347f9e235b8e67dbaaf979c6&=&width=1392&height=1392')
        .setFooter({
            text: 'Make sure to check out other player statistics!!!'
        })
        .addFields([
            {name: 'Record', value: `*${wins}-${losses}*`},
            {name: 'Position', value: 'N/A'},
            {name: 'Touchdowns', value: `${parseInt(pass_tds) + parseInt(rec_tds)} (${touchdowns}) TDS | QB Rank: ***${qb_rank}*** | WR Rank: ***${wr_rank}***`},
            {name: 'YARDS (OFF)', value: `${off_yds} (${yards}) YDS`},
            {name: 'INTS (OFF)', value: `${ints_qb} (${off_ints}) INTS`},
            {name: 'INTS (DEF)', value: `${ints_def} (${def_ints}) INTS | Rank: ***${def_rank}***`},
            {name: 'Rating', value: `**${rating}** OVR`}
        ]);

        // Making the embed only visible to the user to promote more usage
        await interaction.followUp({
            embeds: [embed],
            ephemeral: true
        });
    },
};