const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('schedule')
        .setDescription('Current DBFL Schedule'),
    async execute(interaction, client) {

        // Send public message to the channel, so that people can see you used a command without seeing it
        await interaction.reply({
            content: `${interaction.user.username} just checked out DBFL's Schedule! 📊`,
            ephemeral: false
        });

        const embed = new EmbedBuilder()
        .setTitle(`Current DBFL Schedule`)
        .setColor(0xac2928)
        // .setImage('https://cdn.discordapp.com/attachments/753687727312076841/1220820552575619143/DBFL_ALERT_6.png?ex=661054bd&is=65fddfbd&hm=f6cb1ee5a6bd03b9d30d34c51a91458ee6b6ccaa02b96b62211a9d1af302f228&')
        .addFields([
            {name: 'Week 1', value: 'Saturday (**May 24th**) 10:30am - 12:00pm @ Boyce Field (*TESTING WEEK*)'},
            {name: 'Week 2', value: 'Saturday (**May 31st**) 10:30am - 12:00pm @ Boyce Field '},
            {name: 'Week 3', value: 'Saturday (**June 7th**) 10:30am - 12:00pm @ Boyce Field'},
            {name: 'Week 4', value: 'Saturday (**June 14th**) 10:30am - 12:00pm @ Boyce Field'},
            {name: 'Week 5', value: 'Saturday (**June 21st**) 10:30am - 12:00pm @ Boyce Field'},
            {name: 'Week 6', value: 'Saturday (**June 28th**) 10:30am - 12:00pm @ Boyce Field'},
            {name: 'Week 7', value: 'Saturday (**July 5th**) 10:30am - 12:00pm @ Boyce Field'},
            {name: 'Week 8', value: 'Saturday (**July 12th**) 10:30am - 12:00pm @ Boyce Field (***PLAYOFFS***)'},

        ]);

        await interaction.followUp({
            embeds: [embed],
            ephemeral: true
        });
    },
};