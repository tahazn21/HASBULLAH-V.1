const Discord = require("discord.js")

module.exports = {

    name: "clear",
    description: "Pour effacer des messages en quantité souhaiter",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "Modérations",
    options: [
        {
            type: "number",
            name: "nombre",
            description: " Le nombre de message à supprimer",
            required: true,
            autocomplete: false, 
        },{
            type: "channel",
            name: "salon",
            description: "Le salon où effacer le message",
            required: false,
            autocomplete: false, 
        } 
    ],

    async run(bot, interaction) {

        let channel = interaction.options.getChannel("salon")
        if(!channel) channel = interaction.channel;
        if(channel.id !== interaction.channel.id && !interaction.guild.channels.cache.get(channel.id)) return interaction.reply("Aucun salon trouvée !")

        let number = interaction.options.getNumber("nombre")
        if(parseInt(number) <= 0 || parseInt(number) > 100) return interaction.reply("Il nous faut un nombre entre `0` et `100 ` inclus !")
        
        await interaction.deferReply({ephemeral: true})

        try {

            let messages =  await channel.bulkDelete(parseInt(number))

            await interaction.followUp({content: `J'ai bien suprimer \`${messages.size}\` message(s) dans le salon ${channel} !`})

        } catch (err) {

            let messages = [...(await channel.messages.fetch()).filter(msg => !msg.interaction && (Date.now() - msg.createdAt) <= 1209600000).values()]
            if (messages.length <= 0) return interaction.followUp("Aucun message à supprimer car ils datent tous de plus de 14 jours !")
            await channel.bulkDelete(messages)
            
            await interaction.followUp({content: `J'ai pu supprimé uniquement \`${messages.length}\` message(s) dans le salon ${channel} car les autres dataient de plus de 14 jours !`})
        }
    }
} 