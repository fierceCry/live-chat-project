import {
  WebSocketGateway, // WebSocket 게이트웨이를 정의하기 위한 데코레이터
  WebSocketServer, // WebSocket 서버 인스턴스에 접근하기 위한 데코레이터
  SubscribeMessage, // 특정 메시지 이벤트를 구독하기 위한 데코레이터
  OnGatewayConnection, // 게이트웨이에 새로운 연결이 되었을 때의 처리를 위한 인터페이스
  OnGatewayDisconnect, // 게이트웨이와의 연결이 끊어졌을 때의 처리를 위한 인터페이스
  ConnectedSocket, // 연결된 소켓 인스턴스에 접근하기 위한 데코레이터
  MessageBody, // 메시지 본문에 접근하기 위한 데코레이터
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'; // socket.io의 Server와 Socket 모듈 임포트
import { MessagesService } from '../messages/messages.service'; // 메시지 관련 서비스 임포트
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway({ cors: { origin: '*', credentials: true } }) // WebSocket 게이트웨이 설정, CORS 설정 포함
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private messagesService: MessagesService,
    private authService: AuthService,
  ) {}

  @WebSocketServer() server: Server; // WebSocket 서버 인스턴스

  // 유저 입장했을떄 메시지 로드
  async handleConnection(client: Socket) {
    // 새로운 클라이언트 연결 시 처리
    const messages = await this.messagesService.findAll();
    client.emit('init', messages); // 로드된 메시지를 클라이언트에게 전송
  }

  handleDisconnect(client: Socket) {
    // 클라이언트 연결 해제 시 처리
    console.log(`Client disconnected: ${client.id}`); // 콘솔에 연결 해제된 클라이언트 ID 로그 출력
  }

  // 유저가 메시지 남겼을때 동작
  @SubscribeMessage('message')
  async handleMessage(client: Socket, { content }: { content: string }) {
    // 메시지 받기 및 저장
    const accessToken = client.handshake.query.token as string;
    const tokenObj = { accessToken };
    const result = await this.authService.validateUser(tokenObj);
    await this.messagesService.create(result.userId, content);
    const payload = { nickName: result.nickName, content };
    console.log(payload);
    this.server.emit('message', payload); // 모든 클라이언트에게 메시지 전송
  }

  // 새로운 유저 참가 메시지
  @SubscribeMessage('join') // 'join' 이벤트 구독
  async handleJoin(
    @MessageBody() tokenObj: { accessToken: string },
    @ConnectedSocket() client: Socket,
  ) {
    // 사용자가 채팅에 참여했을 때의 로직
    const result = await this.authService.validateUser(tokenObj);
    const joinMessage = {
      content: `${result.nickName}님이 채팅에 참여하셨습니다.`,
    };
    console.log(joinMessage); // 참여 메시지 콘솔에 출력
    this.server.emit('message', joinMessage); // 모든 클라이언트에게 참여 메시지 전송
  }
}
