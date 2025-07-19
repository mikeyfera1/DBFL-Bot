const { SlashCommandBuilder } = require('discord.js')
const cron = require('node-cron');
let isScheduled = false;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('week')
        .setDescription('Current Week for DBFL'),

    async execute(interaction, client) {

        await interaction.reply({
            content: `Weekly Schedule has been uploaded!!`,
            ephemeral: true
        });

        const channelId = '944009133332516905';

        if (!isScheduled) {
            const channel = await client.channels.fetch(channelId);

            if (!channel) {
                console.error('Channel not found');
                return;
            }

            cron.schedule('0 12 * * 4', () => {
                channel.send('@everyone\n\n**🎮 REMINDER 🎮**\n\nDBFL plays this **Saturday** from __10:00am-12:30pm__\n\nLike this message if you\'re available');
            });

            isScheduled = true; 
            console.log('Weekly game reminders scheduled!!')
        }
    },
};