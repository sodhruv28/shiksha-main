import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../payment.css"

const PaymentHistoryForm = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/cart/history'); // Adjust the endpoint based on your backend setup
        setPaymentHistory(response.data.paymentHistory.data);
      } catch (error) {
        setError('An error occurred while fetching payment history.');
      }
    };

    fetchPaymentHistory();
  }, []);

  return (
    <div className="payment-history-container">
      {error && <div className="error-message">{error}</div>}
      <h2>Payment History</h2>
      <table className="payment-history-table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Email</th>
            <th>Country</th>
            <th>Brand</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((payment) => (
            <tr key={payment.id}>
              <td>{(payment.amount / 100).toFixed(2)}</td>
              <td>{payment.payment_method && payment.payment_method.billing_details.email}</td>
              <td>{payment.payment_method && payment.payment_method.billing_details.address.country}</td>
              <td>{payment.payment_method && payment.payment_method.card.brand}</td>
              <td>{payment.payment_method && payment.payment_method.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistoryForm;
