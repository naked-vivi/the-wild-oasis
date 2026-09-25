import LoginForm from "@/features/authentication/LoginForm";
import Logo from "@/shared/Logo";

function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center">
          <Logo />
        </div>

        <h1 className="text-center text-2xl font-semibold tracking-tight text-foreground">Log in to your account</h1>
        <LoginForm />
      </div>
    </main>
  )
}

export default Login;
