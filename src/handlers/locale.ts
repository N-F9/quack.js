const Locale = async () => {
	// @ts-ignore
	const data = (await import(`../../locales/settings.json`)).default
	return (await import(`../../locales/${data.location}.json`)).default
}

export default Locale
