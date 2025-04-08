const API_ENDPOINT = "https://koy4qw8aaa.execute-api.us-east-1.amazonaws.com/sandbox/InventoryItems";

export const inventoryAPI = {
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
            price: item.price
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
  }
};
