const Discord = require ("discord.js")

module.exports = {

    name: "kick",
    description: "exclure un membre du serveur",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    category: "Modérations",
    options: [
        {
            type: "user",
            name: "membre",
            description: "le membre à kick",
            required: true,
            autocomplete: false,
        }, {
            type: "string",
            name: "raison",
            description: "la raison du kick",
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args) {
            
        let user = args.getUser("membre")
        if(!user) return message.reply("Pas de membre à kick !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Pas de membre à kick !")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raison fournie."

        if(message.user.id ===user.id) return message.reply("Essaie pas de te kick !")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne kick pas le Commandant SUPREME ! ")
        if(member && !member.kickable) return message.reply("Je ne peux pas kick ce membre !")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas kick cette être SUPERIEUR !")

        try {await user.send(`Tu as étais kick du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)} catch(err) {}

        await message.reply(`${message.user} à kick ${user.tag} pour la raison : \`${reason}\``)

        await member.kick(reason)
    }
}