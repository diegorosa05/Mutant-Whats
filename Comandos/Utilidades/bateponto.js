const Discord = require("discord.js");
const moment = require("moment");
const {
  ApplicationCommandType,
  ActionRowBuilder,
  EmbedBuilder,
  ComponentType,
} = require("discord.js");

module.exports = {
  name: "bate-ponto",
  description: "Bata Seu Ponto",
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction, options, message) => {
    var canal = client.channels.cache.get(interaction.channel.id);
    interaction.reply(".").then((msg) => interaction.deleteReply());
    let terminar = new ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder()
        .setCustomId("terminar")
        .setLabel("Finalizar")
        .setStyle("Danger")
    );

    let embed = new EmbedBuilder()
      .setTitle(`Sistema de Pausa - Mutant Whats`)
      .setThumbnail(
        interaction.user.displayAvatarURL({
          format: "png",
          dinamyc: true,
          size: 4096,
        })
      )
      .setFields(
        {
          name: "Usuário:",
          value: `${interaction.user.username}\n> ${interaction.user.id}`,
          inline: false,
        },
        {
          name: "Data/Horário:",
          value: `<t:${moment(
            interaction.createdTimestamp
          ).unix()}>(<t:${parseInt(interaction.createdTimestamp / 1000)}:R>)`,
          inline: true,
        },
        {
          name: "**Informações:**",
          value: "Sua pausa ainda não foi finalizada",
          inline: true,
        }
      )
      .setColor("000000")
      .setFooter({
        text: "Ponto - Andamento",
        iconURL:
          "https://media.discordapp.net/attachments/1058066137067294811/1058070235682443285/discord_bot.png?width=683&height=683",
      });
    const msg = await canal.send({ embeds: [embed], components: [terminar] });

    const collector = msg.createMessageComponentCollector({
      componentType: ComponentType.Button,
    });

    collector.on("collect", async (i) => {
      if (i.user.id != interaction.user.id)
        return collected.reply({
          content: `❌ \`|\` **Somente a pessoa que executou o comando (\`${interaction.user.tag}\`) pode interagir com ele.**`,
          ephemeral: true,
        });

      if (i.customId === "terminar") {
        const terminou = new EmbedBuilder()
          .setTitle(`Sistema de Pausa - Mutant Whats`)
          .setThumbnail(
            interaction.user.displayAvatarURL({
              format: "png",
              dinamyc: true,
              size: 4096,
            })
          )
          .setFields(
            {
              name: "Usuário:",
              value: `${interaction.user.username}\n> ${interaction.user.id}`,
              inline: false,
            },
            {
              name: "Data/Horário:",
              value: `<t:${moment(
                interaction.createdTimestamp
              ).unix()}>(<t:${parseInt(
                interaction.createdTimestamp / 1000
              )}:R>)`,
              inline: true,
            },
            {
              name: "**Informações:**",
              value: "Pausa Finalizada",
              inline: true,
            }
          )
          .setColor("000000")
          .setFooter({
            text: "Ponto - Encerrado",
            iconURL:
              "https://media.discordapp.net/attachments/1058066137067294811/1058070235682443285/discord_bot.png?width=683&height=683",
          });
        i.update({
          embeds: [terminou],
          components: [],
        });
      }
    });
  },
};
