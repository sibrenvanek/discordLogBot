import { Command } from "./types"
import { Message } from "discord.js"

const listCommand = <a>(command: Command<a>): string => ` - ${command.command}: ${command.description}`

export default class MessageController<a = string> {
	constructor(private readonly commands: Array<Command<a>>) {}

	async handle(message: Message) {
		const [inputCommand, ...params] = message.content.toLowerCase().slice(1).split(" ")

		if (inputCommand === "help") {
			// little bit of spaghetti. This should be a sepperate function
			if (params.length && params[0]) {
				const helpCommand = this.commands.find(c => c.command === params[0])
				await message.channel.send(helpCommand
					? listCommand(helpCommand)
					: `Cannot find '${params[0]}'`)
			} else {
				await message.channel.send(this.commands.map(listCommand).join("\n"))
			}
		} else {
			const command = this.commands.find(c => c.command === inputCommand)

			await message.channel.send(command
				? await command.f(params)
				: `I can't do everything you know... wtf does '${inputCommand}' even mean?!`
			)
		}
	}
}
