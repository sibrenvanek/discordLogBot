"use strict"

import { DiscordTS } from "./lib/discord/discord"

const bot: DiscordTS = new DiscordTS()
bot.start()
	.then(_ => console.log("started"))
	.catch(error => console.log("failed", error))
