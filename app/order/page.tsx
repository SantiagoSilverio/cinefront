'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './order.css';
import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';

interface OrderDetails {
  ticketNumber: string;
  movieTitle: string;
  dateTime: string;
  seats: string;
  selectedTickets: string;
  total: number;
}

const Order = React.memo(() => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [orderDetails, setOrderDetails] = useState<OrderDetails>(() => {
    const ticketNumber = 'A-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const storedData = JSON.parse(localStorage.getItem('reservationData') || '{}');

    const formattedTickets = storedData.ticketTypes?.map((ticket: any) =>
      ticket.quantity > 0 ? `${ticket.quantity} ${ticket.name}` : null
    ).filter(Boolean).join(', ') || 'Sin entradas';

    return {
      ticketNumber,
      movieTitle: storedData.movieTitle || '',
      dateTime: storedData.dateTime || '',
      seats: storedData.seats || '',
      selectedTickets: formattedTickets,
      total: storedData.total || 0
    };
  });

  useEffect(() => {
    const barcodeCanvas = document.getElementById('barcode');
    const qrCanvas = document.getElementById('qrCode');

    if (barcodeCanvas && orderDetails.ticketNumber) {
      try {
        JsBarcode(barcodeCanvas, orderDetails.ticketNumber, {
          format: "CODE128",
          width: 2,
          height: 50,
          displayValue: true,
        });

        if (qrCanvas) {
          QRCode.toCanvas(qrCanvas, orderDetails.ticketNumber, {
            width: 100,
            margin: 2,
          });
        }
      } catch (error) {
        console.error('Error generating barcode or QR code:', error);
      }
    }
  }, [orderDetails.ticketNumber]);

  const generatePDF = useCallback(async () => {
    if (ticketRef.current) {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const pdf = new jsPDF('p', 'mm');
      let position = 0;

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`ticket_${orderDetails.ticketNumber}.pdf`);
    }
  }, [orderDetails.ticketNumber]);

  const handleFinishPurchase = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setShowConfetti(true);

      await generatePDF();

      setTimeout(() => {
        router.push('/');
      }, 1500);

    } catch (err) {
      setError('Error al procesar la orden. Por favor, intenta nuevamente.');
      setShowConfetti(false);
    } finally {
      setLoading(false);
    }
  }, [generatePDF, router]);

  return (
    <div className="order-container" style={{ minHeight: '100vh', height: 'auto' }}>
      {showConfetti && <div className="confetti-overlay" />}

      <div className="order-header">
        <div
          className="order-back-arrow"
          onClick={() => router.back()}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <svg
            className={isHovering ? 'hover' : ''}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
          </svg>
        </div>
      </div>

      <div className="ticket-container" ref={ticketRef}>
        <div className="ticket">
          <div className="ticket-header">
            <div className="cinema-name"></div>
            <div className="ticket-number">N° {orderDetails.ticketNumber}</div>
          </div>

          <div className="ticket-content">
            <div className="ticket-detail">
              <span className="label">Película:</span>
              <span className="value">{orderDetails.movieTitle}</span>
            </div>
            <div className="ticket-detail">
              <span className="label">Día y horario:</span>
              <span className="value">{orderDetails.dateTime}</span>
            </div>
            <div className="ticket-detail">
              <span className="label">Butacas:</span>
              <span className="value">{orderDetails.seats}</span>
            </div>
            <div className="ticket-detail">
              <span className="label">Entradas:</span>
              <span className="value">{orderDetails.selectedTickets}</span>
            </div>
            <div className="ticket-total">
              <span className="label">TOTAL:</span>
              <span className="value">${orderDetails.total.toLocaleString()}</span>
            </div>

            <div className="ticket-warning">
              <div className="warning-icon"> ⚠️ </div>
              <div className="warning-text">
                CONSERVAR ESTE COMPROBANTE<br />
                PARA MOSTRARLO EN VENTANILLA
              </div>
            </div>
          </div>

          <div className="ticket-footer">
            <div className="barcode-qr-container">
              <canvas id="barcode"></canvas>
              <canvas id="qrCode"></canvas>
            </div>
          </div>

        </div>
      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}

      <button
        className={`order-finish-button ${loading ? 'loading' : ''}`}
        onClick={handleFinishPurchase}
        disabled={loading}
      >
        {loading ? (
          <span className="button-content">
            <span className="spinner"></span>
            Procesando...
          </span>
        ) : (
          'Finalizar compra'
        )}
      </button>
    </div>
  );
});

export default Order;
