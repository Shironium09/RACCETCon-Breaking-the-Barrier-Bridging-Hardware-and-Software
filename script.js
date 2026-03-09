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
