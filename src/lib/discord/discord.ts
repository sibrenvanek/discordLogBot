"use strict"

import { Client, Message } from "discord.js"
import * as debug from "debug"
import * as path from "path"
import * as YAML from "yamljs"

import MessageController from "../message/messageController"

// DEBUG PREPARE
// ----------------------------------------------------------------------------
const logSystem	= debug("bot:system")
const logEvent	= debug("bot:event")
const logError	= debug("bot:error")
const logWarn	= debug("bot:warn")

// DISCORD CLASS
// ----------------------------------------------------------------------------
export class DiscordTS {
	private readonly client: Client
	private readonly config: any

	constructor(private readonly messageHandler: MessageController) {
		this.client = new Client()
		this.config = YAML.load(path.resolve(__dirname, "settings.yml"))
	}

	public async start(): Promise<void> {
		logSystem("Starting bot...")

		// => Bot is ready...
		this.client.on("ready", async () => {
			logEvent(`[${ this.config.settings.nameBot }] Connected.`)
			logEvent(`Logged in as ${ this.client.user.tag }`)
			await this.client.user.setActivity(this.config.settings.activity)
		})

		// => Message handler
		this.client.on("message", async (message: Message) => {
			// => Prevent message from the bot
				if (message.author.id !== this.client.user.id) {
					// => Test command
						if (message.content.startsWith(this.config.settings.prefix)) {
							await this.messageHandler.handle(message)
						}
				}
		})

		// => Bot error and warn handler
		this.client.on("error", logError)
		this.client.on("warn", logWarn)

		// => Process handler
		process.on("exit", async () => {
			logEvent(`[${ this.config.settings.nameBot }] Process exit.`)
			await this.client.destroy()
		})
		process.on("uncaughtException", (err: Error) => {
			const errorMsg = (err ? err.stack || err : "").toString().replace(new RegExp(`${__dirname}\/`, "g"), "./")
			logError(errorMsg)
		})
		process.on("unhandledRejection", (err: Error) => {
			logError("Uncaught Promise error: \n" + err.stack)
		})

		// => Login
		await this.client.login(this.config.settings.token)
	}
}
