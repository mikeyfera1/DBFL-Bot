const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const getTopTDPlayers = require('../../utils/getTopTDPlayers');
const getTopINTPlayers = require('../../utils/getTopINTPlayers');
const getTopYDPlayers = require('../../utils/getTopYDPlayers');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('This is a command for the current stat leaders in the league'),
    async execute(interaction, client) {

        // Send public message to the channel, so that people can see you used a command without seeing it
        await interaction.reply({
            content: `${interaction.user.username} just checked out DBFL's Leaderboard! 📊`,
            ephemeral: false
        });

        const topTDPlayers = await getTopTDPlayers('1xREw4GOWNdrfecTE13t4uWIstXvR5WdhGiwK1PjLWXE')
        const topINTPlayers = await getTopINTPlayers('1xREw4GOWNdrfecTE13t4uWIstXvR5WdhGiwK1PjLWXE')
        const topYDPlayers = await getTopYDPlayers('1xREw4GOWNdrfecTE13t4uWIstXvR5WdhGiwK1PjLWXE')
        
        const embed = new EmbedBuilder()
        .setTitle(`🏆 DBFL Stat Leaders 🏆`)
        .setColor(0xac2928)
        .addFields([
            { name: '🔥 Touchdown Leaders', value: '\u200B' },
            ...topTDPlayers.map((p, i) => ({
                name: `${i + 1}. ${p.name}`,
                value: `**${p.tds}** Touchdowns`,
                inline: false
            })),
    
            { name: '🛡️ Interception Leaders', value: '\u200B' },
            ...topINTPlayers.map((p, i) => ({
                name: `${i + 1}. ${p.name}`,
                value: `**${p.ints}** Interceptions`,
                inline: false
            })),
    
            { name: '🚀 Yardage Leaders', value: '\u200B' },
            ...topYDPlayers.map((p, i) => ({
                name: `${i + 1}. ${p.name}`,
                value: `**${p.yds}** Yards`,
                inline: false
            }))
        ])
        .setFooter({ text: 'Check back next week for updated stats!' })
        .setTimestamp();

        // Making the embed only visible to the user to promote more usage
        await interaction.followUp({
            embeds: [embed],
            ephemeral: true
        });
    },
};