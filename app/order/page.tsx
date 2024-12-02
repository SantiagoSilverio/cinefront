import React from 'react';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import '../order/order.css';
import '../globals.css';

const Order = () => {
  return (
    <div className="order-container">
    <Navbar />
      <div className="order-header">
        <div className="order-back-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
          </svg>
        </div>
        <h2 className="order-title">Tu orden</h2>
      </div>
      <div className="order-box">
        <div className="order-details">
          <table className="order-table">
            <tbody>
              <tr>
                <td>Pelicula</td>
                <td>Rango x2</td>
              </tr>
              <tr>
                <td>Fecha</td>
                <td>11/04</td>
              </tr>
              <tr>
                <td>Horario</td>
                <td>20:00</td>
              </tr>
              <tr>
                <td>Asientos</td>
                <td>F - 8 F - 9</td>
              </tr>
              <tr>
                <td>Store</td>
                <td>Pochoclos grandes x2</td>
              </tr>
              <tr>
                <td>Total</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button className="order-finish-button">Finalizar compra</button>
      <Footer />
    </div>
  );
};

export default Order;
