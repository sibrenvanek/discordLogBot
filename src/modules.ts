import { Command, MessageHandler } from "./types/messageHandler"
import executeCommand from "./terminal"

const commands: Array<Command> = [
	{
		description: "Displays the current CPU usage in percentages.",
		command: "cpu",
		f: async _params => executeCommand("ps -C java -o %cpu")
	},
	{
		description: "Displays the current memory usage in percentages.",
		command: "memory",
		f: async _params => executeCommand("ps -C java -o %mem")
	},
	{
		description: "Reboots the machine.",
		command: "reboot",
		f: async params => params[0] === "confirm"
			? executeCommand("sudo reboot")
			: "Are you sure you want to do that? If so please type 'confirm' after the command"
	}
]

const listCommand = (command: Command): string => ` - ${command.command}: ${command.description}`

export const messageHandler: MessageHandler = async message => {
	const [inputCommand, ...params] = message.content.toLowerCase().slice(1).split(" ")

	if (inputCommand === "help") {
		await message.channel.send(commands.map(listCommand).join("\n"))
	} else {
		const command = commands.find(c => c.command === inputCommand)
	
		await message.channel.send(command
			? await command.f(params)
			: `I can't do everything you know... wtf does ${inputCommand} even mean?!`
		)
	}
}
