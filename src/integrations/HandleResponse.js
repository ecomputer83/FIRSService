const handleResponse  = (response)  => {
  return response.text().then(text => {
    console.log('response.text', text)
    const data = text && JSON.parse(text)
    if (!response.ok) {
      let error = ''
      if (Array.isArray(data)) {
        error = data.join()
      } else {
        error = (data && data.message) || response.statusText
      }
      return Promise.reject(error)
    }
    return data
  })
}

module.exports = {
  handleResponse: handleResponse
}