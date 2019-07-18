import { Command, MessageHandler } from "./types/messageHandler"
import executeCommand from "./terminal"

const commands: Array<Command> = [
	{
		description: "Displays the current CPU usage in percentages.",
		command: "cpu",
		f: _params => executeCommand("ps -C java -o %cpu")
	},
	{
		description: "Displays the current memory usage in percentages.",
		command: "memory",
		f: _params => executeCommand("ps -C java -o %mem")
	}
]

export const messageHandler: MessageHandler = async message => {
	const [inputCommand, ...params] = message.content.slice(1).split(" ")
	const command = commands.find(c => c.command === inputCommand)

	await message.channel.send(command
		? await command.f(params)
		: `I can't do everything you know... wtf does ${inputCommand} even mean?!`
	)
}
