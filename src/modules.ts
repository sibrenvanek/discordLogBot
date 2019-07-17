"use strict"

import { Message } from "discord.js"
import { exec, spawn } from "child_process"

export const messageHandler = async (message: Message) => {
	const [command, ...params] = message.content.slice(1).split(" ")
	switch (command) {
		case "cpu": cpu(message); break
		case "memory": memory(message); break
		default: unknown(message, command); break
	}

	
}

const cpu = (message: Message) => exec("ps -C java -o %cpu", async (_error, stdout, stderr) => {
	if (_error) {
		await message.channel.send("Something went wrong");
	}
	else {
		await message.channel.send(stdout)
	}
})

const memory = (message: Message) => exec("ps -C java -o %mem", async (_error, stdout, stderr) => {
	await message.channel.send(stdout)
})

const unknown = (message: Message, command: string) => message.channel.send(`I can't do everything you know... wtf does ${command} even mean?!`)

