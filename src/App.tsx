import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/404'
import Main from './pages/main'
import Login from './pages/login'

import Home from './pages/main/home'
import Comment from './pages/main/comment'
import Blog from './pages/main/blog'
import Navigation from './pages/main/navigation'
import About from './pages/main/about'
import Draft from './pages/main/draft'
import Write from './pages/main/write'
import Manage from './pages/main/navigation/manage'

const App = () => {
  return (
    <div className="App-container">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="comment" element={<Comment />} />
          <Route path="navigation" element={<Navigation />} />
          <Route path="navigation/manage" element={<Manage />} />
          <Route path="about" element={<About />} />
          <Route path="draft" element={<Draft />} />
          <Route path="write" element={<Write />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
