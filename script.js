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

  addLog('evt', 'Trigger received');

  // add your reactions here, for example:
  // showImage('photo.png');
  // playAudio('sound.mp3');

}

let ws = null;

function connectWebSocket(){

  const host = window.location.host || 'localhost:3000';
  ws = new WebSocket('ws://' + host);

  ws.onopen = function(){
    document.getElementById('status').textContent = 'Connected';
    addLog('evt', 'WebSocket connected');
  };

  ws.onmessage = function(e){
    const msg = JSON.parse(e.data);
    if (msg.type === 'trigger') onTrigger(msg.data);
  };

  ws.onclose = function(){
    document.getElementById('status').textContent = 'Disconnected';
    setTimeout(connectWebSocket, 3000);
  };

}

connectWebSocket();
