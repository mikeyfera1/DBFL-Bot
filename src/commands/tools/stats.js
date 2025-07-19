const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const getPlayerAchievements = require('../../utils/achievements');
const { google } = require('googleapis');
const sheets = google.sheets('v4');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Calculates Stats for Each Player from Each Game')
        .addStringOption(option =>
            option.setName('date')
                .setDescription('Date of the Game')
                .setRequired(true)),
    async execute(interaction, client) {
        
        if (interaction.user.username != "nsnpdleagueadmin" && interaction.user.username != "squiggles2612") {
            await interaction.reply({
                content: `${interaction.user.username} doesn't have access to stats :( 📊`,
                ephemeral: false
            });
        }

        else {
            // Send public message to the channel, so that people can see you used a command without seeing it
            await interaction.reply({
                content: `${interaction.user.username} Calculated Stats! 📊`,
                ephemeral: false
            });
    
            const auth = new google.auth.GoogleAuth({
                keyFile: 'credentials.json',
                scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
            });
    
            const authClient = await auth.getClient();
    
            const response = await sheets.spreadsheets.values.get({
                auth: authClient,
                spreadsheetId: '1YKy7yLZcFY7h4hDHQsKnAK2QmE6xKCMbqhpua7j6H3U',
                range: 'DBManager!A34:H700'
            });
    
            const values = response.data.values;
            
            // console.log(values);
    
            const gameDate = interaction.options.getString('date');
    
            let ids = {
                "1464": "Mikey",
                "3584": "Alex",
                "4233": "Bear",
                "3233": "Ritvik",
                "1918": "Franco",
                "2263": "Aiden",
                "2164": "Louie",
                "11103": "Cole",
                "4123": "Ben",
                "2104": "Allen",
                "2194": "Patrick",
                "8464": "John",
                "2103": "Michael",
                "6599": "Aidan",
                "2823": "Josh",
                "7234": "EJ",
                "4874": "Kyree",
                "6434": "Evan",
                "1415": "Gabe"
            }
    
            let playerStats = {
    
            }
    
            for (let i = 0; i < values.length; i++) {
                if (values[i].length == 0) {
                    continue;
                }
                let date = values[i][0].split(' ')[0];
                if (date.includes(",")) {
                    date = date.slice(0,-1);
                }
                
                if (date === gameDate) {
                    if (ids[values[i][1]] in playerStats) {
                        playerStats[ids[values[i][1]]][0] += Number(values[i][2]);
                        playerStats[ids[values[i][1]]][1] += Number(values[i][7]);
                        playerStats[ids[values[i][1]]][2] += Number(values[i][3]);
                        playerStats[ids[values[i][1]]][3] += Number(values[i][4]);
                        playerStats[ids[values[i][1]]][4] += Number(values[i][5]);
                        playerStats[ids[values[i][1]]][5] += Number(values[i][6]);
                    }
                    else {
                        playerStats[ids[values[i][1]]] = [Number(values[i][2]), Number(values[i][7]), Number(values[i][3]), Number(values[i][4]), Number(values[i][5]), Number(values[i][6])];
                    }
                }
            }
    
            let content = `**📊 Player Stats Recap: ${gameDate}: **\n`
            for (const player in playerStats) {
                content += `${player} had ${playerStats[player][0]} PASS TDs, ${playerStats[player][1]} REC TDs, ${playerStats[player][4]} YDs, and ${playerStats[player][2]} DEF INTs\n`
            }
            // console.log(playerStats);
            // Making the embed only visible to the user to promote more usage
            await interaction.followUp({
                content: content,
                ephemeral: true
            });
        }
    },
};