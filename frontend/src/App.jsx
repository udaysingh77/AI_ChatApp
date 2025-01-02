
import { UserProvider } from './context/user.context'
import AppRoutes from './routes/AppRoutes'
import 'remixicon/fonts/remixicon.css'
const App = () => {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
    
  )
}

export default App