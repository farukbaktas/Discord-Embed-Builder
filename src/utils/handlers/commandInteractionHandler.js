import { Colors } from "discord.js"
import { t } from "i18next"
import { cooldownCheck } from "../cooldown.js"
import chalk from "chalk"

import member_Schema from "../database/schema/member.js"
/**
 * @param {import("discord.js").ChatInputCommandInteraction} interaction
 */
export default async (interaction) => {

    const { commandName, guild } = interaction
    const { e } = interaction.client
    const command = interaction.client.commands.get(commandName)

    if (!command) return console.log(chalk.red("There is no such command"))

    const member_schema = await member_Schema.findOne({ member_id: interaction.member.id })

    if (interaction.guild) {

        if (command.bot_owner) {
            if (interaction.user.id !== process.env.OWNER_ID) return interaction.reply(e.errorEmbed(t("bot_owner", { ns: "common" })))
        }

        if (command.premium_status) {
            if (!member_schema?.premium?.status || false) return interaction.reply(e.errorEmbed(t("premium", { ns: "common" })))
        }

        if (command.black_list) {
            const reason = member_schema?.status?.black_list?.reason
            if (member_schema?.status?.black_list?.status || false) return interaction.editReply(e.errorEmbed(t("black_list", { reason, ns: "common" })))
        }

        if (interaction.user.id !== process.env.OWNER_ID)
        if (command.guild_owner) {
            if (interaction.user.id !== guild.ownerId) return interaction.reply(e.errorEmbed(t("owner", { ns: "common" })))
        }

        if (interaction.user.id !== process.env.OWNER_ID)
        if (command.required_user_permissions) {
            if (command.required_user_permissions && !interaction.member.permissions.has(command.required_user_permissions)) {
                const perm = command.permission
                return interaction.reply(e.errorEmbed(t("user_permissions", { ns: "common", perm })))
            }
        }

        if (command.required_bot_permissions) {

            const { me } = interaction.guild.members
            if (command.required_bot_permissions && command.required_bot_permissions.some(perm => !me.permissionsIn(interaction.channel).has(perm))) {
                const permissions = command.required_bot_permissions.filter(perm => !me.permissionsIn(interaction.channel).has(perm)).map(perm => t(perm, { ns: "permissions" })).join(", ")
                return interaction.reply(e.errorEmbed(t("missing_permissions", { ns: "common", permissions })))
            }

        }
    }

    const cooldown = cooldownCheck(command, interaction.user.id)
    if (cooldown) {
        return interaction.reply(e.errorEmbed(t("cooldown", { ns: "common", cooldown })))
    }

    try {
        command.execute(interaction)
    } catch (e) {
        console.error(e)
        
        interaction.reply({ embeds: [{
            description: t("unexpected_error", { ns: "common" }),
            color: Colors.Red
        }],
        ephemeral: true
    })

    }

}