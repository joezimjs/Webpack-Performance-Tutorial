function createApi (base = '/', useTrailingSlashes = false) {
	function serializeQuery (obj, prefix) {
		let str = []
		let p

		for (p in obj)
			if (obj.hasOwnProperty(p)) {
				let k = prefix
					? prefix + '[' + p + ']'
					: p
				let v = obj[p]
				str.push((v !== null && typeof v === 'object')
					? serializeQuery(v, k)
					: encodeURIComponent(k) + '=' + encodeURIComponent(v))
			}

		return '?' + str.join('&')
	}

	function getDefaultOptions (data, method) {
		let options = {
			method,
			headers: {
				Accept: 'application/json'
			}
		}

		if (data !== undefined) {
			options.body = JSON.stringify(data)
			options.headers['Content-Type'] = 'application/json'
		}

		return options
	}

	function parseJson (response) {
		if (response.ok)
			return response.json()
		else
			return response.json().then(json => {
				let error = new Error(response.statusText)
				error.json = json
				throw error
			})
	}

	function request (path, query, data, method) {
		let url = base + path + serializeQuery(query)
		let options = getDefaultOptions(data, method)
		return fetch(url, options).then(parseJson)
	}

	function read (segments, query) {
		return request(segments, query, undefined, 'get')
	}

	function create (segments, data, query) {
		return request(segments, query, data, 'post')
	}

	function update (segments, data, query) {
		return request(segments, query, data, 'put')
	}

	function del (segments, query) {
		return request(segments, query, undefined, 'delete')
	}

	return { read, create, update, del }
}

export default createApi