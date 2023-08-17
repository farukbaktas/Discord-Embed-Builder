import { t } from "i18next"
import member_Schema from "../database/schema/member.js"

/**
* 
* @param {import("discord.js").ChatInputCommandInteraction} interaction 
*/
export const add_blackList = async (interaction, user, reason, time) => {
    await interaction.deferReply({ ephemeral: true })

    const { e } = interaction.client

    if (!user) return interaction.editReply(e.errorEmbed(t("blackList.error_text.user")))
    if (!time) return interaction.editReply(e.errorEmbed(t("blackList.error_text.time")))
    if (!reason) return interaction.editReply(e.errorEmbed(t("blackList.error_text.reason")))

    if (time == "unlimited") await member_Schema.updateOne({ member_id: user.id }, { $set: { "status.black_list.status": true, "status.black_list.unlimited": true }}, { upsert: true }).then(() => interaction.editReply(e.successEmbed(t("blackList.done_text.register", { user_id: interaction.user.id }))))
    else await member_Schema.updateOne({ member_id: user.id }, { $set: { "status.black_list.status": true, "status.black_list.reason": reason, "status.black_list.time": time.replace("weekly", Date.now() + 604800000).replace("monthly", Date.now() + 2419200000).replace("yearly", Date.now() + 31557600000) }}, { upsert: true }).then(() => interaction.editReply(e.successEmbed(t("blackList.done_text.register", { user_id: interaction.user.id }))))
}