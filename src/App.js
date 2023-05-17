import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';


function App() {
  const [number, setNumber] = useState(0)
  const [arrayProducts, setArrayProducts] = useState([])
  
  
  return (
    
    <ProductsPage></ProductsPage>
  
  )
   

      {/* <ProductsContext.Provider value={{number, setNumber, arrayProducts, setArrayProducts}}>
        <Comments></Comments>
      </ProductsContext.Provider>
  ); */}
}

export default App;
