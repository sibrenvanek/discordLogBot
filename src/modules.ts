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
	},
	{
		description: "Reboot the machine.",
		command: "reboot",
		f: async _params => {
			if (_params[0] === "Confirm") {
				return executeCommand("sudo reboot")
			}
			else {
				return "Are you sure you want to do that? If so please type 'Confirm' after the command"
			}
		}
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
