const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('upload')
        .setDescription('Upload Stats to DBFL Bot'),
    async execute(interaction, client) {
        const modal = new ModalBuilder()
                    .setCustomId(`upload-info`)
                    .setTitle(`DBManager`);

                const passTDInput = new TextInputBuilder()
                    .setCustomId("passTDInfo")
                    .setLabel(`Current Drive PASSING TDs`)
                    .setRequired(false)
                    .setStyle(TextInputStyle.Short);

                const recTDInput = new TextInputBuilder()
                    .setCustomId("recTDInfo")
                    .setLabel(`Current Drive RECEIVING TDs`)
                    .setRequired(false)
                    .setStyle(TextInputStyle.Short);

                const recInput = new TextInputBuilder()
                    .setCustomId("recInfo")
                    .setLabel(`Current Drive Receptions`)
                    .setRequired(false)
                    .setStyle(TextInputStyle.Short);

                const yardsInput = new TextInputBuilder()
                    .setCustomId("yardsInfo")
                    .setLabel(`Total Yards (Offensive)`)
                    .setRequired(false)
                    .setStyle(TextInputStyle.Short);

                const intInput = new TextInputBuilder()
                    .setCustomId("intInfo")
                    .setLabel(`Current Drive OFF or DEF INTs (OFF, DEF)`)
                    .setRequired(false)
                    .setStyle(TextInputStyle.Short);
        
                const passTDActionRow = new ActionRowBuilder().addComponents(passTDInput);
                const recTDActionRow = new ActionRowBuilder().addComponents(recTDInput);
                // const offINTActionRow = new ActionRowBuilder().addComponents(offINTInput);
                const recActionRow = new ActionRowBuilder().addComponents(recInput);
                const yardsActionRow = new ActionRowBuilder().addComponents(yardsInput);
                const intActionRow = new ActionRowBuilder().addComponents(intInput);
                modal.addComponents(passTDActionRow, recTDActionRow, recActionRow, yardsActionRow, intActionRow);
        
                await interaction.showModal(modal);

        // await interaction.reply({
        //     content: `${interaction.user.username} is uploading stats!! 📊`,
        //     ephemeral: false
        // });
        
    },
};