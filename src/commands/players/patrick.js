const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('patrick')
        .setDescription('Player Statistics for Patrick Hynds'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setTitle(`Patrick Hynds`)
        .setColor(0xada16f)
        .setThumbnail('https://cdn.discordapp.com/attachments/1220085546190110900/1220095524473016390/Ratings_B.png?ex=660db181&is=65fb3c81&hm=ec641d3a360a5a050a597ab0da1bcb72b3e321f380caf26e0deff8410a9bbfe2&')
        .setImage('https://cdn.discordapp.com/attachments/753687727312076841/1253460653805539459/Patrick_DBFL.png?ex=6675efb4&is=66749e34&hm=5647c32e78bb16684ceed827749a3cf4054eeff0307bc1a84974ae0eab87ffb8&')
        .setFooter({
            text: 'Make sure to check out other player statistics!!!'
        })
        .addFields([
            {name: 'Position', value: 'WR'},
            {name: 'Touchdowns', value: '19(1) TDS (*14th*)'},
            {name: 'INTS (OFF)', value: '2(0) INTS (*20+*)'},
            {name: 'INTS (DEF)', value: '8(1) INTS (*9th*)'},
            {name: 'Rating', value: '**85** OVR'}
        ]);

        await interaction.reply({
            embeds: [embed]
        });
    },
};