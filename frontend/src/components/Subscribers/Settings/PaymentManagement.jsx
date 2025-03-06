import { useState } from "react";
import { 
  FaCreditCard, 
  FaPaypal, 
  FaPlus, 
  FaCheck, 
  FaTimes, 
  FaTrash,
  FaClock,
  FaDownload
} from 'react-icons/fa';

export default function PaymentManagement() {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "Visa", last4: "1234" },
    { id: 2, type: "PayPal", email: "user@example.com" },
  ]);

  const transactions = [
    { date: "2025-03-05", amount: "$49.99", method: "Visa •••• 1234", status: "Success" },
    { date: "2025-02-05", amount: "$49.99", method: "PayPal (user@example.com)", status: "Success" },
  ];

  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);

  const removePaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  const containerStyle = {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    padding: window.innerWidth <= 768 ? '12px' : '20px',
    boxSizing: 'border-box',
  };

  const contentWrapperStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: window.innerWidth <= 768 ? '16px' : '24px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    width: '100%',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const primaryButton = {
    ...buttonStyle,
    backgroundColor: '#2563eb',
    color: 'white',
  };

  const secondaryButton = {
    ...buttonStyle,
    backgroundColor: '#3b82f6',
    color: 'white',
  };

  const destructiveButton = {
    ...buttonStyle,
    backgroundColor: '#ef4444',
    color: 'white',
  };

  const tableContainerStyle = {
    width: '100%',
    overflowX: 'auto',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  };

  const tableStyle = {
    width: '100%',
    minWidth: '600px',
    borderCollapse: 'collapse',
  };

  const thTdStyle = {
    padding: window.innerWidth <= 768 ? '8px 12px' : '12px 16px',
    textAlign: 'left',
    borderBottom: '1px solid #e5e7eb',
    whiteSpace: 'nowrap',
  };

  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: window.innerWidth <= 768 ? '20px' : '32px',
    borderRadius: '12px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    width: '90%',
    maxWidth: '500px',
    boxSizing: 'border-box',
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 999,
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    marginBottom: '16px',
    fontSize: '16px',
    boxSizing: 'border-box',
  };

  const responsiveFlexContainer = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  };

  const titleStyle = {
    fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem',
    marginBottom: '2rem',
    color: '#1e293b',
  };

  return (
    <div style={containerStyle}>
      <div style={contentWrapperStyle}>
        <h1 style={titleStyle}>Payment Management</h1>
        
        {/* Subscription Details */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#2563eb' }}>Current Subscription</h2>
          <div style={responsiveFlexContainer}>
            <div>
              <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                Plan: <span style={{ fontWeight: '600', color: '#2563eb' }}>Premium</span>
              </p>
              <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>Billing Cycle: Monthly</p>
              <p style={{ color: '#64748b', display: 'flex', alignItems: 'center' }}>
                <FaClock style={{ marginRight: '8px' }} /> Next Payment: 5th April 2025
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button style={secondaryButton}>Upgrade</button>
              <button style={destructiveButton}>Cancel Subscription</button>
            </div>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div style={cardStyle}>
          <div style={responsiveFlexContainer}>
            <h2 style={{ fontSize: '1.5rem', color: '#2563eb' }}>Payment Methods</h2>
            <button 
              style={primaryButton}
              onClick={() => setShowAddPaymentModal(true)}
            >
              <FaPlus style={{ marginRight: '8px' }} /> Add Payment Method
            </button>
          </div>
          
          {paymentMethods.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gap: '12px',
              marginTop: '20px',
              gridTemplateColumns: window.innerWidth <= 768 
                ? '1fr' 
                : 'repeat(auto-fill, minmax(280px, 1fr))'
            }}>
              {paymentMethods.map((method) => (
                <div 
                  key={method.id} 
                  style={{
                    padding: '16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {method.type === "Visa" ? 
                        <FaCreditCard style={{ marginRight: '12px', color: '#2563eb' }} /> :
                        <FaPaypal style={{ marginRight: '12px', color: '#2563eb' }} />
                      }
                      <span>{method.type} {method.last4 ? `•••• ${method.last4}` : method.email}</span>
                    </div>
                    <button 
                      style={{ ...buttonStyle, backgroundColor: '#ef4444', color: 'white', padding: '8px' }}
                      onClick={() => removePaymentMethod(method.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#64748b', textAlign: 'center', padding: '24px' }}>
              No saved payment methods.
            </p>
          )}
        </div>
        
        {/* Transaction History */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#2563eb' }}>Transaction History</h2>
          {transactions.length > 0 ? (
            <div style={tableContainerStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc' }}>
                    <th style={{ ...thTdStyle, fontWeight: '600' }}>Date</th>
                    <th style={{ ...thTdStyle, fontWeight: '600' }}>Amount</th>
                    <th style={{ ...thTdStyle, fontWeight: '600' }}>Payment Method</th>
                    <th style={{ ...thTdStyle, fontWeight: '600' }}>Status</th>
                    <th style={{ ...thTdStyle, fontWeight: '600' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, index) => (
                    <tr key={index}>
                      <td style={thTdStyle}>{tx.date}</td>
                      <td style={thTdStyle}>{tx.amount}</td>
                      <td style={thTdStyle}>{tx.method}</td>
                      <td style={thTdStyle}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {tx.status === "Success" ? (
                            <FaCheck style={{ color: '#22c55e', marginRight: '8px' }} />
                          ) : (
                            <FaTimes style={{ color: '#ef4444', marginRight: '8px' }} />
                          )}
                          {tx.status}
                        </div>
                      </td>
                      <td style={thTdStyle}>
                        <button style={{
                          ...buttonStyle,
                          backgroundColor: 'transparent',
                          color: '#2563eb',
                          padding: '4px 8px',
                        }}>
                          <FaDownload style={{ marginRight: '4px' }} /> Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: '#64748b', textAlign: 'center', padding: '24px' }}>
              No transaction history available.
            </p>
          )}
        </div>

        {/* Add Payment Method Modal */}
        {showAddPaymentModal && (
          <>
            <div style={overlayStyle} onClick={() => setShowAddPaymentModal(false)} />
            <div style={modalStyle}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#2563eb' }}>
                Add New Payment Method
              </h2>
              <input
                style={inputStyle}
                placeholder="Card Number"
                type="text"
              />
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <input
                  style={{ ...inputStyle, marginBottom: 0 }}
                  placeholder="MM/YY"
                  type="text"
                />
                <input
                  style={{ ...inputStyle, marginBottom: 0 }}
                  placeholder="CVV"
                  type="text"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button 
                  style={{ ...buttonStyle, backgroundColor: '#e5e7eb', color: '#374151' }}
                  onClick={() => setShowAddPaymentModal(false)}
                >
                  Cancel
                </button>
                <button 
                  style={primaryButton}
                  onClick={() => setShowAddPaymentModal(false)}
                >
                  Save
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
// original