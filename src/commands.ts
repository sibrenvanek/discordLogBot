import { RichEmbed } from "discord.js"

import execute from "./lib/terminal/execute"
import { Command } from "./lib/message/types"
import { embedString } from "./lib/embed/Embedder"

export const commands: Array<Command<RichEmbed>> = [
	{
		description: "Displays the current CPU usage in percentages.",
		command: "cpu",
		f: async _params => embedString(await execute("ps -C java -o %cpu").then(output => output.replace("%CPU", "")))
	},
	{
		description: "Displays the current memory usage in percentages.",
		command: "memory",
		f: async _params => embedString(await execute("ps -C java -o %mem").then(output => output.replace("%MEM", "")))
	},
	{
		description: "Reboots the machine.",
		parameterDescription: "type: confirm\n- confirm: confirms the rebooting of the Pi",
		command: "reboot",
		f: async params => embedString(params.length && params[0] === "confirm"
			? await execute("sudo reboot")
			: "Are you sure you want to do that? If so please type 'confirm' after the command."
		)
	},
	{
		description: "Runs a network speedtest.",
		parameterDescription: `type: simple | download | upload\n
- simple: pings the nearest server, runs a download and an upload test.\n
- download: pings the nearest server and runs a download test.\n
- upload: pings the nearest server and runs an upload test.`,
		command: "speedtest",
		f: async params => embedString(params.length ?
		params[0].toLocaleLowerCase() === "simple" ? await execute("speedtest-cli --simple") :
		params[0].toLocaleLowerCase() === "download" ? await execute("speedtest-cli --no-upload") :
		params[0].toLocaleLowerCase() === "upload" ? await execute("speedtest-cli --no-download")
		: "You can only use one of the following parameters: simple, download or upload to run a speedtest."
		: "You need to include one of the following parameters: simple, download or upload to run a speedtest."
		)
	}
]
