const { SlashCommandBuilder } = require('discord.js')
const cron = require('node-cron');
let isScheduled = false;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('id')
        .setDescription('Gets a player\'s DBFL ID'),

    async execute(interaction, client) {

        let players = {
            "squiggles2612": 1464,
            "grzzlbr": 4233,
            "cybernaut": 4233,
            "pbjbananaboi23": 3584,
            "ritvik21": 3233,
            "big.frank9": 1918,
            "aidenshaff": 2263,
            "sha1243": 2263,
            "louliberatore72": 2164,
            "gauc6746": 11103,
            "bordo576": 4123,
            "allenho.": 2104,
            "phynds45": 2194,
            "john_549": 8464,
            "michael_sb28": 2103,
            "idrnkjuice": 6599,
            "joshbros": 2823,
            "_beshi_": 7234,
            "that_dude_05": 4874,
            "ecig0661": 6434,
            "gf1n.": 1415
        }

        await interaction.reply({
            content: `${interaction.user.username} just checked out their ID! 📊`,
            ephemeral: false
        });

        await interaction.followUp({
            content: `Your DBFL ID: ${players[interaction.user.username]}`,
            ephemeral: true
        });
    },
};