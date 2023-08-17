import { Client, GatewayIntentBits, Collection, Colors } from "discord.js"
import { readdir, readdirSync } from "fs"
import { createRequire } from "module"
import i18next from "i18next"
import Backend from "i18next-fs-backend"
import mongoose from "mongoose"
import * as database from "./utils/database/mongoose.js"
import * as embed from "./utils/client/Embed.js"
import "dotenv/config"

const require = createRequire(import.meta.url)
const emojis = require("./emojis.json")

// Client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
})

// Assignments
client.commands = new Collection()
client.color = Colors
client.database = database
client.e = embed
client.emoji = emoji_name => emoji_name in emojis ? emojis[emoji_name] : ":tada:"

// Database connection
await mongoose.connect(process.env.MONGO_URL)

// i18next instance
await i18next
.use(Backend)
.init({
    fallbackLng: "en-US",
    preload: readdirSync("./locales"),
    ns: readdirSync("./locales/en-US").map(file => file.replace(".json", "")),
    defaultNS: "commands",
    backend: {
        loadPath: "./locales/{{lng}}/{{ns}}.json"
    }
})

// Event Loader
readdir("./events", { encoding: "utf-8" }, (err, files) => {
    if (err) return console.error(err)

    files.filter(file => file.endsWith(".js")).forEach(file => {
        import(`./events/${file}`).then(e => e.default(client))
    })
})

// Command Loader
readdir("./commands", { encoding: "utf-8" }, (err, folders) => {
    if (err) return console.error(err)

    folders.forEach(folder => {
        readdir(`./commands/${folder}`, { encoding: "utf-8" }, (err, files) => {
            if (err) return console.error(err)

            files.filter(file => file.endsWith(".js")).forEach(file => {

                import(`./commands/${folder}/${file}`).then(c => {
                    client.commands.set(c.data.name, c.data)
                })

            })
        })
    })
})

process.on("unhandledRejection", e => {
    if (e.code > 10000) return

    console.log(e)
})

client.login(process.env.TOKEN)