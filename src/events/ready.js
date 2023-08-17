import { control_premium } from "../utils/premium/control.js"
import { control_blackList } from "../utils/blackList/control.js"

/**
 * @param {import("discord.js").Client} client
 */
export default async (client) => {

    client.once("ready", async () => {
        control_premium(client)
        control_blackList(client)
    })

}