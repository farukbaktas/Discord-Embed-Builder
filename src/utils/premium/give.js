import { t } from "i18next"
import member_Schema from "../database/schema/member.js"

/**
* 
* @param {import("discord.js").ChatInputCommandInteraction} interaction 
*/
export const give_premium = async (interaction, user, time) => {
    await interaction.deferReply({ ephemeral: true })

    const { e } = interaction.client

    if (!user) return interaction.editReply(e.errorEmbed(t("premium.error_text.user")))
    if (!time) return interaction.editReply(e.errorEmbed(t("premium.error_text.time")))

    if (time == "unlimited") await member_Schema.updateOne({ member_id: user.id }, { $set: { "premium.status": true, "premium.unlimited": true }}, { upsert: true }).then(() => interaction.editReply(e.successEmbed(t("premium.done_text.register", { user_id: interaction.user.id }))))
    else await member_Schema.updateOne({ member_id: user.id }, { $set: { "premium.status": true, "premium.time": time.replace("weekly", Date.now() + 604800000).replace("monthly", Date.now() + 2419200000).replace("yearly", Date.now() + 31557600000) }}, { upsert: true }).then(() => interaction.editReply(e.successEmbed(t("premium.done_text.register", { user_id: interaction.user.id }))))
}