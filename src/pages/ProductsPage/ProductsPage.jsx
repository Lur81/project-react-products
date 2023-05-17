import React, { useState } from 'react'
import { Products } from '../../components/Products/Products'
import { Comments } from '../../components/Comments/Comments';
import ReactModal from 'react-modal';
import Modal from 'react-modal';
import Header from '../../components/Header/Header';
import './ProductsPage.css';
import { ProductsContext } from '../../contexts/ProductsContext';
import bckground from '../../shared/assets/bckground.png';
import bckgroundBW from '../../shared/assets/bckgroundBW.png';

Modal.setAppElement('#root'); // o appElement="#root" si estás utilizando React Modal como componente

export const ProductsPage = () => {

    const arrayProducts = [
        {
            id: 1,
            name: "Manzana",
            amount: 10,
            clientsComments: ["Comentario de prueba de cliente"],
            providerComments: ["Comentario de prueba de proveedor"]
        },
        {
            id: 2,
            name: "Pera",
            amount: 5,
            clientsComments: ["Comentario de prueba de cliente"],
            providerComments: ["Comentario de prueba de proveedor"]
        },
        {
            id: 3,
            name: "Platano",
            amount: 3,
            clientsComments: ["Comentario de prueba de cliente"],
            providerComments: ["Comentario de prueba de proveedor"]
        },
    ]
    
    const [nextId, setNextId] = useState(arrayProducts.length + 1);
    const [products, setProducts] = useState(arrayProducts)
    const [open, setOpen] = useState(false);
    const [productComment, setproductComment] = useState(null);
    const [user, setUser] = useState("Clients")
    const backgroundStyle = {
        backgroundImage: user==="Clients" ? `url(${bckground})` : `url(${bckgroundBW})`,
        backgroundSize: 'cover',
        height: '100vh'
      };


    //FUNCION EDITAR

    const editProduct = (index) => {
        const editProductsList = [...products];
        let newName = prompt("Introduce nombre de producto:");
        let newAmount = prompt("Introduce cantidad de producto:");
      
        while (isNaN(newAmount)) {
          alert("Error: La cantidad ingresada no es un número válido.");
          newAmount = prompt("Introduce cantidad de producto:");
        }
      
        editProductsList.find((editpro) => editpro.id === index).name =
          newName ? newName : editProductsList.find((editpro) => editpro.id === index).name;
        editProductsList.find((editpro) => editpro.id === index).amount = parseFloat(newAmount);
        setProducts(editProductsList);
        console.log(editProductsList);
        console.log(products);
      };

    //FUNCION AÑADIR
    const addProduct = () => {
        let productName;
        productName = prompt("Introduce nombre de producto:");
        let productAmount;
        productAmount = prompt("Introduce cantidad de producto:")
        const newProduct = {
            id: nextId,
            name: productName,
            amount: productAmount
        }

        products.push(newProduct)
        setProducts(products);
        setNextId(nextId + 1);

    }
    //FUNCION BORRAR
    const deleteProduct = (index) => {
        const deleteProductsList = products.filter((item) => {
            return index !== item.id;
        });
        setProducts(deleteProductsList);
    }

    //AÑADIR COMENTARIOS 
    const addComment = (comment) => {
        const newComment = comment.trim();
        const updatedProducts = products.map((product) => {
          if (product.id === productComment) {
            if (user === "Clients") {
              return {
                ...product,
                clientsComments: newComment !== "" ? [...product.clientsComments, newComment] : product.clientsComments
              };
            } else {
              return {
                ...product,
                providerComments: newComment !== "" ? [...product.providerComments, newComment] : product.providerComments
              };
            }
          }
          return product;
        });
        setProducts(updatedProducts);
      };

    //ABRIR MODAL
    const openModal = (productID) => {
        setproductComment(productID);
        setOpen(true);

    };

    //CERRAR MODAL
    const closeModal = () => {
        setproductComment(null);
        setOpen(false);

    };

    return (
        <div className='Page' style={backgroundStyle}>
        <ProductsContext.Provider value={{user, setUser}}>
                <Header></Header>
                <Products
                    editProduct={editProduct}
                    addProduct={addProduct}
                    deleteProduct={deleteProduct}
                    product={products}
                    openModal={openModal}

                >
                </Products>

                <ReactModal className='position' ReactModal isOpen={open}>
                    <Comments
                    
                        addComment={addComment}
                        closeModal={closeModal}
                        product={products}
                        productComment={productComment}
                    >
                    </Comments>
                </ReactModal>
                </ProductsContext.Provider>
        </div>


    )
}


