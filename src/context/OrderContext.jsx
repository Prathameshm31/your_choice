import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFromStorage, setToStorage } from '../utils/storage';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => getFromStorage('yourchoice_orders', []));

  useEffect(() => {
    setToStorage('yourchoice_orders', orders);
  }, [orders]);

  const placeOrder = (order) => {
    const newOrder = {
      ...order,
      id: order.id || `YC-${Date.now().toString().slice(-8)}`,
      status: order.status || 'Confirmed',
      createdAt: order.createdAt || new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (id, status) => {
    setOrders(prev =>
      prev.map(order => (order.id === id ? { ...order, status } : order))
    );
  };

  const deleteOrder = (id) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  const getOrderById = (id) => {
    return orders.find(order => order.id === id);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        updateOrderStatus,
        deleteOrder,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
