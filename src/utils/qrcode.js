import QRCode from 'qrcode'

// convert QRCode.toDataURL() to a promise
export const toDataURL = (text, options) => {
	return new Promise((resolve, reject) => {
		QRCode.toDataURL(text, options, (err, url) => {
			if (err) reject(err)
			resolve(url)
		})
	})
}
