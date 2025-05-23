const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('roster')
        .setDescription('Returns the current roster of the DBFL'),
    async execute(interaction, client) {

        // Send public message to the channel, so that people can see you used a command without seeing it
        await interaction.reply({
            content: `${interaction.user.username} just checked out DBFL's Roster! 📊`,
            ephemeral: false
        });

        const embed = new EmbedBuilder()
        .setTitle(`📊 Current DBFL Roster 📊`)
        .setColor(0xac2928)
        .setImage('https://cdn.discordapp.com/attachments/1220085546190110900/1375479598782873651/DBFL_Backyard_Brawl_2.png?ex=6831d6b3&is=68308533&hm=77eeb98aae1be0685316d52640fa8c7ea29b7483b97b0115858b9c82f3c01a99&')
        .setFooter({
            text: 'Check back to see if the roster has updated!!'
        })
        .addFields([
            {name: '✅ Active Players ✅', value: '1. Mikey Fera\n2. Bear Bottonari\n3. Alex Belli\n4. Ben Bordenstein\n5. Aidan O\'Donnell\n6. Louie LIberatore\n7. Patrick Hynds\n8. Josh Brositz\n9. Elijah Blackwell\n10. Aiden Shaffer\n11. Michael Barsotti\n12. Allen Ho'}
        ]);

        await interaction.followUp({
            embeds: [embed],
            ephemeral: true
        });
    },
};