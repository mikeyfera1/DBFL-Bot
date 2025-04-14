const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaders')
        .setDescription('This is a command for the current stat leaders in the league'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setTitle(`DBFL Stats Leaders`)
        .setDescription('Updated (Week 5)')
        .setColor(0xffffff)
        .addFields([
            {name: 'Touchdowns', value: '1. Mikey **(49)**\n2. Bear **(30)**\n3. (Ritvik / Allen) **(22)**'},
            {name: 'Picks (DEF)', value: '1. Bear **(12)**\n2. Alex **(7)**\n3. (John / Mikey / Ben) **(4)**'},
            {name: 'Interceptions (QB)', value: '1. John **(7)**\n2. Allen **(6)**\n3. Ben **(4)**'},
        ]);

        await interaction.reply({
            embeds: [embed]
        });
    },
};