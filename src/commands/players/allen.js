const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const getPlayerAchievements = require('../../utils/achievements');
const { google } = require('googleapis');
const sheets = google.sheets('v4');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('allen')
        .setDescription('Player Statistics for Allen Ho'),
    async execute(interaction, client) {

        // Send public message to the channel, so that people can see you used a command without seeing it
        await interaction.reply({
            content: `${interaction.user.username} just checked out Allen Ho's stats! 📊`,
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
                    range: 'DBFL Records (2025 Edition)!C11:T11'
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

                getPlayerAchievements(client,'1xREw4GOWNdrfecTE13t4uWIstXvR5WdhGiwK1PjLWXE', 'Allen', 11, touchdowns, yards, def_ints, filler1, filler2, filler3);


        const embed = new EmbedBuilder()
        .setTitle(`Allen Ho`)
        .setColor(0xac2928)
        .setThumbnail('https://cdn.discordapp.com/attachments/1220085546190110900/1362058866057281558/DBFL_BB_B_Rating.png?ex=680a3e2b&is=6808ecab&hm=abe7723f5095c04341704bb571cecb000b8f1ae2d561dea04c1cadc68242a711&')
        // .setImage('https://cdn.discordapp.com/attachments/1220085546190110900/1220171767662772254/Adam_DBFL.png?ex=660df883&is=65fb8383&hm=2b89ba4b2e5e1bb2ef040a4cdda05719b4121dddeae0587092fd859f5b27b6ff&')
        .setFooter({
            text: 'Make sure to check out other player statistics!!!'
        })
        .addFields([
            {name: 'Record', value: `*${wins}-${losses}*`},
            {name: 'Position', value: 'QB/WR'},
            {name: 'Touchdowns', value: `${parseInt(pass_tds) + parseInt(rec_tds)} (${touchdowns}) TDS | QB Rank: ***${qb_rank}*** | WR Rank: ***${wr_rank}***`},
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