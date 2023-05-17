import React, { useContext } from 'react';
import './Header.css';
import { ProductsContext } from '../../contexts/ProductsContext';



export default function Header() {
  const { user, setUser } = useContext(ProductsContext);

  const onChangeUser = () => {
    if (user === "Clients") {
      setUser("Provider")
    } else {
      setUser("Clients")
    }

  }
  return (
    <div className='header'>
      <h2>{user}</h2>
      <button className='change-button' onClick={onChangeUser}>
        CAMBIAR A {user === 'Clients' ? 'PROVEEDOR' : 'CLIENTE'}
      </button>
    </div>
  )
}
