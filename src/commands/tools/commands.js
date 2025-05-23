const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('commands')
        .setDescription('Commands for the DBFL Bot'),
    async execute(interaction, client) {

        // Send public message to the channel, so that people can see you used a command without seeing it
        await interaction.reply({
            content: `${interaction.user.username} just checked out DBFL's Commands! 📊`,
            ephemeral: false
        });

        const embed = new EmbedBuilder()
        .setTitle(`Commands`)
        .setDescription('Current Commands for the DBFL Bot')
        .setColor(0xac2928)
        .setImage('https://cdn.discordapp.com/attachments/1220085546190110900/1220804984262627338/DBFL_ALERT_4.png?ex=6610463d&is=65fdd13d&hm=50f86b72b4e0c548bb7709758d272b4227d72e34dfb04d0716f22c8b4856dbca&')
        .setFooter({
            text: 'Copyright @DBFLBot 2025'
        })
        .addFields([
            {name: 'commands', value: 'Current DBFL Commands'},
            {name: 'player\'s first name', value: 'Individual Stats'},
            {name: 'upload', value: 'Uploading Stats'},
            {name: 'roster', value: 'Current DBFL Roster'},
            {name: 'leaderboard', value: 'DBFL Stat Leaderboard'},
        ]);

        await interaction.followUp({
            embeds: [embed],
            ephemeral: true
        });
    },
};