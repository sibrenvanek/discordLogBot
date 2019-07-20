import { RichEmbed } from "discord.js"

export const embedTemplate = () => new RichEmbed()
	.setColor("#009933")
	.setAuthor("MCLogger")

export const embedString = (s: string) => embedTemplate().setDescription(s)
