import MainPage from './pages/mainPage'
import { ROUTES } from './modules/Routes'
import MiningServicesPage from './pages/miningServicesPage'
import MiningServicePage from './pages/miningServicePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {useReducer} from 'react'
// import { SearchContext, searchReducer, initialState} from './components/inputField'
import RegistrationPage from './pages/registrationPage'
import LKPage from './pages/LKPage'
import AuthorizationPage from './pages/authorizationPage'

function App() {
  // const [searchState, searchDispatch] = useReducer(searchReducer, initialState);
  
  return (
    // <SearchContext.Provider value = {{ state: searchState, dispatch: searchDispatch }}>
    <BrowserRouter basename="/deposits_frontend">
      <Routes>
        <Route path={ROUTES.HOME} index element={<MainPage />} />
        <Route path={ROUTES.MINING_SERVICES} element={<MiningServicesPage />} />
        <Route path={`${ROUTES.MINING_SERVICES}/:id`} element={<MiningServicePage />} />
        <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
        <Route path={ROUTES.LK} element={<LKPage/>} />
        <Route path={ROUTES.AUTHORISATION} element={<AuthorizationPage/>} />
      </Routes>
    </BrowserRouter>
    // </SearchContext.Provider>
  );
}

export default App