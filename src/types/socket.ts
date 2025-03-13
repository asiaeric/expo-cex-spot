export interface WebSocketParams {
  op: string;
  args: any[];
}

export interface WebSocketMessage {
  status: string;
  message: string;
  data: unknown;
}
