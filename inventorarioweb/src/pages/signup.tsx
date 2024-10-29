import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "@/hook/useAuth"
import { useState } from "react"

export function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    const res = signup(email, password);

    if (res) {
      setError(res);
      return;
    }

    navigate("/");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-[400px] rounded-xl border bg-card p-8 shadow-lg">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar uma conta
          </h1>
          <p className="text-sm text-muted-foreground">
            Insira seu email e senha para criar uma conta
          </p>
        </div>

        <form onSubmit={handleSignup} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <span className="text-sm text-red-500">{error}</span>}

          <Button type="submit" className="w-full">
            Criar Conta
          </Button>
        </form>

        <p className="px-8 text-center text-sm text-muted-foreground">
          Já possui uma conta?{" "}
          <Link to="/" className="hover:text-brand underline underline-offset-4">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp;
