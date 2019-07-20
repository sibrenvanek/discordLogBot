import execute from "./lib/terminal/execute"
import { Command } from "./lib/message/types"

export const commands: Array<Command> = [
	{
		description: "Displays the current CPU usage in percentages.",
		command: "cpu",
		f: async _params => await execute("ps -C java -o %cpu")
	},
	{
		description: "Displays the current memory usage in percentages.",
		command: "memory",
		f: async _params => await execute("ps -C java -o %mem")
	},
	{
		description: "Reboots the machine.",
		command: "reboot",
		f: async params => params.length && params[0] === "confirm"
			? await execute("sudo reboot")
			: "Are you sure you want to do that? If so please type 'confirm' after the command"
	}
	,
	{
		description: "Runs a network speedtest.",
		command: "speedtest",
		f: async params => params.length ?
		params[0] === "simple" ? await execute("speedtest-cli --simple") :
		params[0] === "download" ? await execute("speedtest-cli --no-upload") :
		params[0] === "upload" ? await execute("speedtest-cli --no-download")
		: "You can only use one of the following parameters: simple, download or upload to run a speedtest."
		:	"You need to include one of the following parameters: simple, download or upload to run a speedtest."
	}
]
