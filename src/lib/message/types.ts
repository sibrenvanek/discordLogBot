export interface Command<a = string> {
	description: string
	parameterDescription?: string
	command: string
	f: (parameters: Array<string>) => Promise<a>
}
