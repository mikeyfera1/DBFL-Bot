const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { google } = require('googleapis');
const sheets = google.sheets('v4');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mikey')
        .setDescription('Player Statistics for Mikey Fera'),
    async execute(interaction, client) {
        
        // Send public message to the channel, so that people can see you used a command without seeing it
        await interaction.reply({
            content: `${interaction.user.username} just checked out Mikey Fera's stats! 📊`,
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
            range: 'DBFL Records (2025 Edition)!C2:T2'
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
        .setTitle(`Mikey Fera`)
        .setColor(0xac2928)
        .setThumbnail('https://cdn.discordapp.com/attachments/1220085546190110900/1361520473925619954/DBFL_BB_A_Rating.png?ex=67ff0e40&is=67fdbcc0&hm=575db4adedec66f9ed52ecb302e70ce46f91ae248c0ed7613ac6ee5ddef3e0aa&')
        .setImage('https://cdn.discordapp.com/attachments/1220085502334472314/1361516693750546452/Mikey_DBFL_2025.gif?ex=67ff0abb&is=67fdb93b&hm=65baef7b69ae3bc491bc441b9ca6544864ef2cce2d4c25178c556e8f7de33768&')
        .setFooter({
            text: 'Make sure to check out other player statistics!!!'
        })
        .addFields([
            {name: 'Record', value: `*${wins}-${losses}*`},
            {name: 'Position', value: 'QB'},
            {name: 'Touchdowns', value: `${parseInt(pass_tds) + parseInt(rec_tds)} (${touchdowns}) TDS | Rank: ***${qb_rank}***`},
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