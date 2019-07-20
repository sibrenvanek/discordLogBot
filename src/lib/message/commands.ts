import executeCommand from "../terminal/terminal"
import { Command } from "../types/message"

export const commands: Array<Command> = [
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
