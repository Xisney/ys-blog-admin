import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loading from './components/loading'
import NotFound from './pages/404'
import Main from './pages/main'
import Home from './pages/main/home'

const Comment = lazy(() => import('./pages/main/comment'))
const Blog = lazy(() => import('./pages/main/blog'))
const Navigation = lazy(() => import('./pages/main/navigation'))
const About = lazy(() => import('./pages/main/about'))
const Draft = lazy(() => import('./pages/main/draft'))
const Write = lazy(() => import('./pages/main/write'))
const Manage = lazy(() => import('./pages/main/navigation/manage'))
const Login = lazy(() => import('./pages/login'))
const Upload = lazy(() => import('./pages/main/upload'))

const App = () => {
  return (
    <div className="App-container">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route
            path="blog"
            element={
              <Suspense fallback={<Loading />}>
                <Blog />
              </Suspense>
            }
          />
          <Route
            path="comment"
            element={
              <Suspense fallback={<Loading />}>
                <Comment />
              </Suspense>
            }
          />
          <Route
            path="navigation"
            element={
              <Suspense fallback={<Loading />}>
                <Navigation />
              </Suspense>
            }
          />
          <Route
            path="navigation/manage"
            element={
              <Suspense fallback={<Loading />}>
                <Manage />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<Loading />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="draft"
            element={
              <Suspense fallback={<Loading />}>
                <Draft />
              </Suspense>
            }
          />
          <Route
            path="write"
            element={
              <Suspense fallback={<Loading />}>
                <Write />
              </Suspense>
            }
          />
          <Route
            path="upload"
            element={
              <Suspense fallback={<Loading />}>
                <Upload />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="login"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
