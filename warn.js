const Discord = require("discord.js")

module.exports = {

    name: "warn",
    description: "Warn un membre",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "Modérations",
    options: [
        {
            type: "user",
            name: "membre",
            description: " Le membre à warn !",
            required: true,
            autocomplete: false, 
        },{
            type: "string",
            name: "raison",
            description: "La raison du warn",
            required: false,
            autocomplete: false, 
        } 
    ],

    async run(bot, message, args, db) {

        let user = args.getUser("membre")
        if(!user) return messageLink.reply("Pas de membre !",)
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Pas de membre ! ")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raison fournis.";

        if(message.user.id ===user.id) return message.reply("Essaie pas de te warn toi même !")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne Warn le Commandant SUPREME ! ")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas warn cette être SUPERIEUR !")
        if((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Le robot ne peut pas warn cette être SUPERIEUR !")

        try{ await user.send(`${messgae.user.tag} vous à warn sur le serveur ${message.guild.name} pour la raison : \`${reason}\` !`)} catch (err) {}

        await message.reply(`Vous avez warn ${user.tag} pour la raison : \`${reason}\` avec succès !`) 

        let ID = await bot.function.createId("WARN")

        db.query(`INSERT INTO warn (guild, user, author, warn, reason, date) VALUES ('${message.guild.id}', '${user.id}', '${message.user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}', '${Date.now()}')`)
    }
} 