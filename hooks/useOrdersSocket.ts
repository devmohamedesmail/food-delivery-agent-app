import { useEffect } from "react";
import { io } from "socket.io-client";

export default function useOrdersSocket(storeId: number, onNewOrder: (order:any) => void) {
  useEffect(() => {
    const socket = io("https://food-delivery-and-rides.onrender.com", {
      transports: ["websocket"],
    });


    // join room
    socket.emit("join_store", `restaurant:${storeId}`);
    // when new order arrives
    socket.on("new_order", (order) => {
      console.log("⚡ New order:", order);
      onNewOrder(order);
    });

    return () => {
      socket.disconnect();
    };
  }, [storeId]);
}
