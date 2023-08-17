import { add_blackList } from "../../utils/blackList/add.js"
import { remove_blackList } from "../../utils/blackList/remove.js"
import { t } from "i18next"

export const data = {
    name: t("blackList.name"),
    description: t("blackList.description"),
    bot_owner: true,
    /**
    * 
    * @param {import("discord.js").ChatInputCommandInteraction} interaction 
    */
    async execute(interaction) {
        const sub_command = interaction.options.getSubcommand()

        if (sub_command == "add") add_blackList(interaction, interaction.options.getUser("user"), interaction.options.getString("reason"), interaction.options.getString("time"))
        if (sub_command == "remove") remove_blackList(interaction, interaction.options.getUser("user"))

    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
    name_localizations: { tr: t("blackList.name", { lng: "tr" }) },
    description_localizations: { tr: t("blackList.description", { lng: "tr" }) },
    options: [
        {
            name: "add",
            description: data.description, type: 1,
            name_localizations: { tr: t("blackList.add.name", { lng: "tr" }) },
            description_localizations: { tr: t("blackList.description", { lng: "tr" }) },
            options: [
                { name: "user", description: data.description, name_localizations: { tr: t("blackList.user.name", { lng: "tr" }) }, description_localizations: { tr: t("blackList.description", { lng: "tr" }) }, type: 6 },{ name: "reason", description: data.description, name_localizations: { tr: t("blackList.reason.name", { lng: "tr" }) }, description_localizations: { tr: t("blackList.description", { lng: "tr" }) }, type: 3 },{ name: "time",description: data.description, name_localizations: { tr: t("blackList.time.name", { lng: "tr" }) }, description_localizations: { tr: t("blackList.description", { lng: "tr" }) }, type: 3,
                choices: [
                    { name: "Weekly", value: "weekly" }, { name: "Monthly", value: "monthly" }, { name: "Yearly", value: "yearly" }, { name: "Unlimited", value: "unlimited" }
                ] }
            ]
        },
        {
            name: "remove",
            description: data.description, type: 1,
            name_localizations: { tr: t("blackList.remove.name", { lng: "tr" }) },
            description_localizations: { tr: t("blackList.description", { lng: "tr" }) },
            options: [
                { name: "user", description: data.description, name_localizations: { tr: t("blackList.user.name", { lng: "tr" }) }, description_localizations: { tr: t("blackList.description", { lng: "tr" }) }, type: 6 }
            ]
        }
    ]
}