import { useState } from "react";
import type { SubmitEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLogin from "./useLogin";

function LoginForm() {
  const [email, setEmail] = useState("pyaephyoeaein@gmail.com");
  const [password, setPassword] = useState("123456");
  const { login, isPending } = useLogin();

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !password || isPending) return
    login({ email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        }
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          className="h-10"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          required
          className="h-10"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </div>
      <Button type="submit" size="lg" className="w-full cursor-pointer" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}

export default LoginForm;
