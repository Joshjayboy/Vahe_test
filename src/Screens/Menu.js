import React from "react";
import ProductList from "../Components/ProductList";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
function Menu() {
  const renderProducts = () => {
    return (
      <div>
        <NavBar />
        <ProductList />
      </div>
    );
  };
  return (
    <><div>
      {renderProducts()}

    </div>
      <Footer />
    </>

  );
}
export default Menu;