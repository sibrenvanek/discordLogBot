import { Command } from "./types"
import { Message, RichEmbed } from "discord.js"
import { embedString } from "../embed/Embedder"

const listCommand = (command: Command<RichEmbed>): string => `- ${command.command}: ${command.description}`

export default class MessageController {
	constructor(private readonly commands: Array<Command<RichEmbed>>) {}

	async handle(message: Message) {
		const [inputCommand, ...params] = message.content.toLowerCase().slice(1).split(" ")

		if (inputCommand === "help") {
			if (params.length && params[0]) {
				const helpCommand = this.commands.find(c => c.command === params[0])
				await message.channel.sendEmbed(helpCommand
					? embedString(listCommand(helpCommand))
					: embedString(`Cannot find '${params[0]}'`))
			} else {
				await message.channel.sendEmbed(embedString(this.commands.map(listCommand).join("\n")))
			}
		} else {
			const command = this.commands.find(c => c.command === inputCommand)

			await message.channel.sendEmbed(command
				? await command.f(params)
				: embedString(`I can't do everything you know... wtf does '${inputCommand}' even mean?!`)
			)
		}
	}
}
