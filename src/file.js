const URL = 'https://6204-190-193-87-14.ngrok.io/api/file'

const mimeTypes = {
	'aac': 'audio/aac',
	'abw': 'application/x-abiword',
	'arc': 'application/x-freearc',
	'avi': 'video/x-msvideo',
	'azw': 'application/vnd.amazon.ebook',
	'bin': 'application/octet-stream',
	'bmp': 'image/bmp',
	'bz': 'application/x-bzip',
	'bz2': 'application/x-bzip2',
	'csh': 'application/x-csh',
	'css': 'text/css',
	'csv': 'text/csv',
	'doc': 'application/msword',
	'epub': 'application/epub+zip',
	'gif': 'image/gif',
	'htm': 'text/html',
	'html': 'text/html',
	'ico': 'image/vnd.microsoft.icon',
	'ics': 'text/calendar',
	'jar': 'application/java-archive',
	'jpeg': 'image/jpeg',
	'jpg': 'image/jpeg',
	'js': 'text/javascript',
	'json': 'application/json',
	'mid': 'audio/midi',
	'midi': 'audio/midi',
	'mpeg': 'video/mpeg',
	'mpkg': 'application/vnd.apple.installer+xml',
	'odp': 'application/vnd.oasis.opendocument.presentation',
	'ods': 'application/vnd.oasis.opendocument.spreadsheet',
	'odt': 'application/vnd.oasis.opendocument.text',
	'oga': 'audio/ogg',
	'ogv': 'video/ogg',
	'ogx': 'application/ogg',
	'otf': 'font/otf',
	'png': 'image/png',
	'pdf': 'application/pdf',
	'ppt': 'application/vnd.ms-powerpoint',
	'rar': 'application/x-rar-compressed',
	'rtf': 'application/rtf',
	'sh': 'application/x-sh',
	'svg': 'image/svg+xml',
	'swf': 'application/x-shockwave-flash',
	'tar': 'application/x-tar',
	'tif': 'image/tiff',
	'tiff': 'image/tiff',
	'ttf': 'font/ttf',
	'txt': 'text/plain',
	'vsd': 'application/vnd.visio',
	'wav': 'audio/wav',
	'weba': 'audio/webm',
	'webm': 'video/webm',
	'webp': 'image/webp',
	'woff': 'font/woff',
	'woff2': 'font/woff2',
	'xhtml': 'application/xhtml+xml',
	'xls': 'application/vnd.ms-excel',
	'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	'xml': 'application/xml',
	'xul': 'application/vnd.mozilla.xul+xml',
	'zip': 'application/zip',
	'3gp': 'video/3gpp',
	'3g2': 'video/3gpp2',
	'7z': 'application/x-7z-compressed',
}

const createFile = async (filename) => {
	const extension = filename.split('.').pop()
	const response = await fetch(`${URL}/${filename}`)
	const data = await response.blob()
	const metadata = { type: mimeTypes[extension] }
	console.log({ metadata })
	const file = new File([data], filename, metadata)
	return file
}

const toBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})

const download = async (filename) => {
	const file = await createFile(filename)
	const b64 = await toBase64(file)
	var a = document.createElement('a')
	a.href = b64
	a.download = filename
	a.click()
}

const filename = 'b4c4bfd4-91c1-4b3c-9ff8-77cc5b1abe0e.jpg'
download(filename)
