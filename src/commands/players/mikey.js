const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('mikey')
        .setDescription('Player Statistics for Mikey Fera'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setTitle(`Mikey Fera`)
        .setColor(0x0cc0df)
        .setThumbnail('https://cdn.discordapp.com/attachments/752530922905010261/1217957539132477470/Ratings_A.png?ex=6605ea59&is=65f37559&hm=ba8d89c2fffca583e796318e25522917c97c80031bb6d6d4dfa99e91dfbfdc14&')
        .setImage('https://cdn.discordapp.com/attachments/752530922905010261/1217957168599273602/Bear_DBFL_1.png?ex=6605ea01&is=65f37501&hm=230b539f9a25f5a66034d0b4861e6d2265cf82d4a8f022fd7059972ced06938c&')
        .setFooter({
            text: 'Make sure to check out other player statistics!!!'
        })
        .addFields([
            {name: 'Team', value: 'D.C Wizards'},
            {name: 'Position', value: 'QB'},
            {name: 'Touchdowns', value: '110(49) TDS (*1st*)'},
            {name: 'INTS (OFF)', value: '7(1) INTS (*10th*)'},
            {name: 'INTS (DEF)', value: '17(4) INTS (*3rd*)'},
            {name: 'Rating', value: '**93** OVR'}
        ]);

        await interaction.reply({
            embeds: [embed]
        });
    },
};