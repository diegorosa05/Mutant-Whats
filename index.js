const Discord = require("discord.js")

const discordTranscripts = require('discord-html-transcripts')

const config = require("./config.json")

const client = new Discord.Client({ 
  intents: [ 
Discord.GatewayIntentBits.Guilds
       ]
    });

module.exports = client

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})

client.on('ready', () => {
  console.log(`🔥 Estou online em ${client.user.username}!`)
})


client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token)

// Os canais criados para mostrar os tatus tem que ser canal de voz

  client.on("ready", () => {
    let canalPing = client.channels.cache.get("1058091073395757156"); // Aqui o bot irá pegar o canal pelo id (Coloque o id do canal que aparecerá o ping do bot)
    if (!canalPing) return console.log(`Canal de ping do bot não encontrado`); // Aqui o bot ira mandar no console se o canal não existir

    canalPing.setName(`📡 Ping: Calculando...`);
    setInterval(() => {
      canalPing.setName(`📡 Ping: ${client.ws.ping}ms`); // Aqui o bot vai renomear o canal para o ping do bot
    }, 1000 * 60 * 4 ); // Aqui é o tempo(delay) que vai ser alterado o nome do canal para o ping do bot (altere o 4 para os minutos desejados!)
});

// Ticket

client.on("interactionCreate", async (interaction) => {
    if (interaction.isSelectMenu()) {
      if (interaction.customId === "Select") {
        let ticket = interaction.values[0]
        if (ticket === "op1") {
  
          if (interaction.guild.channels.cache.find((c) => c.topic === interaction.user.id)) {
            interaction.reply({ content: `**Vai com calma, Você já tem um ticket aberto em ${interaction.guild.channels.cache.find(c => c.topic === interaction.user.id)}.**`, ephemeral: true })
          } else {
            interaction.guild.channels.create({
              name: `🔖・Ativacao de Numero -${interaction.user.username}`,
              type: Discord.ChannelType.GuildText,
              topic: `${interaction.user.id}`,
              parent: '1058110874990153738', //ID DA CATEGORIA QUE O TICKET SERÁ CRIADO
              permissionOverwrites: [
                {
                  id: '1050757460119531613', //ID DO CARGO QUE VERAR O TICKET
                  allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
                },
                {
                  id: '1050757460119531613', //ID DO CARGO QUE VERAR O TICKET
                  allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
                },
                {
                  id: interaction.guild.id,
                  deny: [Discord.PermissionFlagsBits.ViewChannel]
                },
                {
                  id: interaction.user.id,
                  allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
                }
              ]
            }).then((channel) => {
  
              interaction.reply({ content: `Olá ${interaction.user}, seu ticket foi aberto em ${channel}`, ephemeral: true })
  
              let embed = new Discord.EmbedBuilder()
              .setColor("#000000")
              .setDescription(`Olá ${interaction.user}, Basta enviar seu chamado do JIRA aqui!\nPara fechar este ticket, reaja com 🔒\n\n(Ao retorno do JIRA, fazer a criação do chamado e enviar nessa sala o número)\n- Chamado efetuado no JIRA:\n- MW-0000 `);
  
              let botoes = new Discord.ActionRowBuilder().addComponents(
                [
                  new Discord.ButtonBuilder()
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setLabel('Fechar')
                    .setEmoji('<:emoji_03:1023014408840024104>')
                    .setCustomId('close'),
                ]
              )
  
              channel.send({ embeds: [embed], components: [botoes] }).then(m => { m.pin() })
            })
          }
        }

        if (ticket === "op3") {
  
            if (interaction.guild.channels.cache.find((c) => c.topic === interaction.user.id)) {
              interaction.reply({ content: `**Vai com calma, Você já tem um ticket aberto em ${interaction.guild.channels.cache.find(c => c.topic === interaction.user.id)}.**`, ephemeral: true })
            } else {
              interaction.guild.channels.create({
                name: `🔖・Cancelamento de Numero - ${interaction.user.username}`,
                type: Discord.ChannelType.GuildText,
                topic: `${interaction.user.id}`,
                parent: '1058110788944023602', //ID DA CATEGORIA QUE O TICKET SERÁ CRIADO
                permissionOverwrites: [
                  {
                    id: '1050757460119531613', //ID DO CARGO QUE VERAR O TICKET
                    allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
                  },
                  {
                    id: '1050757460119531613', //ID DO CARGO QUE VERAR O TICKET
                    allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
                  },
                  {
                    id: interaction.guild.id,
                    deny: [Discord.PermissionFlagsBits.ViewChannel]
                  },
                  {
                    id: interaction.user.id,
                    allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
                  }
                ]
              }).then((channel) => {
    
                interaction.reply({ content: `Olá ${interaction.user}, seu ticket foi aberto em ${channel}`, ephemeral: true })
    
                let embed = new Discord.EmbedBuilder()
                  .setColor("#000000")
                  .setDescription(`Olá ${interaction.user}, Basta enviar seu chamado do JIRA aqui!\nPara fechar este ticket, reaja com 🔒\n\n(Ao retorno do JIRA, fazer a criação do chamado e enviar nessa sala o número)\n- Chamado efetuado no JIRA:\n- MW-0000 `);
    
                let botoes = new Discord.ActionRowBuilder().addComponents(
                  [
                    new Discord.ButtonBuilder()
                      .setStyle(Discord.ButtonStyle.Secondary)
                      .setLabel('Fechar')
                      .setEmoji('<:emoji_03:1023014408840024104>')
                      .setCustomId('close'),
                  ]
                )
    
                channel.send({ embeds: [embed], components: [botoes] }).then(m => { m.pin() })
              })
            }
          }
  
        if (ticket === "op2") {
  
          if (interaction.guild.channels.cache.find((c) => c.topic === interaction.user.id)) {
            interaction.reply({ content: `**Vai com calma, Você já tem um ticket aberto em ${interaction.guild.channels.cache.find(c => c.topic === interaction.user.id)}.**`, ephemeral: true })
          } else {
            interaction.guild.channels.create({
              name: `🔖・Troca de Numero - ${interaction.user.username}`,
              type: Discord.ChannelType.GuildText,
              topic: `${interaction.user.id}`,
              parent: '1058110732912295957', //ID DA CATEGORIA QUE O TICKET SERA CRIADO.
              permissionOverwrites: [
                {
                  id: '1050757460119531613', //ID DO CARGO QUE VERAR O TICKET
                  allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
                },
                {
                  id: '1050757460119531613', //ID DO CARGO QUE VERAR O TICKET
                  allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
                },
                {
                  id: interaction.guild.id,
                  deny: [Discord.PermissionFlagsBits.ViewChannel]
                },
                {
                  id: interaction.user.id,
                  allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
                }
              ]
            }).then((channel) => {
  
              interaction.reply({ content: `Olá ${interaction.user}, seu ticket foi aberto em ${channel}`, ephemeral: true })
  
              let embed = new Discord.EmbedBuilder()
              .setColor("#000000")
              .setDescription(`Olá ${interaction.user}, Basta enviar seu chamado do JIRA aqui!\nPara fechar este ticket, reaja com 🔒\n\n(Ao retorno do JIRA, fazer a criação do chamado e enviar nessa sala o número)\n- Chamado efetuado no JIRA:\n- MW-0000 `);
  
              let botoes = new Discord.ActionRowBuilder().addComponents(
                [
                  new Discord.ButtonBuilder()
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setLabel('Fechar')
                    .setEmoji('<:emoji_03:1023014408840024104>')
                    .setCustomId('close'),
                ]
              )
  
              channel.send({ embeds: [embed], components: [botoes] }).then(m => { m.pin() })
            })
          }
        }
        
      }
  
    } if (interaction.isButton()) {
      if (interaction.customId === "close") {
  
        let ticket = interaction.channel.topic
  
        interaction.channel.edit({
  
          permissionOverwrites: [
            { 
              id: '1050757460119531613', //ID DO CARGO QUE VERA O TICKET
              allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions],
              deny: [Discord.PermissionFlagsBits.SendMessages]
            },
            {
              id: '1050757460119531613', //ID DO CARGO QUE VERA O TICKET
              allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions],
              deny: [Discord.PermissionFlagsBits.SendMessages]
            },
            {
              deny: [Discord.PermissionFlagsBits.ViewChannel],
              id: ticket,
            },
            {
              deny: [Discord.PermissionFlagsBits.ViewChannel],
              id: interaction.guild.id,
            }
  
          ],
  
        })
  
        let embed = new Discord.EmbedBuilder()
          .setDescription(`**O ${interaction.user} Fechou o ticket \n Escolha uma opção abaixo para Deletar ou Reabrir o ticket.**`)
          .setColor('#000000')
          .setTimestamp()
  
        let botoes = new Discord.ActionRowBuilder().addComponents(
          [
            new Discord.ButtonBuilder()
              .setStyle(Discord.ButtonStyle.Success)
              .setLabel('Reabrir')
              .setCustomId('reabrir'),
            new Discord.ButtonBuilder()
              .setStyle(Discord.ButtonStyle.Danger)
              .setLabel('Deletar')
              .setCustomId('deletar'),
          ]
        )
  
        interaction.reply({ embeds: [embed], components: [botoes] })
  
      }
  
        if (interaction.customId === "reabrir") {
  
          interaction.message.delete()
  
          let ticket = interaction.channel.topic
  
          interaction.channel.edit({
  
            permissionOverwrites: [
  
              {
                id: '1050757460119531613', //ID DO CARGO QUE VERA O TICKET
                allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
              },
              {
                id: '1050757460119531613', //ID DO CARGO QUE VERA O TICKET
                allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
              },
              {
                allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions],
                id: ticket,
              },
              {
                deny: [Discord.PermissionFlagsBits.ViewChannel],
                id: interaction.guild.id,
              }
  
            ],
  
          })
  
          interaction.channel.send({ content: `<@${ticket}> seu Ticket foi reaberto por ${interaction.user}` })
        }
  
        if (interaction.customId === "deletar") {
  
          const topic = interaction.channel.topic
  
          const channel = interaction.channel
  
          const attachment = await discordTranscripts.createTranscript(channel);
  
          interaction.channel.delete()
  
          let embed = new Discord.EmbedBuilder()
          .setDescription(`Ticket de <@${topic}>\`(${topic})\` \n Deletado por ${interaction.user}\`(${interaction.user.id})\``)
          .setColor("#000000")
          .setTimestamp()
  
          interaction.guild.channels.cache.get('1058114971222945812').send({ //ID DO CANAL QUE AS LOG SERA ENVIADA
            embeds: [embed],
            files: [attachment],
          })
  
        }
  
      }
    }
  )
  