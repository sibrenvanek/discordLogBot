"use strict"

import { DiscordTS } from "./discord"

const bot: DiscordTS = new DiscordTS()
bot.start()
	.then(_ => console.log("started"))
	.catch(error => console.log("failed", error))
