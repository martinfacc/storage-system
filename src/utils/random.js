export const randomColor = () => {
	const code = Math.floor(Math.random() * 16777215).toString(16)
	if (code.length < 6) {
		return randomColor()
	}
	return `#${code}`
}

export const randomString = (length = 10) => {
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let result = ''
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length))
	}
	return result
}

export const randomInt = (min, max) =>
	Math.floor(Math.random() * (max - min + 1) + min)
