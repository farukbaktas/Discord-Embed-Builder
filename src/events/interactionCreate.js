import commandInteractionHandler from "../utils/handlers/commandInteractionHandler.js"
import i18next from "i18next"

/**
 * @param {import("discord.js").Client} client
 */
export default async (client) => {

    client.on("interactionCreate", async (interaction) => {

        // Change language to user's locale
        i18next.changeLanguage(interaction.locale)

        if (interaction.isChatInputCommand()) return commandInteractionHandler(interaction)

    })

}