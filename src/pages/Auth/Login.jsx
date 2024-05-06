import { 
    Form,
    redirect,
    useActionData,
    useLoaderData, 
    useNavigation
} from 'react-router-dom'

import { loginUser } from "../../api"

export function loader({ request }){
    return new URL(request.url).searchParams.get("message")
}

export async function action({ request }){
    const formData = await request.formData();
    const email = formData.get("email")
    const password = formData.get("password")

    const pathname = new URL(request.url)
        .searchParams.get("redirectTo") || "/host"

    try{
        const data = await loginUser({email, password})
        localStorage.setItem("loggedin", new Boolean(true))
        return redirect(pathname)
    }
    catch(err){
        console.log('error',err)
        return err
    }
}
const Login = () => {
    const message = useLoaderData()
    const errorMessage = useActionData()
    const navigation = useNavigation()
    
    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {message && <h2 className="red">{message}</h2> }
            {errorMessage && <h2 className="red">{errorMessage.message}</h2> }
            <Form 
                method="post" 
                replace 
                className="login-form"
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    autoFocus
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button 
                    disabled={navigation.state === 'submitting'}
                >
                    {navigation.state === "submitting" 
                        ? "Logging in" 
                        : "Log in"}
                </button>
            </Form>
        </div>
    )
};

export default Login
