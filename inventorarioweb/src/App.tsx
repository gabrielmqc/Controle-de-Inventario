import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Router from "./router"
import { AuthProvider } from "./context/auth"
const queryClient = new QueryClient()


function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </AuthProvider>

  )
}

export default App
