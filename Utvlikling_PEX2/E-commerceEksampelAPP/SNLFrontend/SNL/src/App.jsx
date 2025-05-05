import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductList from './components/ProductList'
import AddProductForm from './components/AddProductForm'
import EditProductForm from './components/EditProductForm'
import DeleteProductForm from './components/DeleteProductForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Ski Nett Lager</h1>
      <ProductList />
      <AddProductForm />
      <EditProductForm />
      <DeleteProductForm />
    </>
  )
}

export default App
