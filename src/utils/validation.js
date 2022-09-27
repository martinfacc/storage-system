export const checkUUID = (uuid) => {
	const pattern = new RegExp(
		'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$'
	)
	return pattern.test(uuid)
}
