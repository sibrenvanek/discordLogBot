import { RichEmbed } from "discord.js"

export const embedTemplate = () => new RichEmbed()
	.setColor("#009933")

export const embedString = (s: string, title?: string) => embedTemplate()
	.setDescription(s)
	.setTitle(title)
