export interface Command<a = string> {
	description: string
	command: string
	f: (parameters: Array<string>) => Promise<a>
}
