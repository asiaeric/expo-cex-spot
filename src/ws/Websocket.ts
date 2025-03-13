import * as Crypto from "expo-crypto";

const generateShortId = () => Crypto.randomUUID().replace(/-/g, "").slice(0, 7);

class CEXWebSocket {
  private static instance: CEXWebSocket;

  private ws!: WebSocket;

  private readonly subscriptions: Map<string, (message: any) => void> =
    new Map();

  public isConnected = false;

  private errorCallback?: (error: any) => void;

  private static readonly RETRY_DELAY = 50;

  private static readonly RETRY_ATTEMPTS = 5;

  private static readonly PING_INTERVAL = 30000;

  private pingIntervalId: ReturnType<typeof setInterval> | null = null;

  private static readonly RECONNECT_INTERVAL = 1000;

  private static readonly WEBSOCKET_URL =
    "wss://qc.cex-websocket.vcex.network/ws";

  private connectionListeners: ((isConnected: boolean) => void)[] = [];

  private reconnectIntervalId: any;

  private constructor() {
    this.initializeWebSocket();
  }

  public static getInstance(): CEXWebSocket {
    if (!CEXWebSocket.instance) {
      CEXWebSocket.instance = new CEXWebSocket();
    }
    return CEXWebSocket.instance;
  }

  private initializeWebSocket() {
    this.ws = new WebSocket(CEXWebSocket.WEBSOCKET_URL);
    this.ws.onopen = this.handleOpen;
    this.ws.onmessage = this.handleMessage;
    this.ws.onclose = this.handleClose;
    this.ws.onerror = this.handleError;
  }

  public setErrorCallback(callback: (error: any) => void): void {
    this.errorCallback = callback;
  }

  public addConnectionListener(listener: (isConnected: boolean) => void): void {
    this.connectionListeners.push(listener);
  }

  public removeConnectionListener(
    listener: (isConnected: boolean) => void,
  ): void {
    this.connectionListeners = this.connectionListeners.filter(
      (l) => l !== listener,
    );
  }

  public subscribe(topic: string, callback: (message: any) => void): void {
    if (!this.subscriptions.has(topic)) {
      // Check if the topic is not already subscribed
      this.subscriptions.set(topic, callback);
      this.sendSocketMessage({
        id: generateShortId(),
        method: "subscribe",
        params: [topic],
      });
    } else {
      console.log(`Already subscribed to topic: ${topic}`);
    }
  }

  public unsubscribe(topic: string): void {
    console.log("WS unsubscribe", topic);
    if (this.subscriptions.has(topic)) {
      this.subscriptions.delete(topic);
      this.sendSocketMessage({
        method: "unsubscribe",
        params: [topic],
      });
      console.log("WS unsubscribe", this.subscriptions);
    }
  }

  public reconnect() {
    if (!this.isConnected) {
      if (this.reconnectIntervalId) {
        clearTimeout(this.reconnectIntervalId);
        this.reconnectIntervalId = null;
      }

      this.reconnectIntervalId = setTimeout(() => {
        this.initializeWebSocket();
      }, CEXWebSocket.RECONNECT_INTERVAL);
    } else {
      console.log("Already connected. No need to reconnect.");
    }
  }

  public async close() {
    await this.unsubscribeAll();
    this.stopPingPong();
    this.ws.close();
    this.isConnected = false;
  }

  private readonly handleOpen = () => {
    this.isConnected = true;
    this.resubscribeAll();
    this.notifyConnectionListeners();
    this.startPingPong();
  };

  private readonly handleMessage = (event: WebSocketMessageEvent) => {
    const message = event.data;
    if (message) {
      this.handleMessageDispatch(message);
    }
  };

  private readonly handleClose = () => {
    this.isConnected = false;
    this.notifyConnectionListeners();
    this.stopPingPong();
    this.reconnect();
  };

  private readonly handleError = (error: Event) => {
    this.errorCallback?.(error);
    this.notifyConnectionListeners();
    this.reconnect();
  };

  private handleMessageDispatch(message: any) {
    const topic = JSON.parse(message).stream;
    const callback = this.subscriptions.get(topic);
    if (callback) {
      callback(JSON.parse(message));
    }
  }

  private sendSocketMessage(
    message: any,
    retryAttempts: number = CEXWebSocket.RETRY_ATTEMPTS,
  ) {
    if (this.isConnected) {
      console.log("SEND MESSAGE", JSON.stringify(message));
      this.ws.send(JSON.stringify(message));
    } else {
      setTimeout(() => {
        this.sendSocketMessage(message, retryAttempts - 1);
      }, CEXWebSocket.RETRY_DELAY);
    }
  }

  private startPingPong() {
    if (!this.pingIntervalId) {
      this.pingIntervalId = setInterval(() => {
        if (this.isConnected) {
          this.ws.send("\n");
        }
      }, CEXWebSocket.PING_INTERVAL);
    }
  }

  private stopPingPong() {
    if (this.pingIntervalId !== null) {
      clearInterval(this.pingIntervalId);
      this.pingIntervalId = null;
    }
  }

  private resubscribeAll() {
    this.subscriptions.forEach((_, topic) => {
      this.sendSocketMessage({
        id: generateShortId(),
        method: "subscribe",
        params: [topic],
      });
    });
  }

  private async unsubscribeAll(): Promise<void> {
    const unsubscribePromises: any = [];
    this.subscriptions.forEach((_, topic) => {
      const promise = new Promise<void>((resolve) => {
        // Simulate acknowledgment or use actual event/callback from server
        this.sendSocketMessage({
          method: "unsubscribe",
          params: [topic],
        });
        setTimeout(resolve, 100); // Assuming 100ms is enough for server to process
      });
      unsubscribePromises.push(promise);
    });

    await Promise.all(unsubscribePromises);
    this.subscriptions.clear();
  }

  private notifyConnectionListeners() {
    this.connectionListeners.forEach((listener) => {
      listener(this.isConnected);
    });
  }
}

export default CEXWebSocket;
