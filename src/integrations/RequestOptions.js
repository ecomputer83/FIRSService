 const requestOptions = {
  get () {
    return {
      method: 'GET',
      ...headers()
    }
  },
  post (body) {
    return {
      method: 'POST',
      ...headers(),
      body: JSON.stringify(body)
    }
  },
  patch (body) {
    return {
      method: 'PATCH',
      ...headers(),
      body: JSON.stringify(body)
    }
  },
  put (body) {
    return {
      method: 'PUT',
      ...headers(),
      body: JSON.stringify(body)
    }
  },
  delete () {
    return {
      method: 'DELETE',
      ...headers()
    }
  }
}
function headers () {
  return {
    headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY,
          'x-api-secret': process.env.SECRET_KEY
        }
  }
}
module.exports = {
  requestOptions: requestOptions
}

