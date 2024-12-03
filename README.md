# 부루마블 은행 웹앱

부루마블(한국식 모노폴리) 게임에서 은행 역할을 도와주는 웹앱.   
아이와 부루마블하다가 종이화폐 주고받고 하기가 귀찮아서 태블릿 사용해서 돈계산하려고 만들었음.

## 주요 기능

- 4명의 플레이어 지원
- 플레이어별 자금 관리
- 은행과의 거래 (받기/지불)
- 플레이어 간 송금
- 플레이어 이름 수정 기능
- 거래 내역 실시간 확인
- 모바일 환경 지원

## 실행

https://zelopy.github.io

## 사용 방법

1. **플레이어 설정**
   - 각 플레이어의 이름을 클릭하여 수정할 수 있습니다.
   - 수정된 이름은 자동으로 저장됩니다.

2. **은행 거래**
   - 금액을 입력하고 '은행에서 받기' 또는 '은행에 지불' 버튼을 클릭합니다.
   - 잔액이 부족한 경우 지불이 불가능합니다.

3. **플레이어 간 송금**
   - 송금할 대상을 선택합니다.
   - 금액을 입력하고 '송금하기' 버튼을 클릭합니다.

## 기술 스택

- HTML5
- CSS3
- JavaScript
- localStorage를 이용한 데이터 저장

## 특징

- 반응형 디자인으로 모바일에서도 사용 가능
- 각 플레이어별 구분되는 파스텔톤 색상
- 실시간 거래 내역 확인
