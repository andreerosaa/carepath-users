import Nav from "./components/Nav";
import Main from "./routes/Main";
import UserPage from "./routes/UserPage";
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/:userId' element={<UserPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
