import { Translation, Language, DayItinerary, FlightInfo, PrepItem, InfoItem } from './types';
import { Plane, ShoppingBag, Utensils, Camera, Hotel, MapPin } from 'lucide-react';

export const TRANSLATIONS: Record<Language, Translation> = {
  zh: {
    title: '義烏杭州之旅',
    myTrip: '我的行程',
    addEvent: '新增行程',
    editEvent: '編輯行程',
    delete: '刪除',
    save: '儲存',
    cancel: '取消',
    time: '時間',
    location: '地點',
    notes: '備註 (選填)',
    category: '類型',
    categories: {
      sightseeing: '景點',
      food: '美食',
      shopping: '購物',
      transport: '交通',
      hotel: '住宿',
    },
    generateAi: 'AI 推薦行程',
    generating: '規劃中...',
    navigate: '導航',
    copyAddress: '複製地址',
    emptyState: '今天還沒有行程，點擊右下角新增，或使用 AI 推薦。',
    yiwu: '義烏',
    hangzhou: '杭州',
    menuHotel: '酒店',
    menuPrep: '行前準備',
    menuInfo: '資訊',
    menuCurrency: '匯率計算',
    book: '預訂',
    openMap: '開啟地圖',
    exchangeRate: '參考匯率',
    checkXe: '查看 XE.com 即時匯率',
  },
  ko: {
    title: '이우항주여행',
    myTrip: '나의 일정',
    addEvent: '일정 추가',
    editEvent: '일정 편집',
    delete: '삭제',
    save: '저장',
    cancel: '취소',
    time: '시간',
    location: '장소',
    notes: '메모 (선택)',
    category: '카테고리',
    categories: {
      sightseeing: '관광',
      food: '음식',
      shopping: '쇼핑',
      transport: '교통',
      hotel: '숙박',
    },
    generateAi: 'AI 추천 일정',
    generating: '생성 중...',
    navigate: '길찾기',
    copyAddress: '주소 복사',
    emptyState: '일정이 없습니다. 추가하거나 AI 추천을 받으세요.',
    yiwu: '이우 (Yiwu)',
    hangzhou: '항저우 (Hangzhou)',
    menuHotel: '호텔',
    menuPrep: '준비사항',
    menuInfo: '자료',
    menuCurrency: '환율 계산',
    book: '예약',
    openMap: '지도 열기',
    exchangeRate: '환율',
    checkXe: 'XE.com 실시간 환율 확인',
  },
};

export const INITIAL_ITINERARY: Record<Language, DayItinerary[]> = {
  zh: [
    { 
      id: 'd1', 
      dateStr: '2025-12-30', 
      dayLabel: 'Day 1', 
      events: [
        {
          id: 'zh-30-1',
          time: '16:00',
          location: '義烏雅悅酒店 Check-in',
          notes: '地址: 滙港路599-1號, 義烏',
          category: 'hotel',
          mapQuery: '义乌雅悦酒店'
        },
        {
          id: 'zh-30-2',
          time: '18:30 ~ 21:00',
          location: '晚餐 義烏宴．小宴',
          notes: '',
          category: 'food',
          mapQuery: '义乌宴·小宴'
        },
        {
          id: 'zh-30-3',
          time: '21:00 ~ 23:00',
          location: '賓王夜市 (三挺路夜市)',
          notes: '提示: 晚間人非常的多，請注意不要走散，並且注意隨身貴重物品，以免丟失。',
          category: 'shopping',
          mapQuery: '三挺路夜市'
        },
        {
          id: 'zh-30-4',
          time: '23:00',
          location: '回酒店',
          notes: '',
          category: 'hotel',
          mapQuery: '义乌雅悦酒店',
          hideMap: true
        }
      ] 
    },
    {
      id: 'd2',
      dateStr: '2025-12-31',
      dayLabel: 'Day 2',
      events: [
        {
          id: 'zh-31-1',
          time: '07:00 ~ 09:00',
          location: '雅悅酒店早餐',
          notes: '',
          category: 'food',
          hideMap: true
        },
        {
          id: 'zh-31-2',
          time: '09:50',
          location: '酒店大堂集合',
          notes: '',
          category: 'transport',
          hideMap: true
        },
        {
          id: 'zh-31-3',
          time: '10:00 ~ 11:30',
          location: '前往韓雄貿易有限公司',
          notes: '',
          category: 'sightseeing',
          hideMap: true
        },
        {
          id: 'zh-31-4',
          time: '11:30 ~ 13:00',
          location: '午餐',
          notes: '義烏國際商貿城二區 韓國料理',
          category: 'food',
          mapQuery: '义乌国际商贸城二区'
        },
        {
          id: 'zh-31-5',
          time: '13:00 ~ 16:00',
          location: '參觀義烏國際商貿城(福田市場)',
          notes: '請參考義烏國際商貿城地圖',
          category: 'shopping',
          mapQuery: '义乌国际商贸城二区'
        },
        {
          id: 'zh-31-6',
          time: '16:00 ~ 16:15',
          location: '集合地點等候',
          notes: '',
          category: 'transport',
          hideMap: true
        },
        {
          id: 'zh-31-7',
          time: '17:00 ~ 21:00',
          location: '晚餐 佛堂．唐朝戲宴 (佛堂鎮)',
          notes: '',
          category: 'food',
          mapQuery: '唐潮·戏宴·二十年义乌菜(佛堂古镇店)'
        },
        {
          id: 'zh-31-8',
          time: '21:00 ~ 22:20',
          location: '佛堂老街',
          notes: '跨年夜 有煙花晚會 時間於10點開始',
          category: 'sightseeing',
          mapQuery: '佛堂古镇老街'
        },
        {
          id: 'zh-31-9',
          time: '22:30',
          location: '回酒店',
          notes: '',
          category: 'transport',
          hideMap: true
        }
      ]
    },
    {
      id: 'd3',
      dateStr: '2026-01-01',
      dayLabel: 'Day 3',
      events: [
        {
          id: 'zh-01-1',
          time: '07:00 ~ 09:00',
          location: '雅悅酒店早餐',
          notes: '',
          category: 'food',
          hideMap: true
        },
        {
          id: 'zh-01-2',
          time: '09:20',
          location: '酒店大堂集合',
          notes: '',
          category: 'transport',
          hideMap: true
        },
        {
          id: 'zh-01-3',
          time: '09:30 ~ 12:30',
          location: '前往橫店影視城',
          notes: '',
          category: 'sightseeing',
          mapQuery: '橫店影視城'
        },
        {
          id: 'zh-01-4',
          time: '12:30 ~ 13:30',
          location: '午餐 臨江閣．江景餐廳',
          notes: '',
          category: 'food',
          mapQuery: '珠江渔村·临江阁江景餐厅'
        },
        {
          id: 'zh-01-5',
          time: '13:45 ~ 16:00',
          location: '參觀東陽中國木雕城',
          notes: '',
          category: 'sightseeing',
          mapQuery: '东阳中国木雕城'
        },
        {
          id: 'zh-01-6',
          time: '16:00 ~ 19:00',
          location: '阿里亞娜中東餐廳',
          notes: '',
          category: 'food',
          mapQuery: '阿里亚娜餐厅(新纪元店)'
        },
        {
          id: 'zh-01-7',
          time: '19:10 ~ 21:00',
          location: '義烏天地(自由活動)',
          notes: '',
          category: 'shopping',
          mapQuery: '义乌天地'
        },
        {
          id: 'zh-01-8',
          time: '21:00',
          location: '回酒店',
          notes: '',
          category: 'transport',
          hideMap: true
        }
      ]
    },
    {
      id: 'd4',
      dateStr: '2026-01-02',
      dayLabel: 'Day 4',
      events: [
        {
          id: 'zh-02-1',
          time: '07:00 ~ 09:00',
          location: '雅悅酒店早餐',
          notes: '',
          category: 'food',
          hideMap: true
        },
        {
          id: 'zh-02-2',
          time: '11:30',
          location: '酒店大堂集合/退房',
          notes: '退房時間為11點',
          category: 'hotel',
          hideMap: true
        },
        {
          id: 'zh-02-3',
          time: '12:00 ~ 14:30',
          location: '前往杭州',
          notes: '車程約2小時, 於中途站休息 / 午餐',
          category: 'transport',
          hideMap: true
        },
        {
          id: 'zh-02-4',
          time: '15:00',
          location: '杭州西湖武林Pagoda君亭設計酒店 Check-in',
          notes: '地址：中國,杭州,體育場路261號',
          category: 'hotel',
          mapQuery: '杭州西湖武林Pagoda君亭设计酒店'
        },
        {
          id: 'zh-02-5',
          time: '15:00 ~ 17:00',
          location: '自由活動',
          notes: '',
          category: 'sightseeing',
          hideMap: true
        },
        {
          id: 'zh-02-6',
          time: '17:30',
          location: '酒店大堂集合',
          notes: '',
          category: 'transport',
          hideMap: true
        },
        {
          id: 'zh-02-7',
          time: '18:00 ~ 20:30',
          location: '晚餐 入江南．金獎杭幫菜．浙江菜',
          notes: '地址: 浙江省杭州市西湖区虎跑路四眼井228号',
          category: 'food',
          mapQuery: '入江南·金奖杭帮菜·浙江菜'
        },
        {
          id: 'zh-02-8',
          time: '21:00',
          location: '武林夜市',
          notes: '自由活動',
          category: 'shopping',
          mapQuery: '武林夜市'
        }
      ]
    },
    {
      id: 'd5',
      dateStr: '2026-01-03',
      dayLabel: 'Day 5',
      events: [
        {
          id: 'zh-03-1',
          time: '06:30 ~ 10:00',
          location: '酒店早餐',
          notes: '',
          category: 'food',
          hideMap: true
        },
        {
          id: 'zh-03-2',
          time: '10:00 ~ 11:00',
          location: '大韓民國臨時政府杭州舊址紀念館',
          notes: '地址: 中國浙江省杭州市上城区湖滨长生路55号',
          category: 'sightseeing',
          mapQuery: '大韩民国临时政府杭州旧址纪念馆'
        },
        {
          id: 'zh-03-3',
          time: '11:00 ~ 12:30',
          location: '遊覽西湖 (自由活動)',
          notes: '- 曲院風荷 (西湖十景之一)\n- 岳王廟',
          category: 'sightseeing',
          hideMap: true
        },
        {
          id: 'zh-03-4',
          time: '12:40 ~ 14:00',
          location: '午餐 寄暢興·江南蟹黃麵·非遺杭幫菜(西湖湖景店)',
          notes: '地址：南山路147号西湖天地',
          category: 'food',
          mapQuery: '寄畅興·江南蟹黄面·非遗杭帮菜(西湖湖景店)'
        },
        {
          id: 'zh-03-5',
          time: '14:10 ~ 16:30',
          location: '遊覽西湖 (自由活動)',
          notes: '- 柳浪聞鶯 (西湖十景之一)\n- 錢王祠\n- 湖濱路步行街',
          category: 'sightseeing',
          hideMap: true
        },
        {
          id: 'zh-03-6',
          time: '18:30 ~ 20:30',
          location: '晚餐 杭州酒家',
          notes: '地址: 浙江省杭州市上城区延安路205号1-3层',
          category: 'food',
          mapQuery: '杭州酒家(延安路店)'
        },
        {
          id: 'zh-03-7',
          time: '20:30',
          location: '清河坊歷史文化特色街區 (自由活動)',
          notes: '',
          category: 'shopping',
          mapQuery: '清河坊-大井巷历史文化街区'
        },
        {
          id: 'zh-03-8',
          time: '21:00',
          location: '回酒店',
          notes: '',
          category: 'hotel',
          hideMap: true
        }
      ]
    },
    {
      id: 'd6',
      dateStr: '2026-01-04',
      dayLabel: 'Day 6',
      events: [
        {
          id: 'zh-04-1',
          time: '06:30 ~ 10:00',
          location: '酒店早餐',
          notes: '',
          category: 'food',
          hideMap: true
        },
        {
          id: 'zh-04-2',
          time: '11:00',
          location: '酒店大堂集合/退房',
          notes: '退房時間為11點',
          category: 'hotel',
          hideMap: true
        },
        {
          id: 'zh-04-3',
          time: '11:30',
          location: '前往蕭山國際機場',
          notes: '第四航廈',
          category: 'transport',
          hideMap: true
        }
      ]
    }
  ],
  ko: [
    { 
      id: 'd1', 
      dateStr: '2025-12-30', 
      dayLabel: 'Day 1', 
      events: [
        {
          id: 'ko-30-1',
          time: '16:00',
          location: '야웨호텔 (Yiwu Yandoo Yayue Hotel) 체크인',
          notes: '주소: No.599-1 Huigang Road, Yiwu',
          category: 'hotel',
          mapQuery: '义乌雅悦酒店'
        },
        {
          id: 'ko-30-2',
          time: '18:30 ~ 21:00',
          location: '저녁 이우연회식당 (YIWUYAN.Xiaoyan)',
          notes: '',
          category: 'food',
          mapQuery: '义乌宴·小宴'
        },
        {
          id: 'ko-30-3',
          time: '21:00 ~ 23:00',
          location: '빈왕 야시장 (Binwang Night Market)',
          notes: '주의사항: 저녁에는 사람이 아주 많습니다. 길을 잃지 않도록 주의하시고, 소지품 분실을 피하기 위해 귀중품을 잘 챙겨주시기 바랍니다.',
          category: 'shopping',
          mapQuery: '三挺路夜市'
        },
        {
          id: 'ko-30-4',
          time: '23:00',
          location: '야웨호텔',
          notes: '',
          category: 'hotel',
          mapQuery: '义乌雅悦酒店',
          hideMap: true
        }
      ] 
    },
    {
      id: 'd2',
      dateStr: '2025-12-31',
      dayLabel: 'Day 2',
      events: [
        {
          id: 'ko-31-1',
          time: '07:00 ~ 09:00',
          location: '호텔 조식',
          notes: '',
          category: 'food',
          hideMap: true
        },
        {
          id: 'ko-31-2',
          time: '09:50',
          location: '호텔로비서 집합',
          notes: '',
          category: 'transport',
          hideMap: true
        },
        {
          id: 'ko-31-3',
          time: '10:00 ~ 11:30',
          location: '한웅 무역 회사',
          notes: '',
          category: 'sightseeing',
          hideMap: true
        },
        {
          id: 'ko-31-4',
          time: '11:30 ~ 13:00',
          location: '점심',
          notes: '이우국제시장 2동 한국요리',
          category: 'food',
          mapQuery: '义乌国际商贸城二区'
        },
        {
          id: 'ko-31-5',
          time: '13:00 ~ 16:00',
          location: '이우국제시장 (푸톈 시장）구경',
          notes: '이우국제시장지도 참고',
          category: 'shopping',
          mapQuery: '义乌国际商贸城二区'
        },
        {
          id: 'ko-31-6',
          time: '16:00 ~ 16:15',
          location: '만나는 곳에서 집합',
          notes: '',
          category: 'transport',
          hideMap: true
        },
        {
          id: 'ko-31-7',
          time: '17:00 ~ 21:00',
          location: '저녁 포당.당차오 시엔 (중식)',
          notes: '',
          category: 'food',
          mapQuery: '唐潮·戏宴·二十年义乌菜(佛堂古镇店)'
        },
        {
          id: 'ko-31-8',
          time: '21:00 ~ 22:20',
          location: '포당옛날거리 (Fotang Old street)',
          notes: '신년전야 밤에 불꽃놀이 행사 (10시부터 시작)',
          category: 'sightseeing',
          mapQuery: '佛堂古镇老街'
        },
        {
          id: 'ko-31-9',
          time: '22:30',
          location: '야웨호텔',
          notes: '',
          category: 'hotel',
          hideMap: true
        }
      ]
    },
    {
      id: 'd3',
      dateStr: '2026-01-01',
      dayLabel: 'Day 3',
      events: [
        {
          id: 'ko-01-1',
          time: '07:00 ~ 09:00',
          location: '호텔 조식',
          notes: '',
          category: 'food',
          hideMap: true
        },
        {
          id: 'ko-01-2',
          time: '09:20',
          location: '호텔로비서 집합',
          notes: '',
          category: 'transport',
          hideMap: true
        },
        {
          id: 'ko-01-3',
          time: '09:30 ~ 12:30',
          location: '흠덴 영화촬영소(헝디엔 월드 스튜디오 /Hengdian World Studios) 로 출발',
          notes: '',
          category: 'sightseeing',
          mapQuery: '橫店影視城'
        },
        {
          id: 'ko-01-4',
          time: '12:30 ~ 13:30',
          location: '점심 린장제．강변식당 (Linjiangge. River view restaurant)',
          notes: '',
          category: 'food',
          mapQuery: '珠江渔村·临江阁江景餐厅'
        },
        {
          id: 'ko-01-5',
          time: '13:45 ~ 16:00',
          location: '동양 나무조각박물관',
          notes: '',
          category: 'sightseeing',
          mapQuery: '东阳中国木雕城'
        },
        {
          id: 'ko-01-6',
          time: '16:00 ~ 19:00',
          location: '아리아나중동식당 (ARIANA Restaurant)',
          notes: '',
          category: 'food',
          mapQuery: '阿里亚娜餐厅(新纪元店)'
        },
        {
          id: 'ko-01-7',
          time: '19:10 ~ 21:00',
          location: '이우티엔디 (Yiwu Place) (자유시간)',
          notes: '',
          category: 'shopping',
          mapQuery: '义乌天地'
        },
        {
          id: 'ko-01-8',
          time: '21:00',
          location: '야웨호텔',
          notes: '',
          category: 'hotel',
          hideMap: true
        }
      ]
    },
    {
      id: 'd4',
      dateStr: '2026-01-02',
      dayLabel: 'Day 4',
      events: [
        {
          id: 'ko-02-1',
          time: '07:00 ~ 09:00',
          location: '호텔 조식',
          notes: '',
          category: 'food',
          hideMap: true
        },
        {
          id: 'ko-02-2',
          time: '11:30',
          location: '호텔로비서 집합/체크아웃',
          notes: '체크아웃 시간: 11시',
          category: 'hotel',
          hideMap: true
        },
        {
          id: 'ko-02-3',
          time: '12:00 ~ 14:30',
          location: '항주로 출발',
          notes: '약 2시간 걸림, 휴게소에서 점심',
          category: 'transport',
          hideMap: true
        },
        {
          id: 'ko-02-4',
          time: '15:00',
          location: '서호 우린 파고다 호텔 (The Pagoda Hotel Hangzhou West Lake Wulin) 체크인',
          notes: '주소：中國,杭州,體育場路261號',
          category: 'hotel',
          mapQuery: '杭州西湖武林Pagoda君亭设计酒店'
        },
        {
          id: 'ko-02-5',
          time: '15:00 ~ 17:00',
          location: '자유시간',
          notes: '',
          category: 'sightseeing',
          hideMap: true
        },
        {
          id: 'ko-02-6',
          time: '17:30',
          location: '호텔로비서 집합',
          notes: '',
          category: 'transport',
          hideMap: true
        },
        {
          id: 'ko-02-7',
          time: '18:00 ~ 20:30',
          location: '저녁 루장난 절강성요리',
          notes: '주소: 浙江省杭州市西湖区虎跑路四眼井228号',
          category: 'food',
          mapQuery: '入江南·金奖杭帮菜·浙江菜'
        },
        {
          id: 'ko-02-8',
          time: '21:00',
          location: '우린야시장 (Wulin Night Market)',
          notes: '자유시간',
          category: 'shopping',
          mapQuery: '武林夜市'
        }
      ]
    },
    {
      id: 'd5',
      dateStr: '2026-01-03',
      dayLabel: 'Day 5',
      events: [
        {
          id: 'ko-03-1',
          time: '06:30 ~ 10:00',
          location: '호텔 조식',
          notes: '',
          category: 'food',
          hideMap: true
        },
        {
          id: 'ko-03-2',
          time: '10:00 ~ 11:00',
          location: '대한민국 임시정부 항저우 구지 기념관',
          notes: '주소: 中國浙江省杭州市上城区湖滨长生路55号',
          category: 'sightseeing',
          mapQuery: '大韩民国临时政府杭州旧址纪念馆'
        },
        {
          id: 'ko-03-3',
          time: '11:00 ~ 12:30',
          location: '서호 구경 (자유시간)',
          notes: '- 서호십경 : 곡원풍하 (曲院風荷) : 굽이진 연못에 바람 부는 여름 연꽃\n- 악비묘',
          category: 'sightseeing',
          hideMap: true
        },
        {
          id: 'ko-03-4',
          time: '12:40 ~ 14:00',
          location: '점심 지챵싱 계살국수 (Jì Chàng Xīng 서호호수점)',
          notes: '주소：南山路147号西湖天地',
          category: 'food',
          mapQuery: '寄畅興·江南蟹黄面·非遗杭帮菜(西湖湖景店)'
        },
        {
          id: 'ko-03-5',
          time: '14:10 ~ 16:30',
          location: '서호 구경 (자유시간)',
          notes: '- 서호십경 유랑문앵 (柳浪聞鶯) : 버드나무 물결 속에서 들려오는 꾀꼬리 소리\n- 전왕사\n- 후빈로 번화가',
          category: 'sightseeing',
          hideMap: true
        },
        {
          id: 'ko-03-6',
          time: '18:30 ~ 20:30',
          location: '저녁 항주주가 (Hangzhou Restaurant)',
          notes: '주소 : 浙江省杭州市上城区延安路205号1-3层',
          category: 'food',
          mapQuery: '杭州酒家(延安路店)'
        },
        {
          id: 'ko-03-7',
          time: '20:30',
          location: '칭허팡역사문화거리 (자유시간)',
          notes: '',
          category: 'shopping',
          mapQuery: '清河坊-大井巷历史文化街区'
        },
        {
          id: 'ko-03-8',
          time: '21:00',
          location: '파고다호텔',
          notes: '',
          category: 'hotel',
          hideMap: true
        }
      ]
    },
    {
      id: 'd6',
      dateStr: '2026-01-04',
      dayLabel: 'Day 6',
      events: [
        {
          id: 'ko-04-1',
          time: '06:30 ~ 10:00',
          location: '호텔조식',
          notes: '',
          category: 'food',
          hideMap: true
        },
        {
          id: 'ko-04-2',
          time: '11:00',
          location: '호텔로비서 집합/체크아웃',
          notes: '체크아웃 시간: 11시',
          category: 'hotel',
          hideMap: true
        },
        {
          id: 'ko-04-3',
          time: '11:30',
          location: '항저우공항으로 출발',
          notes: '제4여객터미널',
          category: 'transport',
          hideMap: true
        }
      ]
    }
  ]
};

export const CATEGORY_ICONS = {
  sightseeing: Camera,
  food: Utensils,
  shopping: ShoppingBag,
  transport: Plane,
  hotel: Hotel,
};

// Adjusted colors to harmonize with #f8e8c1 background and #594a40 text
export const CATEGORY_COLORS = {
  sightseeing: 'bg-blue-100 text-[#594a40]',
  food: 'bg-orange-100 text-[#594a40]',
  shopping: 'bg-pink-100 text-[#594a40]',
  transport: 'bg-slate-200 text-[#594a40]',
  hotel: 'bg-purple-100 text-[#594a40]',
};

export const FLIGHT_INFO: FlightInfo = {
  zh: {
    outbound: [
      {
        flightNo: 'CX960',
        from: 'HKG',
        fromTerm: 'T1',
        to: 'HGH',
        toTerm: 'T4',
        time: '12:05 - 14:30'
      },
      {
        flightNo: 'CZ3869',
        from: 'CAN',
        fromTerm: 'T2',
        to: 'HGH',
        toTerm: 'T4',
        time: '12:10 - 14:10'
      }
    ],
    inbound: [
      {
        flightNo: 'CX961',
        from: 'HGH',
        fromTerm: 'T4',
        to: 'HKG',
        toTerm: 'T1',
        time: '15:45 - 18:30'
      },
      {
        flightNo: 'GJ8995',
        from: 'HGH',
        fromTerm: 'T1',
        to: 'CAN',
        toTerm: 'T2',
        time: '19:05 - 21:15'
      }
    ]
  },
  ko: {
    outbound: [
      {
        flightNo: 'OZ359',
        from: 'ICN',
        fromTerm: 'T1',
        to: 'HGH',
        toTerm: 'T4',
        time: '12:30 - 13:45'
      }
    ],
    inbound: [
      {
        flightNo: 'OZ360',
        from: 'HGH',
        fromTerm: 'T4',
        to: 'ICN',
        toTerm: 'T1',
        time: '15:05 - 18:10'
      }
    ]
  }
};

export const HOTEL_DATA = {
  zh: [
    { 
      city: '義烏', 
      date: '12/30 - 01/02', 
      name: '義烏雅悅酒店', 
      address: '滙港路599-1號, 義烏',
      amapUrl: 'https://surl.amap.com/6XmTj5T12fs0',
      bookingUrl: 'https://www.trip.com/w/q9hTFzLxbS2'
    },
    { 
      city: '杭州', 
      date: '01/02 - 01/04', 
      name: '杭州西湖武林Pagoda君亭設計酒店', 
      address: '體育場路261號, 杭州',
      amapUrl: 'https://surl.amap.com/n94yQv1sdob',
      bookingUrl: 'https://www.trip.com/w/EBh2jBLxbS2'
    }
  ],
  ko: [
    { 
      city: '이우 (Yiwu)', 
      date: '12/30 - 01/02', 
      name: 'Yiwu Yandoo Yayue Hotel', 
      address: 'No.599-1 Huigang Road, Yiwu',
      amapUrl: 'https://surl.amap.com/6XmTj5T12fs0',
      bookingUrl: 'https://www.trip.com/w/q9hTFzLxbS2'
    },
    { 
      city: '항저우 (Hangzhou)', 
      date: '01/02 - 01/04', 
      name: 'Pagoda Hotel Hangzhou West Lake Wulin', 
      address: 'No. 261 Tiyuchang Road, Hangzhou',
      amapUrl: 'https://surl.amap.com/n94yQv1sdob',
      bookingUrl: 'https://www.trip.com/w/EBh2jBLxbS2'
    }
  ]
};

const PLUG_IMAGES = [
  'https://dimg04.c-ctrip.com/images/0M75312000gmvwxar988F.jpg_.webp',
  'https://dimg04.c-ctrip.com/images/0M73l12000gmvmheu5762.jpg_.webp'
];

export const PREP_ITEMS: Record<Language, PrepItem[]> = {
  zh: [
    { text: '香港身分證' },
    { text: '回鄉證' },
    { text: '轉插', imgUrls: PLUG_IMAGES },
    { text: '手機充電' },
    { text: '上網卡或漫遊電話' },
    { text: '衛生用品' },
    { text: '保暖衣物' },
    { text: '救急藥物(傷風感冒,胃藥等)' }
  ],
  ko: [
    { text: '여권' },
    { text: '아뎁터', imgUrls: PLUG_IMAGES },
    { text: '해외 결제 가능한 신용카드 혹근 알리페이 / 위쳇페이' },
    { text: '유심 / 포켓와이파이' },
    { text: '충전기' },
    { text: '개인 위생용품' },
    { text: '비상약' },
    { text: '따뜻한 옷' }
  ]
};

export const USEFUL_INFO: Record<Language, InfoItem[]> = {
  zh: [
    { label: '義烏國際商貿地圖', value: '查看網站', url: 'https://ditu.yiwugo.com/' },
    { label: '橫店影視城 明清宮苑地圖', value: '查看圖片', url: 'https://www.hengdianworld.com/Uploads/202510051011u513z6.jpg' }
  ],
  ko: [
    { label: '이우 국제상무성 지도', value: '지도 보기', url: 'https://ditu.yiwugo.com/' },
    { label: '헝디엔 명청궁원 지도', value: '지도 보기', url: 'https://www.hengdianworld.com/Uploads/202510051011u513z6.jpg' }
  ]
};