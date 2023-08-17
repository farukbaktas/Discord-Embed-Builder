import { give_premium } from "../../utils/premium/give.js"
import { remove_premium } from "../../utils/premium/remove.js"
import { t } from "i18next"

export const data = {
    name: t("premium.name"),
    description: t("premium.description"),
    bot_owner: true,
    /**
    * 
    * @param {import("discord.js").ChatInputCommandInteraction} interaction 
    */
    async execute(interaction) {
        const sub_command = interaction.options.getSubcommand()

        if (sub_command == "give") give_premium(interaction,  interaction.options.getUser("user"), interaction.options.getString("time"))
        if (sub_command == "remove") remove_premium(interaction,  interaction.options.getUser("user"))

    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
    name_localizations: { tr: t("premium.name", { lng: "tr" }) },
    description_localizations: { tr: t("premium.description", { lng: "tr" }) },
    options: [
        {
            name: "give",
            description: data.description, type: 1,
            name_localizations: { tr: t("premium.give.name", { lng: "tr" }) },
            description_localizations: { tr: t("premium.description", { lng: "tr" }) },
            options: [
                { name: "user", description: data.description, name_localizations: { tr: t("premium.user.name", { lng: "tr" }) }, description_localizations: { tr: t("premium.description", { lng: "tr" }) }, type: 6 },{ name: "time",description: data.description, name_localizations: { tr: t("premium.time.name", { lng: "tr" }) }, description_localizations: { tr: t("premium.description", { lng: "tr" }) }, type: 3,
                choices: [
                    { name: "Weekly", value: "weekly" }, { name: "Monthly", value: "monthly" }, { name: "Yearly", value: "yearly" }, { name: "Unlimited", value: "unlimited" }
                ] }
            ]
        },
        {
            name: "remove",
            description: data.description, type: 1,
            name_localizations: { tr: t("premium.remove.name", { lng: "tr" }) },
            description_localizations: { tr: t("premium.description", { lng: "tr" }) },
            options: [
                { name: "user", description: data.description, name_localizations: { tr: t("premium.user.name", { lng: "tr" }) }, description_localizations: { tr: t("premium.description", { lng: "tr" }) }, type: 6 }
            ]
        }
    ]
}