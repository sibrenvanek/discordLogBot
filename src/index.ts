import { DiscordTS } from "./lib/discord/discord"

import MessageController from "./lib/message/messageController"
import { commands } from "./commands"

const messageController = new MessageController(commands)

const bot: DiscordTS = new DiscordTS(messageController)
bot.start()
	.then(_ => console.log("started"))
	.catch(error => console.log("failed", error))
