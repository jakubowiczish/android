import { ACCESS_TOKEN, API_BASE_URL } from '../constants'

const request = (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  })

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
  }

  const defaults = { headers: headers }
  options = Object.assign({}, defaults, options)

  return fetch(options.url, options)
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json)
        }
        return json
      })
    )
}

export function getCurrentUser () {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.')
  }

  return request({
    url: API_BASE_URL + '/user/me',
    method: 'GET'
  })
}

export function login (loginRequest) {
  return request({
    url: API_BASE_URL + '/auth/login',
    method: 'POST',
    body: JSON.stringify(loginRequest)
  })
}

export function signup (signupRequest) {
  return request({
    url: API_BASE_URL + '/auth/signup',
    method: 'POST',
    body: JSON.stringify(signupRequest)
  })
}

export function createPlan (userPlanRequest) {
  return request({
    url: API_BASE_URL + '/plan',
    method: 'POST',
    body: JSON.stringify(userPlanRequest)
  })
}

export function calculateBMI (calculateBMIRequest) {
  return request({
    url: API_BASE_URL + '/calculator/BMI',
    method: 'POST',
    body: JSON.stringify(calculateBMIRequest)
  })
}

export function searchProducts (searchTerm, pageIndex, perPage) {
  return request({
    url: API_BASE_URL + '/product-browser?searchTerm=' + searchTerm + '&pageIndex=' + pageIndex + '&perPage=' + perPage,
    method: 'GET'
  })
}

export function getRecentProducts (pageIndex, perPage) {
  return request({
    url: API_BASE_URL + '/product-browser/recent-products?pageIndex=' + pageIndex + '&perPage=' + perPage,
    method: 'GET'
  })
}

export function addRecentProduct (addRecentProductRequest) {
  return request({
    url: API_BASE_URL + '/diary/add',
    method: 'POST',
    body: JSON.stringify(addRecentProductRequest)
  })
}

export function getRecentProductsForDate (date) {
  return request({
    url: API_BASE_URL + '/diary/getForDate?date=' + date,
    method: 'GET'
  })
}