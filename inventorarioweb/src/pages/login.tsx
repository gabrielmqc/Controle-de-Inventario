import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "@/hook/useAuth"
import { useState } from "react"

export function Login() {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = signin(email, password);

    if (res) {
      setError(res);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
    <div className="mx-auto w-full max-w-[400px] rounded-xl border bg-card p-8 shadow-lg">
      <div className="flex flex-col space-y-2 text-center"> 
        <h1 className="text-2xl font-semibold tracking-tight">
            Entrar na sua conta
          </h1>
          <p className="text-sm text-muted-foreground">
            Escreva seu email abaixo para entrar
          </p>
        </div>

        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>

            </div>
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
            Entrar
          </Button>
        </form>

        
        <p className="px-8 text-center text-sm text-muted-foreground">
          Não possui conta?{" "}
          <Link to="/signup" className="hover:text-brand underline underline-offset-4">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login;
