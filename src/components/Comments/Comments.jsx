import React, { useState, useRef, useContext } from 'react'
import close from '../../shared/assets/close.png'
import './Comments.css';
import { ProductsContext } from '../../contexts/ProductsContext';


export const Comments = ({ addComment, closeModal, product, productComment }) => {
    const {user} = useContext(ProductsContext);
    const [addedComment, setAddedComment] = useState("");
    const inputRef = useRef(null); // referencia del input
    const handleInputChange = (e) => {
        setAddedComment(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setAddedComment("");
        addComment(addedComment);
        inputRef.current.focus(); // enfocar el input
    }

    return (
        <div className='modal'>
            <div className='modal-header'>
                <h4>Comentarios</h4>
                <div onClick={() => closeModal()}>
                    <button className='close-button'><img className='' src={close} alt='close' /></button>
                </div>
            </div>
            <div className='comments-list'>
                {product.map((item) => (
                    <div key={item.id}>
                    
                        {user === "Clients" && item.id === productComment && item.clientsComments.map((comment, index) => (
                            <div className='comment' key={`client-${index}`}>
                                <p>{comment}</p>
                            </div>
                        ))}
                        {user === "Provider" && item.id === productComment && item.providerComments.map((comment, index) => (
                            <div className='comment' key={`client-${index}`}>
                                <p>{comment}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <label className='addcomment-label' htmlFor='add'>Añade un comentario</label>
            <form className='addcomment-form' onSubmit={handleSubmit}>
                <input
                    className='addcomment-input'
                    type="text"
                    id='add'
                    onChange={handleInputChange}
                    value={addedComment}
                    ref={inputRef} // asignar la referencia al input
                />
                <button className='addcomment-button'>AÑADIR</button>
            </form>
        </div>
    );
}