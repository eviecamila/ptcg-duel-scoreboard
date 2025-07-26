document.addEventListener("DOMContentLoaded", function () {
  const initialState = {
    names: { 1: 'Player 1', 2: 'Player 2' },
    prizeState: { 1: 0, 2: 0 },
    winState: { 1: 0, 2: 0 }
  };

  let currentState = JSON.parse(JSON.stringify(initialState));



  document.getElementById('updateNamesButton').addEventListener('click', function () {
    const player1Input = document.getElementById('player1Input').value.trim();
    const player2Input = document.getElementById('player2Input').value.trim();

    currentState.names[1] = player1Input || 'Player 1';
    currentState.names[2] = player2Input || 'Player 2';

    updateNames();
  });

  function updateNames() {
    document.getElementById('player1Name').textContent = currentState.names[1];
    document.getElementById('player2Name').textContent = currentState.names[2];
  }

  const prizeImg = 'prize.png';
  const takenImg = 'taken.png';
  const totalPrizes = 6;

  function updatePrizes(playerId) {
    const container = document.getElementById(`prize${playerId}`);
    container.innerHTML = '';

    for (let i = 0; i < totalPrizes; i++) {
      const img = document.createElement('img');
      img.src = i < currentState.prizeState[playerId] ? takenImg : prizeImg;
      img.alt = i < currentState.prizeState[playerId] ? 'Taken' : 'Prize';
      img.style.width = '50px';
      img.style.height = '50px';
      container.appendChild(img);
    }
  }

  function updateWins(playerId) {
    document.getElementById(`win${playerId}`).textContent = currentState.winState[playerId];
  }

  function resetMatch() {
    currentState.prizeState[1] = 0;
    currentState.prizeState[2] = 0;
    updatePrizes(1);
    updatePrizes(2);
  }

  // Inicializar interfaz
  updateNames();
  updatePrizes(1);
  updatePrizes(2);
  updateWins(1);
  updateWins(2);

  document.getElementById('btnPrize1Dec').addEventListener('click', function () {
    if (currentState.prizeState[1] < totalPrizes) {
      currentState.prizeState[1]++;
      updatePrizes(1);
    }
  });

  document.getElementById('btnPrize1Inc').addEventListener('click', function () {
    if (currentState.prizeState[1] > 0) {
      currentState.prizeState[1]--;
      updatePrizes(1);
    }
  });

  document.getElementById('btnPrize2Dec').addEventListener('click', function () {
    if (currentState.prizeState[2] < totalPrizes) {
      currentState.prizeState[2]++;
      updatePrizes(2);
    }
  });

  document.getElementById('btnPrize2Inc').addEventListener('click', function () {
    if (currentState.prizeState[2] > 0) {
      currentState.prizeState[2]--;
      updatePrizes(2);
    }
  });

  document.getElementById('btnWin1').addEventListener('click', function () {
    currentState.winState[1]++;
    resetMatch();
    updateWins(1);
  });

  document.getElementById('btnWin2').addEventListener('click', function () {
    currentState.winState[2]++;
    resetMatch();
    updateWins(2);
  });

  document.getElementById('btnResetAll').addEventListener('click', function () {
    currentState = JSON.parse(JSON.stringify(initialState));
    updateNames();
    updatePrizes(1);
    updatePrizes(2);
    updateWins(1);
    updateWins(2);
    document.getElementById('player1Input').value = '';
    document.getElementById('player2Input').value = '';
  });
});
