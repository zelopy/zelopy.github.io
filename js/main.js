const STARTING_MONEY = 3000000;
let players = [];
let transactions = [];

// players 배열 초기화 수정
function initializePlayers() {
	for (let i = 1; i <= 4; i++) {
		players.push({
			id: i,
			name: localStorage.getItem(`player${i}Name`) || `플레이어 ${i}`,
			balance: STARTING_MONEY
		});
	}
	updateDisplay();
}

// updateDisplay 함수 수정
function updateDisplay() {
	const playersLeftDiv = document.getElementById('players-left');
	const playersRightDiv = document.getElementById('players-right');
	playersLeftDiv.innerHTML = '';
	playersRightDiv.innerHTML = '';
	
	players.forEach((player, index) => {
		const playerSection = document.createElement('div');
		playerSection.className = 'player-section';
		playerSection.id = `player-${player.id}`;
		
		const otherPlayers = players
			.filter(p => p.id !== player.id)
			.map(p => `<option value="${p.id}">${p.name}</option>`)
			.join('');

		playerSection.innerHTML = `
			<div class="player-header">
				<input type="text" 
					   class="player-name" 
					   value="${player.name}"
					   onchange="updatePlayerName(${player.id}, this.value)"
					   onclick="this.select()"
				>
			</div>
			<div class="balance">${formatMoney(player.balance)}원</div>
			<div class="controls">
				<div class="bank-controls">
					<input type="number" id="amount-${player.id}" placeholder="금액" style="width: 120px;">
					<button class="receive-bank" onclick="receiveFromBank(${player.id})">은행에서 받기</button>
					<button class="pay-bank" onclick="payToBank(${player.id})">은행에 지불</button>
				</div>
				<div class="transfer-controls">
					<select id="transfer-to-${player.id}">
						${otherPlayers}
					</select>
					<button class="transfer" onclick="transferMoney(${player.id})">송금하기</button>
				</div>
			</div>
		`;

		if (index < 2) {
			playersLeftDiv.appendChild(playerSection);
		} else {
			playersRightDiv.appendChild(playerSection);
		}
	});
	
	// 거래 내역 업데이트
	updateHistory();
}

// 플레이어 이름 업데이트 함수 추가
function updatePlayerName(playerId, newName) {
	const player = players.find(p => p.id === playerId);
	if (player) {
		player.name = newName;
		localStorage.setItem(`player${playerId}Name`, newName);
		updateDisplay(); // 모든 선택박스의 이름도 업데이트하기 위해
	}
}

function formatMoney(amount) {
	return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function receiveFromBank(playerId) {
	const amount = parseInt(document.getElementById(`amount-${playerId}`).value);
	if (!validateAmount(amount)) return;
	
	const player = players.find(p => p.id === playerId);
	player.balance += amount;
	addTransaction(player.name, amount, true, '은행');
	updateDisplay();
}

function payToBank(playerId) {
	const amount = parseInt(document.getElementById(`amount-${playerId}`).value);
	if (!validateAmount(amount)) return;
	
	const player = players.find(p => p.id === playerId);
	if (!validateBalance(player, amount)) return;
	
	player.balance -= amount;
	addTransaction(player.name, amount, false, '은행');
	updateDisplay();
}

function transferMoney(fromPlayerId) {
	const amount = parseInt(document.getElementById(`amount-${fromPlayerId}`).value);
	const toPlayerId = parseInt(document.getElementById(`transfer-to-${fromPlayerId}`).value);
	
	if (!validateAmount(amount)) return;
	
	const fromPlayer = players.find(p => p.id === fromPlayerId);
	const toPlayer = players.find(p => p.id === toPlayerId);
	
	if (!validateBalance(fromPlayer, amount)) return;
	
	fromPlayer.balance -= amount;
	toPlayer.balance += amount;
	
	addTransaction(fromPlayer.name, amount, false, toPlayer.name);
	updateDisplay();
}

function validateAmount(amount) {
	if (isNaN(amount) || amount <= 0) {
		alert('올바른 금액을 입력하세요');
		return false;
	}
	return true;
}

function validateBalance(player, amount) {
	if (player.balance < amount) {
		alert('잔액이 부족합니다!');
		return false;
	}
	return true;
}

function addTransaction(playerName, amount, isAddition, targetName) {
	const transaction = {
		playerName,
		targetName,
		amount,
		isAddition,
		timestamp: new Date()
	};
	transactions.unshift(transaction);
	updateHistory();
}

function updateHistory() {
	const historyDiv = document.getElementById('history');
	historyDiv.innerHTML = transactions.map(t => {
		let description;
		if (t.targetName === '은행') {
			description = t.isAddition ? 
				`${t.playerName}이(가) 은행에서 받음` :
				`${t.playerName}이(가) 은행에 지불`;
		} else {
			description = `${t.playerName}이(가) ${t.targetName}에게 송금`;
		}
		
		return `
			<div class="transaction-item">
				<span>${description}</span>
				<span class="${t.isAddition ? 'positive' : 'negative'}">
					${t.isAddition ? '+' : '-'}${formatMoney(t.amount)}원
				</span>
				<small>(${t.timestamp.toLocaleTimeString()})</small>
			</div>
		`;
	}).join('');
}

// 게임 시작 시 4명의 플레이어 초기화
initializePlayers();
