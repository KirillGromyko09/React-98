import {Link, Route, Routes} from "react-router-dom";
import PostsList from "./components/PostsList.jsx";
import AddPostForm from "./components/AddPostForm.jsx";
import EditPostForm from "./components/EditPostForm.jsx";
import {Button} from "@mui/material";


function App() {

  return (
      <div className="App">
          <nav>
              <Button variant='outlined'>
                    <Link to="/">Posts</Link>
              </Button>
              <Button variant='outlined'>
                    <Link to="/add">Add Post</Link>
              </Button>
          </nav>
          <Routes>
              <Route path="/" element={<PostsList/>}/>
              <Route path="/add" element={<AddPostForm/>}/>
              <Route path="/edit/:id" element={<EditPostForm/>}/>
          </Routes>
      </div>
  )
}

export default App
