// Get the Navtor token from the Navtor API
// Store the token in local storage
// Return the token
export function getNavtorToken(): Promise<string> {
  const token = localStorage.getItem('navtorToken')
  const tokenExpiration = localStorage.getItem('navtorTokenExpiration')
  if (token && tokenExpiration && Date.now() < parseInt(tokenExpiration)) {
    return Promise.resolve(token)
  }
  return fetch('https://us-central1-openbridge-demo.cloudfunctions.net/getToken')
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('navtorToken', data.access_token)
      localStorage.setItem('navtorTokenExpiration', (Date.now() + 1000 * 60 * 4).toString())
      return data.access_token
    })
}
