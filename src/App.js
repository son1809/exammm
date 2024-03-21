import { Route, Routes } from "react-router-dom";

function App() {
  return (
     <>
        <Header />

        <Menu />
      
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/" Component={AboutUs} />
      </Routes>


      <Footer/>
     </>    
  );
}

export default App;
