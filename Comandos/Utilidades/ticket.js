const Discord = require("discord.js");

module.exports = {
  name: "ticket",
  description: "Clique para mandar o painel de ticket.",
  options: [
    {
      name: "canal",
      description: "Canal que a mensagem de ticket será enviada.",
      type: Discord.ApplicationCommandOptionType.Channel,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    if (
      !interaction.member.permissions.has(
        Discord.PermissionFlagsBits.Administrator
      )
    )
      return interaction.reply({
        content: `❌ **Calma! Você precisar ser um admin para usar o meu sistema de ticket!**`,
        ephemeral: true,
      });
    else {
      let canal = interaction.options.getChannel("canal");

      let modal = new Discord.ModalBuilder()
        .setCustomId("modal")
        .setTitle("Configuração basica do ticket");

      let titu = new Discord.TextInputBuilder()
        .setCustomId("titulo")
        .setLabel("Titulo")
        .setStyle(Discord.TextInputStyle.Short)
        .setPlaceholder("Digite o titulo (Primeira Linha)")
        .setRequired(true);

      let desc = new Discord.TextInputBuilder()
        .setCustomId("descrição")
        .setLabel("Descrição da mensagem")
        .setStyle(Discord.TextInputStyle.Paragraph)
        .setPlaceholder("Digite a Descrição.");

      const titulo = new Discord.ActionRowBuilder().addComponents(titu);
      const descrição = new Discord.ActionRowBuilder().addComponents(desc);

      modal.addComponents(titulo, descrição);

      await interaction.showModal(modal);

      const modalInteraction = await interaction.awaitModalSubmit({
        filter: (i) => i.user.id === interaction.user.id,
        time: 1200000_000,
      });

      const titul = modalInteraction.fields.getTextInputValue("titulo");
      const descs = modalInteraction.fields.getTextInputValue("descrição");

      let embed = new Discord.EmbedBuilder()
        .setColor("000000")
        .setTitle(`Sistema de Chamados - Mutant Whats`)
        .setAuthor({
          name: "Mutant Whats",
          iconURL:
            "https://media.discordapp.net/attachments/1058066137067294811/1058070235682443285/discord_bot.png?width=683&height=683",
        })
        .setFooter({
          text: "Mutant Whats",
          iconURL:
            "https://media.discordapp.net/attachments/1058066137067294811/1058070235682443285/discord_bot.png?width=683&height=683",
        })
        .setTimestamp()
        .setDescription(`${descs}`);

      let button = new Discord.SelectMenuBuilder()
        .setCustomId("Select")
        .setPlaceholder("Selecione uma opção")
        .addOptions([
          {
            label: `Ativação de Número`, // Nome da opção
            value: "op1", // Value para criar o ticket / NÃO MUDE O NOME
            emoji: "🆔", // Emoji da opção
          },
          {
            label: `Troca de Número`,
            value: "op2",
            emoji: "✅",
          },
          {
            label: `Cancelamento de Número`,
            value: "op3",
            emoji: "❌",
          },
        ]);

      const row = new Discord.ActionRowBuilder().addComponents(button);

      canal.send({ embeds: [embed], components: [row] });

      await modalInteraction.deferUpdate();
    }
  },
};
