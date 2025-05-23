const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('upload')
        .setDescription('Upload Stats to DBFL Bot'),
    async execute(interaction, client) {
        await interaction.reply({
            content: `${interaction.user.username} is uploading stats!! 📊`,
            ephemeral: false
        });

        await interaction.followUp({
            content: `Upload Your Stats Now (**DBManager**)\nhttps://forms.gle/tbf3xgPSqNb1tzV8A`,
            ephemeral: true
        });
    },
};