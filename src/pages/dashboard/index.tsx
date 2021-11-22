import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Products } from "../../components/Products";
import { Header } from "../../components/Header";
import { NewProductModal } from "../../components/NewProductModal";
import { useProducts } from "../../hooks/useProducts";

Modal.setAppElement('#root');

export default function App() {

  const { searchProducts } = useProducts();

  const [isNewTransactionsModalOpen, setIsNewTransactionsModalOpen] = useState(false);

  useEffect(() => {
    searchProducts()
  }, [searchProducts])

  function handleOpenNewProductModal(){
    setIsNewTransactionsModalOpen(true);
  }
  
  function handleCloseNewProductModal(){
    setIsNewTransactionsModalOpen(false);
  }

  return (
    <>
     <Header onOpenNewTransactionModal={handleOpenNewProductModal} />
     <Products />
     <NewProductModal 
      isOpen={isNewTransactionsModalOpen} 
      onRequestClose={handleCloseNewProductModal}
     />
    </>
  )
}