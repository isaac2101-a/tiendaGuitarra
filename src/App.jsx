import { useState, useEffect } from 'react'
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from './data/db'

function App() {
 
    //localstorage ===> API ===> recuperar productor y mostrarlos ///
    const initialCart = () => {
      const localStorageCart = localStorage.getItem('cart')
      return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS = 5
    const MIN_ITEM = 1

    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
    
//agregar elemento al carrito evitando duplicados
    function addToCart(item){

      const itemExists = cart.findIndex(guitar => guitar.id === item.id)
      if(itemExists >=0){ //existe en el carrito
        if(cart[itemExists].quantity >= MAX_ITEMS) return
        const updatedCart = [...cart]
        updatedCart[itemExists].quantity++
        setCart(updatedCart)

      }else{
        item.quantity = 1
       setCart( [...cart, item])
      }
      
    } 
    //eliminar elemento del carrito
  
    function removeFromCart(id ){
      setCart(prevCart => prevCart.filter(guitar => guitar.id !== id ))
    }

    //incrementar o decrementar productos en el carrito de compras

    function increaseQuantity (id){
      
      const updatedCart = cart.map( item => {
        if(item.id === id && item.quantity < MAX_ITEMS){
          return{
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item
      })
      setCart(updatedCart)
    }

    function decreaseQuantity(id){
      
      const updatedCart = cart.map( item => {
        if(item.id === id && item) {
          return {
            ...item,
            quantity: item.quantity - 1
          }

        }
        return item

      })

      setCart(updatedCart)
    }

    //funcion limpiar carrito

    function clearCart(){
      setCart([]) //reinicar a un arreglo vacio para limpiar el carrito 
    }

    //carrito de compras persistente /// local historage ///API===>JSON
/*
    function saveLocalStorage(){
      localStorage.setItem('cart', JSON.stringify(cart))
    } */

  return (
    <>
    <Header 
    
      cart={cart}
      removeFromCart={removeFromCart}
      decreaseQuantity={decreaseQuantity}
      increaseQuantity={increaseQuantity}
      clearCart={clearCart}
      
    />
       
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) =>(
            <Guitar
               key={guitar.id}
               guitar={guitar}
               setCart={setCart}
               addToCart={addToCart}
            />
          ))}
        
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">1544C D4N1E1</p>
        </div>
    </footer>

   
    </>
  )
}

export default App
