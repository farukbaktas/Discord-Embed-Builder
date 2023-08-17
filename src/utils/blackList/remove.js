import { t } from "i18next"
import member_Schema from "../database/schema/member.js"

/**
* 
* @param {import("discord.js").ChatInputCommandInteraction} interaction 
*/
export const remove_blackList = async (interaction, user) => {
    await interaction.deferReply({ ephemeral: true })

    const { e } = interaction.client
    if (!user) return interaction.editReply(e.errorEmbed(t("blackList.error_text.user")))

    await member_Schema.updateOne({ member_id: user.id }, { $set: { "status.black_list.status": false, "status.black_list.unlimited": false }}, { upsert: true }).then(() => interaction.editReply(e.successEmbed(t("blackList.done_text.unregister", { user_id: interaction.user.id }))))
}