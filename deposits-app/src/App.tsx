import MainPage from './pages/mainPage'
import { ROUTES } from './modules/Routes'
import MiningServicesPage from './pages/miningServicesPage'
import MiningServicePage from './pages/miningServicePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useReducer } from 'react';
import { SearchContext, searchReducer, initialState} from './components/inputField'

function App() {
  const [searchState, searchDispatch] = useReducer(searchReducer, initialState);
  
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
    <SearchContext.Provider value = {{ state: searchState, dispatch: searchDispatch }}>
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} index element={<MainPage />} />
        <Route path={ROUTES.MINING_SERVICES} element={<MiningServicesPage />} />
        <Route path={`${ROUTES.MINING_SERVICES}/:id`} element={<MiningServicePage />} />
      </Routes>
    </BrowserRouter>
    </SearchContext.Provider>
  );
}

export default App