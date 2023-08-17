import member_Schema from "../database/schema/member.js"

/**
* 
* @param {import("discord.js").ChatInputCommandInteraction} interaction 
*/
export const control_premium = async (client) => {
    setInterval(async () => {
    const members = await member_Schema.find()

    members.forEach(async (member) => {
        
        if (member?.premium?.unlimited) return

        if (member?.premium?.time < Date.now()) await member_Schema.updateOne({ member_id: member?.member_id }, { $set: { "premium.status": false, "premium.unlimited": false }}, { upsert: true })
    })
}, 1000)
}