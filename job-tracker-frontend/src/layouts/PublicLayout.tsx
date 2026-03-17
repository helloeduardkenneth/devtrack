import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const PublicLayout = () => {
  const location = useLocation()

  useEffect(() => {
    const titleMap: Record<string, string> = {
      '/': 'DevTrack | Welcome',
      '/login': 'DevTrack | Login',
      '/signup': 'DevTrack | Sign Up',
      '/forgot-password': 'DevTrack | Forgot Password',
    }

    document.title = titleMap[location.pathname] ?? 'DevTrack'
  }, [location.pathname])

  return (
    <div className="min-h-screen w-full">
      <Outlet />
    </div>
  )
}

export default PublicLayout
