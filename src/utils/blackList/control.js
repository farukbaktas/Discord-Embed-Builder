import member_Schema from "../database/schema/member.js"

/**
* 
* @param {import("discord.js").ChatInputCommandInteraction} interaction 
*/
export const control_blackList = async (client) => {
    setInterval(async () => {
    const members = await member_Schema.find()

    members.forEach(async (member) => {

        if (member?.status?.black_list?.status) client.guilds.cache.get(process.env.SUPPORT_SERVER)?.members.ban(member?.member_id).catch(() => { })
        else client.guilds.cache.get(process.env.SUPPORT_SERVER)?.members.unban(member?.member_id).catch(() => { })
        
        if (member?.status?.black_list?.unlimited) return

        if (member?.status?.black_list?.time < Date.now()) await member_Schema.updateOne({ member_id: member?.member_id }, { $set: { "status.black_list.status": false, "status.black_list.unlimited": false }}, { upsert: true })
    })
}, 10000)
}