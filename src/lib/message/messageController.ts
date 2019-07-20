import { Command, MessageHandler } from "../types/message"
import { commands } from "./commands"

const listCommand = (command: Command): string => ` - ${command.command}: ${command.description}`

export const messageHandler: MessageHandler = async message => {
	const [inputCommand, ...params] = message.content.toLowerCase().slice(1).split(" ")

	if (inputCommand === "help") {
		// little bit of spaghetti. This should be a sepperate function
		if (params.length && params[0]) {
			const helpCommand = commands.find(c => c.command === params[0])
			await message.channel.send(helpCommand
				? listCommand(helpCommand)
				: `Cannot find '${params[0]}'`)
		} else {
			await message.channel.send(commands.map(listCommand).join("\n"))
		}
	} else {
		const command = commands.find(c => c.command === inputCommand)

		await message.channel.send(command
			? await command.f(params)
			: `I can't do everything you know... wtf does '${inputCommand}' even mean?!`
		)
	}
}
