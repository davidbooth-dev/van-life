import { redirect } from "react-router-dom"

export async function requireAuth(request) {
    const pathname = new URL(request.url).pathname
    const isLoggedIn = localStorage.getItem("loggedin") || false

    // if (!isLoggedIn) {
    //     const response = redirect(
    //         `/login?message=You must login in first&redirectTo=${pathname}`
    //     )
    //     response.body = true
    //     throw response
    // }
   
    return null
}