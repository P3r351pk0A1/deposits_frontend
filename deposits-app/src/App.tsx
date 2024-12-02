import MainPage from './pages/mainPage'
import { ROUTES } from './modules/Routes'
import MiningServicesPage from './pages/miningServicesPage'
import MiningServicePage from './pages/miningServicePage'

  
const { invoke } = (window as any).__TAURI__.tauri;

function App() {
  useEffect(() => {
    invoke('tauri', {cmd: 'create'})
    .then((response: any) => console.log(response))
    .catch((error: any) => console.log(error))

    return () => {
      invoke('tauri', {cmd: 'close'})
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error))
    }
  }, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} index element={<MainPage />} />
        <Route path={ROUTES.MINING_SERVICES} element={<MiningServicesPage />} />
        <Route path={`${ROUTES.MINING_SERVICES}/:id`} element={<MiningServicePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App