import { exec } from "child_process"

/**
 * Executes a shell command and return it as a Promise.
 * @param command {string}
 * @return {Promise<string>}
 */
export default (command: string): Promise<string> =>
	new Promise((resolve, _reject) => {
	 	exec(command, (error, stdout, stderr) => {
			if (error) { console.warn(error) }
			resolve(stdout ? stdout : stderr)
		})
	})
