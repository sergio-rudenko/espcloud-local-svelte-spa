import { writable } from "svelte/store";
import Sockette from "sockette";

// const url = "wss://echo.websocket.org";
const url = "ws://192.168.127.1/api/v1";

const reconnect_timeout = 1000; //ms
const reconnect_attempts = Infinity;

let connection = null;
let connected = false;

function createWsHandler() {
  const { subscribe, set } = writable({});

  // if (connection === null)
  connection = new Sockette(url, {
    timeout: reconnect_timeout,
    maxAttempts: reconnect_attempts,
    onopen: (e) => {
      console.log("WebSocket Connected!", e);
      set({ state: "connected" });
      connected = true;
    },
    onmessage: (e) => {
      console.log("WebSocket Received:", e);
      console.log(`WebSocket Received: ${String(e.data).length} bytes`);
      let res;
      try {
        res = JSON.parse(e.data);
        res["ts"] = Date.now();
      } catch {
        res = { text: e.data, ts: Date.now() };
      }
      set(res);
    },
    onreconnect: (e) => {
      console.log("WebSocket Reconnecting...", e);
      set({ state: "reconnecting" });
      connected = false;
    },
    onmaximum: (e) => {
      console.log("WebSocket Stop Attempting!", e);
      set({ state: "diconnected" });
      connected = false;
    },
    onclose: (e) => {
      console.log("WebSocket Closed!", e);
      set({ state: "diconnected" });
      connected = false;
    },
    onerror: (e) => {
      console.log("WebSocket Error:", e);
      set({ state: "error", error: e });
      connected = false;
    },
  });

  return {
    subscribe,
    send: (msg) => {
      let req;
      try {
        req = JSON.stringify(msg);
        192;
      } catch {
        req = msg;
      }
      console.log("send:", req);
      connection.send(req);
    },
    reconnect: () => console.log("TODO: reconnect!"),
    disconnect: () => console.log("TODO: disconnect!"),

    isConnected: () => {
      return connected;
    },
  };
}

export const ws = createWsHandler();
