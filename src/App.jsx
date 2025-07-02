import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import BrowsePage from '@/components/pages/BrowsePage'
import PortfolioDetailPage from '@/components/pages/PortfolioDetailPage'
import SearchResultsPage from '@/components/pages/SearchResultsPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-slate-100">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<BrowsePage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/freelancer/:id" element={<PortfolioDetailPage />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          className="mt-16"
        />
      </div>
    </BrowserRouter>
  )
}

export default App