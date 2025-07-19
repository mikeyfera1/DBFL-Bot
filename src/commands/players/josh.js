const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const getPlayerAchievements = require('../../utils/achievements');
const { google } = require('googleapis');
const sheets = google.sheets('v4');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('josh')
        .setDescription('Player Statistics for Josh Brositz'),
    async execute(interaction, client) {
        // Send public message to the channel, so that people can see you used a command without seeing it
        await interaction.reply({
            content: `${interaction.user.username} just checked out Josh Brositz's stats! 📊`,
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
            range: 'DBFL Records (2025 Edition)!C17:T17'
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

        getPlayerAchievements(client,'1xREw4GOWNdrfecTE13t4uWIstXvR5WdhGiwK1PjLWXE', 'Josh', 17, touchdowns, yards, def_ints, filler1, filler2, filler3);


        const embed = new EmbedBuilder()
        .setTitle(`Josh Brositz`)
        .setColor(0xac2928)
        .setThumbnail('https://cdn.discordapp.com/attachments/1220085546190110900/1362058866057281558/DBFL_BB_B_Rating.png?ex=680a3e2b&is=6808ecab&hm=abe7723f5095c04341704bb571cecb000b8f1ae2d561dea04c1cadc68242a711&')
        .setImage('https://media.discordapp.net/attachments/1220085546190110900/1362137351572164720/Josh_DBFL_2025.gif?ex=6815bc03&is=68146a83&hm=d061f7f92a0e6c4d3b4d04e7074f6983313982e8cd19664e7dc682410521dc4b&=&width=1392&height=1392')
        .setFooter({
            text: 'Make sure to check out other player statistics!!!'
        })
        .addFields([
            {name: 'Record', value: `*${wins}-${losses}*`},
            {name: 'Position', value: 'WR'},
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