import { EmbedBuilder } from "discord.js"
import { t } from "i18next"

export const data = {
    name: t("EmbedBuilder.name"),
    description: t("EmbedBuilder.description"),
    bot_owner: true,
    async execute(interaction) {
        const sub_command = interaction.options.getSubcommand()

        const fieldOne = interaction.options.getString("field-one")
        const fieldTwo = interaction.options.getString("field-two")
        const fieldThree = interaction.options.getString("field-three")
        const fieldFour = interaction.options.getString("field-four")
        const fieldFive = interaction.options.getString("field-five")
        const fieldSix = interaction.options.getString("field-six")
        const fieldSeven = interaction.options.getString("field-seven")
        const fieldEight = interaction.options.getString("field-eight")

        if (sub_command == "create") {
            const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.options.getString("title"), iconURL: interaction.guild.iconURL() })
            .setDescription(interaction.options.getString("description"))
            .setColor("Purple")
            .setThumbnail(process.env.THUMBNAIL)
            .setFooter({ text: `${interaction.guild.name} original discord embed bot`, iconURL: interaction.guild.iconURL() })
            .setFields(
                {
                    name: fieldOne.split("{bottom}")[0],
                    value: fieldOne.split("{bottom}")[1],
                    inline: false
                },
                {
                    name: fieldTwo.split("{bottom}")[0],
                    value: fieldTwo.split("{bottom}")[1],
                    inline: false
                },
                {
                    name: fieldThree.split("{bottom}")[0],
                    value: fieldThree.split("{bottom}")[1],
                    inline: false
                },
                {
                    name: fieldFour.split("{bottom}")[0],
                    value: fieldFour.split("{bottom}")[1],
                    inline: false
                },
                {
                    name: fieldFive.split("{bottom}")[0],
                    value: fieldFive.split("{bottom}")[1],
                    inline: false
                },
                {
                    name: fieldSix.split("{bottom}")[0],
                    value: fieldSix.split("{bottom}")[1],
                    inline: false
                },
                {
                    name: fieldSeven.split("{bottom}")[0],
                    value: fieldSeven.split("{bottom}")[1],
                    inline: false
                },
                {
                    name: fieldEight.split("{bottom}")[0],
                    value: fieldEight.split("{bottom}")[1],
                    inline: false
                },
            )

            interaction.channel.send({ embeds: [embed] })
            .then(() => interaction.reply({ content: "Gönderdim!", ephemeral: true }))
        }
    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
    name_localizations: { tr: t("EmbedBuilder.name", { lng: "tr" }) },
    description_localizations: { tr: t("EmbedBuilder.description", { lng: "tr" }) },
    options: [
        {
            name: "create",
            description: data.description,
            name_localizations: { tr: t("EmbedBuilder.2name", { lng: "tr" }) },
            description_localizations: { tr: t("EmbedBuilder.description", { lng: "tr" }) },
            type: 1,
            options: [
                {
                    name: "title",
                    description: data.description,
                    type: 3
                },
                {
                    name: "description",
                    description: data.description,
                    type: 3
                },
                {
                    name: "field-one",
                    description: data.description,
                    type: 3
                },
                {
                    name: "field-two",
                    description: data.description,
                    type: 3
                },
                {
                    name: "field-three",
                    description: data.description,
                    type: 3
                },
                {
                    name: "field-four",
                    description: data.description,
                    type: 3
                },
                {
                    name: "field-five",
                    description: data.description,
                    type: 3
                },
                {
                    name: "field-six",
                    description: data.description,
                    type: 3
                },
                {
                    name: "field-seven",
                    description: data.description,
                    type: 3
                },
                {
                    name: "field-eight",
                    description: data.description,
                    type: 3
                },
            ]
        }
    ]
}