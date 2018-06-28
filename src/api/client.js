import request from 'superagent'

export default class ApiClient {
  defaultOptions = {
    tokenStorageKey: 'statueApiJWT'
  }

  constructor(host, options = {}) {
    // this.host = host || 'http://localhost:3030'
		this.host = host || 'https://still-headland-92871.herokuapp.com'
    this.options = { ...this.defaultOptions, ...options }
  }

  get(path) {
    return request
      .get(this.createUrl(path))
      .set(this.headers())
  }

  post(path, data = {}) {
    return request
      .post(this.createUrl(path))
      .set(this.headers())
      .send(data)
  }

  put(path, data = {}) {
    return request
      .put(this.createUrl(path))
      .set(this.headers())
      .send(data)
  }

  patch(path, data = {}) {
    return request
      .patch(this.createUrl(path))
      .set(this.headers())
      .send(data)
  }

  delete(path) {
    return request
      .delete(this.createUrl(path))
      .set(this.headers())
  }



  headers() {
    let headers = {
      Accept: 'application/json'
    }

    // if (this.isAuthenticated()) {
    //   headers.Authorization = `Bearer ${this.getToken()}`
    // }

    return headers
  }


  // Create a full URL to our API, including the host and path
  createUrl(path) {
    return [this.host, path].join('')
  }

}
