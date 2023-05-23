import React, { useContext } from 'react'
import './Products.css';
import edit from '../../shared/assets/edit.png'
import trash from '../../shared/assets/trash.png'
import add from '../../shared/assets/add.png'
import { ProductsContext } from '../../contexts/ProductsContext';

export const Products = ({ product, deleteProduct, addProduct, editProduct, openModal }) => {
    const { user } = useContext(ProductsContext);
    return (

        <div >
            <h1>PRODUCTOS</h1>
            <div className='container'>
                {product.map((item) => (
                    <div className='cards' key={item.id}>
                        <div className='card'>
                            {user === "Provider" && (
                                <div className='icons'>
                                    <button onClick={() => editProduct(item.id)} className='icons-button'><img className='icon' src={edit} alt='edit' /></button>
                                    <button onClick={() => deleteProduct(item.id)} className='icons-button'><img className='icon' src={trash} alt='delete' /></button>
                                </div>
                            )}
                            <h4>{item.name}</h4>
                            <p>Cantidad: {item.amount}</p>
                        </div>
                        <div onClick={() => openModal(item.id)}>
                            <button className='comment-button'>Comentar</button>
                        </div>
                    </div>

                ))}
                {user === "Provider" && (
                <div className='card'>
                    <button onClick={addProduct} className='add-button'><img className='' src={add} alt='add' /></button>
                </div>
                )}
            </div>
        </div>
    )
};



//className={user=== "Clients" ? "clients-mode" : "providers-mode"