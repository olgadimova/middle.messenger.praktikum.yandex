import { EventBus } from '.';

type Message = {
  content: string;
  id: number;
  time: string;
  type: string;
  user_id: number;
};

enum WSTransportEvents {
  Error = 'error',
  Connected = 'open',
  Close = 'close',
  Message = 'message',
}

export class WSTransport extends EventBus {
  private socket?: WebSocket;

  private pingInterval?: ReturnType<typeof setInterval>;

  private readonly pingIntervalTime = 30000;

  private url: string = 'wss://ya-praktikum.tech/ws';

  constructor(url: string) {
    super();
    this.url += url;
  }

  public send(data: string | number | object) {
    if (!this.socket) {
      throw new Error('socket is not connected');
    }

    this.socket.send(JSON.stringify(data));
  }

  public connect(url: string): Promise<void> {
    if (this.socket) {
      throw new Error('socket is already connected');
    }

    this.socket = new WebSocket(this.url + url);

    this.subscribe(this.socket);
    this.setupPing();

    return new Promise((resolve, reject) => {
      this.on(WSTransportEvents.Error, reject);
      this.on(WSTransportEvents.Connected, () => {
        this.off(WSTransportEvents.Error, reject);
        resolve();
      });
      this.on(WSTransportEvents.Message, (message: Message) => {
        console.log('hi message', message);
      });
    });
  }

  public close() {
    this.socket?.close();
    clearInterval(this.pingInterval);
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, this.pingIntervalTime);

    this.on(WSTransportEvents.Close, () => {
      clearInterval(this.pingInterval);
      this.pingInterval = undefined;
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WSTransportEvents.Connected);
    });

    socket.addEventListener('close', () => {
      this.emit(WSTransportEvents.Close);
    });

    socket.addEventListener('error', (e: Event) => {
      this.emit(WSTransportEvents.Error, e);
    });

    socket.addEventListener('message', (message: MessageEvent) => {
      try {
        const data = JSON.parse(message.data);
        if (['pong', ['user connected']].includes(data?.type)) {
          return;
        }
        this.emit(WSTransportEvents.Message, data);
      } catch (err) {
        console.log(err);
      }
    });
  }
}
