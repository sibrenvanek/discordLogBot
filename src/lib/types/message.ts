import {Message} from "discord.js"

export type MessageHandler = (message: Message) => Promise<void>

export interface Command<a = string> {
	description: string
	command: string
	f: (parameters: Array<string>) => Promise<a>
}
