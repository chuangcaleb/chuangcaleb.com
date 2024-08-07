export function composeErrorString(error: unknown): string {
	if (error instanceof Error) {
		return error.stack ?? error.message;
	}

	return JSON.stringify(error);
}

// Export function logError(summary: string, error?: unknown): void {
//   if (!error) console.error(`🚨 ${summary}`)

//   console.error(`🚨 ${summary}:\n\n${composeErrorStr(error)}\n`)
// }
