import { http, HttpResponse } from 'msw'

const chatList = [
  {
    id: 1,
    name: 'TEAM A',
    lastMessage: '확인!',
    time: '오후 2:06',
    unreadCount: 0
  },
  {
    id: 2,
    name: 'TEAM B',
    lastMessage: '언제까지 말씀드리면 될까요?',
    time: '오후 2:01',
    unreadCount: 3
  },
  {
    id: 3,
    name: 'TEAM C',
    lastMessage: '수고하셨어요',
    time: '어제',
    unreadCount: 1
  },
  {
    id: 4,
    name: 'PARK',
    lastMessage: '잘 봐 보자구~',
    time: '목요일',
    unreadCount: 0
  },
  {
    id: 5,
    name: 'MOON',
    lastMessage: '또 연락 주세요!',
    time: '월요일',
    unreadCount: 0
  }
]

const chatMessages = {
  1: [
    { sender: 'JANG', text: '안녕하세요', time: '오후 2:00' },
    { sender: 'JANG', text: '잘 부탁드립니다.', time: '오후 2:02' }
  ],
  2: [
    { sender: 'LEE', text: '언제까지 말씀드리면 될까요?', time: '오후 2:00' },
    { sender: 'ME', text: '내일까지 부탁드립니다.', time: '오후 2:01' }
  ]
}

const ChatHandler = [
  http.get('/api/v1/chats', () => {
    return HttpResponse.json({ data: chatList }, { status: 200 })
  }),

  // 특정 채팅방 메시지 조회
  http.get('/api/v1/chats/:chatId/messages', ({ params }) => {
    const { chatId } = params
    const messages = chatMessages[chatId] || []
    return HttpResponse.json({ data: messages }, { status: 200 })
  })
]

export default ChatHandler
