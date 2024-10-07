import { BrowserRouter as Router } from 'react-router-dom';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card } from './components/ui/card';
import { Badge, Sheet } from 'lucide-react';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';

function App() {
  return (
    <Router>
      <div className="flex">
        <Button>Ola</Button>
        <Input></Input>
        
        <Card>dsadas</Card>
        <Sheet>dasd</Sheet>
        <Badge></Badge>
        <DropdownMenu>sdas</DropdownMenu>
        <main className="flex-1">
          {/* Your main content goes here */}
        </main>
      </div>
    </Router>
  )
}

export default App
