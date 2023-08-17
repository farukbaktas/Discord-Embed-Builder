import { Colors, EmbedBuilder } from "discord.js"

export const errorEmbed = (input) => {
    const embed = new EmbedBuilder()
    .setDescription(input)
    .setColor(Colors.Red)
    return { embeds: [embed], ephemeral: true }
}

export const successEmbed = (input) => {
    const embed = new EmbedBuilder()
    .setDescription(input)
    .setColor(Colors.Green)
    return { embeds: [embed], ephemeral: true }
}