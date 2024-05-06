import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../messages/messages.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private messagesService: MessagesService) {}
  
  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    // 새로운 클라이언트 연결 시 이전 메시지 로드
    const messages = await this.messagesService.findAll();
    client.emit('init', messages);
  }

  handleDisconnect(client: Socket) {
    // 클라이언트 연결 해제 처리
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: { sender: string; content: string }) {
    // 메시지 받기
    await this.messagesService.create(payload);
    this.server.emit('message', payload); // 모든 클라이언트에게 메시지 전송
  }
}
