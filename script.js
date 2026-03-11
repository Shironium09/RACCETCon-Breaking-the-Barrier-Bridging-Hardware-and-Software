let logCount = 0;

function showImage(src){

  const img = document.getElementById('boardImage');
  const placeholder = document.getElementById('placeholder');
  img.src = src;
  img.style.display = 'block';
  placeholder.style.display = 'none';
  addLog('img', 'Image: ' + src);

}

function playAudio(src){

  const audio = new Audio(src);
  audio.play().catch(() => {});
  addLog('snd', 'Audio: ' + src);

}

function clearBoard(){

  const img = document.getElementById('boardImage');
  const placeholder = document.getElementById('placeholder');
  img.style.display = 'none';
  img.src = '';
  placeholder.style.display = '';
  addLog('evt', 'Board cleared');

}

function addLog(tag, text){

  logCount++;
  const list = document.getElementById('logList');
  const empty = document.getElementById('logEmpty');
  if (empty) empty.remove();

  const item = document.createElement('div');
  item.className = 'log-item';

  const now = new Date().toLocaleTimeString();
  item.innerHTML =
    '<span class="log-item-tag ' + tag + '">' + tag + '</span>' +
    '<span class="log-item-text">' + text + '</span>' +
    '<span class="log-item-time">' + now + '</span>';

  list.insertBefore(item, list.firstChild);
  document.getElementById('logCount').textContent = logCount;
  
}

function onTrigger(data){

  console.log("Data Received!", data);

  addLog('evt', 'Trigger received');

  var board = document.getElementById('board');
  board.style.background = '#2a7a4a';

  setTimeout(function(){
    board.style.background = '';
  }, 2000);

}

let wasTriggered = false;
const API_URL = 'https://raccetcon-default-rtdb.asia-southeast1.firebasedatabase.app/.json';

function pollButton(){

  fetch(API_URL, { cache: 'no-store' })
    .then(function(res){ return res.json(); })
    .then(function(data){
      document.getElementById('status').textContent = 'listening (firebase)';

      if (data && data.isButtonClicked && !wasTriggered) {
        wasTriggered = true;
        onTrigger(data);
      }

      if (data && !data.isButtonClicked) {
        wasTriggered = false;
      }
    })
    .catch(function(){
      document.getElementById('status').textContent = 'offline';
    });

}

setInterval(pollButton, 1000);
pollButton();
