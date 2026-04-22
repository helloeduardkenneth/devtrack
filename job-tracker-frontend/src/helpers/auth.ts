const TOKEN_KEY = 'token'

export const setAuthToken = (token: string) => {
    const maxAge = 60 * 60 * 24 * 7
    document.cookie = `${TOKEN_KEY}=${token}; Max-Age=${maxAge}; Path=/; SameSite=Strict`
}

export const getAuthToken = () => {
    const match = document.cookie.match(
        new RegExp(`(?:^|; )${TOKEN_KEY}=([^;]*)`),
    )
    return match ? decodeURIComponent(match[1]) : null
}

export const clearAuthToken = () => {
    document.cookie = `${TOKEN_KEY}=; Max-Age=0; Path=/; SameSite=Strict`
}
