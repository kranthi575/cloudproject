const API_ENDPOINT = "https://koy4qw8aaa.execute-api.us-east-1.amazonaws.com/sandbox/InventoryItems";
const ORDER_API_ENDPOINT = "https://7awd3v3x1l.execute-api.us-east-1.amazonaws.com/dev/customerOrders";
export const inventoryAPI = {

  
  // 🔹 Inventory Items
  getAllItems: async () => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ operation: "readall" })
      });

      const contentType = response.headers.get("content-type");
      const data = contentType?.includes("application/json")
        ? await response.json()
        : { items: [] };

      return Array.isArray(data.items) ? data.items : [];
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }
  },

  addItem: async (item) => {
   
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operation: "create",
          item: {
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            ownerEmail: item.ownerEmail, // ✅ Use the email from the form
           // owneremail: auth.user?.profile?.email,
          }
        })
      });

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        const text = await response.text();
        return { message: text };
      }
    } catch (error) {
      console.error("Error adding item:", error);
      throw error;
    }
  },

  deleteItem: async (itemId) => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operation: "delete",
          id: itemId
        })
      });
      return await response.json();
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  },

  updateItem: async (item) => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operation: "update",
          item: {
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          }
        })
      });
      return await response.json();
    } catch (error) {
      console.error("Error updating item:", error);
      throw error;
    }
  },

  // 🔹 Customer Orders
  placeOrder: async (order) => {
    try {
      const response = await fetch(ORDER_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operation: "create",
          ...order
        })
      });
      return await response.json();
    } catch (err) {
      console.error("Error placing order:", err);
      throw err;
    }
  },

  getOrdersByEmail: async (email) => {
    try {
      const response = await fetch(ORDER_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operation: "getByEmail",
          email: email
        })
      });
      return await response.json();
    } catch (err) {
      console.error("Error fetching orders:", err);
      throw err;
    }
  },

  getOrdersByOwnerEmail: async (ownerEmail) => {
    try {
      const response = await fetch(ORDER_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operation: "getByOwnerEmail",
          ownerEmail: ownerEmail
        })
      });
      return await response.json();
    } catch (err) {
      console.error("Error fetching orders by owner:", err);
      throw err;
    }
  }
};



