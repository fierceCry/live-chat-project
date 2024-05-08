import { 
  WebSocketGateway, // WebSocket 게이트웨이를 정의하기 위한 데코레이터
  WebSocketServer, // WebSocket 서버 인스턴스에 접근하기 위한 데코레이터
  SubscribeMessage, // 특정 메시지 이벤트를 구독하기 위한 데코레이터
  OnGatewayConnection, // 게이트웨이에 새로운 연결이 되었을 때의 처리를 위한 인터페이스
  OnGatewayDisconnect, // 게이트웨이와의 연결이 끊어졌을 때의 처리를 위한 인터페이스
  ConnectedSocket, // 연결된 소켓 인스턴스에 접근하기 위한 데코레이터
  MessageBody // 메시지 본문에 접근하기 위한 데코레이터
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'; // socket.io의 Server와 Socket 모듈 임포트
import { MessagesService } from '../messages/messages.service'; // 메시지 관련 서비스 임포트

@WebSocketGateway({ cors: { origin: '*', credentials: true } }) // WebSocket 게이트웨이 설정, CORS 설정 포함
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect { // 채팅 관련 게이트웨이 클래스 정의
  constructor(
    private messagesService: MessagesService // 메시지 서비스 주입
  ) {}
  
  @WebSocketServer() server: Server; // WebSocket 서버 인스턴스

  async handleConnection(client: Socket) { // 새로운 클라이언트 연결 시 처리
    // 새로운 클라이언트 연결 시 이전 메시지 로드
    const messages = await this.messagesService.findAll();
    client.emit('init', messages); // 로드된 메시지를 클라이언트에게 전송
  }

  handleDisconnect(client: Socket) { // 클라이언트 연결 해제 시 처리
    console.log(`Client disconnected: ${client.id}`); // 콘솔에 연결 해제된 클라이언트 ID 로그 출력
  }

  @SubscribeMessage('message') // 'message' 이벤트 구독
  async handleMessage(client: Socket, payload: { sender: string; content: string }) { // 메시지 이벤트 핸들러
    // 메시지 받기 및 저장
    await this.messagesService.create(payload);
    this.server.emit('message', payload); // 모든 클라이언트에게 메시지 전송
  }

  @SubscribeMessage('join') // 'join' 이벤트 구독
  async handleJoin(@MessageBody() payload: { username: string }, @ConnectedSocket() client: Socket) { // 참여 이벤트 핸들러
    console.log(payload) // 받은 페이로드 콘솔에 출력
    // 사용자가 채팅에 참여했을 때의 로직
    const joinMessage = {
      content: `${payload.username}님이 채팅에 참여하셨습니다.`
    };
    console.log(joinMessage) // 참여 메시지 콘솔에 출력
    this.server.emit('message', joinMessage); // 모든 클라이언트에게 참여 메시지 전송
  }
}
