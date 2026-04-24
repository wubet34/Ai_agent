// ═══════════════════════════════════════════════════
// WUBET COPILOT — Puter AI (free, no key) + Auth + Profile
// ═══════════════════════════════════════════════════

const SYS = 'You are Wubet Copilot, a helpful AI assistant specializing in Computer Science, programming, software engineering, and tech careers. Be concise, accurate, and use markdown formatting (bold, lists, code blocks) where helpful. Keep responses focused and practical.';

// ── App state ──
let currentUser   = null;
let chatHistory   = [];
let isTyping      = false;
let currentSection = 'chat';

// ── Helpers: per-user localStorage keys ──
const key = k => `wc_${currentUser?.email}_${k}`;
const load = (k, def) => { try { return JSON.parse(localStorage.getItem(key(k))) ?? def; } catch { return def; } };
const save = (k, v)   => localStorage.setItem(key(k), JSON.stringify(v));

let savedItems    = [];
let tasks         = [];
let recentHistory = [];

// ── DOM ──
const authScreen    = document.getElementById('authScreen');
const appScreen     = document.getElementById('appScreen');
const loginForm     = document.getElementById('loginForm');
const registerForm  = document.getElementById('registerForm');
const tabLogin      = document.getElementById('tabLogin');
const tabRegister   = document.getElementById('tabRegister');
const loginError    = document.getElementById('loginError');
const registerError = document.getElementById('registerError');

const sidebar         = document.getElementById('sidebar');
const overlay         = document.getElementById('overlay');
const menuBtn         = document.getElementById('menuBtn');
const closeSidebarBtn = document.getElementById('closeSidebar');
const newChatBtn      = document.getElementById('newChatBtn');
const textInput       = document.getElementById('textInput');
const sendBtn         = document.getElementById('sendBtn');
const micBtn          = document.getElementById('micBtn');
const messages        = document.getElementById('messages');
const welcomeScreen   = document.getElementById('welcomeScreen');
const historyList     = document.getElementById('historyList');
const chatArea        = document.getElementById('chatArea');
const topbarTitle     = document.getElementById('topbarTitle');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const recentSection   = document.getElementById('recentSection');
const aiStatus        = document.getElementById('aiStatus');
const statusDot       = aiStatus?.querySelector('.status-dot');
const statusLabel     = aiStatus?.querySelector('.status-label');

// ════════════════════════════════════════
// AUTH SYSTEM
// ════════════════════════════════════════

function getUsers() { return JSON.parse(localStorage.getItem('wc_users') || '[]'); }
function saveUsers(u) { localStorage.setItem('wc_users', JSON.stringify(u)); }

// Tab switching
tabLogin.addEventListener('click', () => {
  tabLogin.classList.add('active'); tabRegister.classList.remove('active');
  loginForm.classList.add('active'); registerForm.classList.remove('active');
  loginError.textContent = '';
});
tabRegister.addEventListener('click', () => {
  tabRegister.classList.add('active'); tabLogin.classList.remove('active');
  registerForm.classList.add('active'); loginForm.classList.remove('active');
  registerError.textContent = '';
});

// Login
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const pass  = document.getElementById('loginPassword').value;
  const users = getUsers();
  const user  = users.find(u => u.email === email && u.password === btoa(pass));
  if (!user) { loginError.textContent = 'Invalid email or password.'; return; }
  loginSuccess(user);
});

// Register
registerForm.addEventListener('submit', e => {
  e.preventDefault();
  const name  = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const pass  = document.getElementById('regPassword').value;
  const role  = document.getElementById('regRole').value;
  const users = getUsers();
  if (users.find(u => u.email === email)) { registerError.textContent = 'Email already registered.'; return; }
  const user = { name, email, password: btoa(pass), role, avatarColor: '#2f81f7', createdAt: Date.now() };
  users.push(user); saveUsers(users);
  loginSuccess(user);
});

// Demo login
window.demoLogin = () => {
  const users = getUsers();
  let demo = users.find(u => u.email === 'demo@wubet.ai');
  if (!demo) {
    demo = { name: 'Demo User', email: 'demo@wubet.ai', password: btoa('demo123'), role: 'CS Student', avatarColor: '#6e40c9', createdAt: Date.now() };
    users.push(demo); saveUsers(users);
  }
  loginSuccess(demo);
};

function loginSuccess(user) {
  currentUser = user;
  localStorage.setItem('wc_session', user.email);
  loadUserData();
  authScreen.classList.add('hidden');
  appScreen.classList.remove('hidden');
  updateProfileUI();
  renderRecentHistory();
  renderTasks();
  updateSendBtn();
  setTimeout(() => textInput?.focus(), 100);
  // Voice greeting — stored for first user interaction (mobile needs gesture)
  window._pendingGreeting = `Hey ${user.name.split(' ')[0]}! I'm Wubet, your AI assistant. What can I help you with today?`;
}

function loadUserData() {
  savedItems    = load('library', []);
  tasks         = load('tasks', []);
  recentHistory = load('recent', []);
}

// Auto-login from session
window.addEventListener('DOMContentLoaded', () => {
  const session = localStorage.getItem('wc_session');
  if (session) {
    const user = getUsers().find(u => u.email === session);
    if (user) { loginSuccess(user); return; }
  }
  updateSendBtn();
});

// Logout
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  localStorage.removeItem('wc_session');
  currentUser = null; chatHistory = [];
  appScreen.classList.add('hidden');
  authScreen.classList.remove('hidden');
  loginForm.reset(); registerForm.reset();
  loginError.textContent = ''; registerError.textContent = '';
  tabLogin.click();
});

// ════════════════════════════════════════
// PROFILE
// ════════════════════════════════════════

function updateProfileUI() {
  if (!currentUser) return;
  const initial = currentUser.name?.[0]?.toUpperCase() || 'U';
  const color   = currentUser.avatarColor || '#2f81f7';

  // Sidebar
  document.getElementById('sidebarAvatar').textContent = initial;
  document.getElementById('sidebarAvatar').style.background = color;
  document.getElementById('sidebarName').textContent = currentUser.name;
  document.getElementById('sidebarRole').textContent = currentUser.role;

  // Topbar
  document.getElementById('topbarAvatar').textContent = initial;
  document.getElementById('topbarAvatar').style.background = color;

  // Profile panel
  document.getElementById('profileAvatar').textContent = initial;
  document.getElementById('profileAvatar').style.background = color;
  document.getElementById('profileName').textContent = currentUser.name;
  document.getElementById('profileEmail').textContent = currentUser.email;
  document.getElementById('profileRole').textContent = currentUser.role;

  // Edit form defaults
  document.getElementById('editName').value = currentUser.name;
  document.getElementById('editRole').value = currentUser.role;

  // Welcome title
  document.getElementById('welcomeTitle').textContent = `Hi ${currentUser.name.split(' ')[0]}, how can I help?`;

  updateStats();
}

function updateStats() {
  document.getElementById('statChats').textContent = recentHistory.length;
  document.getElementById('statSaved').textContent = savedItems.length;
  document.getElementById('statTasks').textContent = tasks.length;
  document.getElementById('statDone').textContent  = tasks.filter(t => t.done).length;
}

// Avatar color picker
document.getElementById('avatarChangeBtn')?.addEventListener('click', () => {
  document.getElementById('avatarColors').classList.toggle('visible');
});

document.querySelectorAll('.color-dot').forEach(dot => {
  dot.addEventListener('click', () => {
    const color = dot.dataset.color;
    currentUser.avatarColor = color;
    persistUser();
    updateProfileUI();
    document.getElementById('avatarColors').classList.remove('visible');
    showToast('✓ Avatar color updated');
  });
});

// Profile form save
document.getElementById('profileForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('editName').value.trim();
  const role = document.getElementById('editRole').value;
  const pass = document.getElementById('editPassword').value;
  if (!name) return;
  currentUser.name = name;
  currentUser.role = role;
  if (pass && pass.length >= 6) currentUser.password = btoa(pass);
  persistUser();
  updateProfileUI();
  document.getElementById('editPassword').value = '';
  showToast('✓ Profile saved');
});

function persistUser() {
  const users = getUsers();
  const idx = users.findIndex(u => u.email === currentUser.email);
  if (idx >= 0) { users[idx] = currentUser; saveUsers(users); }
}

// Profile nav buttons (topbar + sidebar footer)
document.querySelectorAll('[data-section="profile"]').forEach(btn => {
  btn.addEventListener('click', () => switchSection('profile'));
});

// ════════════════════════════════════════
// SIDEBAR & NAVIGATION
// ════════════════════════════════════════

const TITLES = { chat:'Wubet Copilot', library:'Library', tasks:'Tasks', discover:'Discover', imagine:'Imagine', labs:'Labs', profile:'Profile' };

function switchSection(section) {
  currentSection = section;
  document.querySelectorAll('.nav-item').forEach(i => i.classList.toggle('active', i.dataset.section === section));
  document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === `panel-${section}`));
  recentSection.style.display = section === 'chat' ? '' : 'none';
  topbarTitle.textContent = TITLES[section] || 'Wubet Copilot';
  if (section === 'library') renderLibrary();
  if (section === 'tasks')   renderTasks();
  if (section === 'profile') { updateStats(); }
  closeSidebar();
}

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => switchSection(item.dataset.section));
});

const openSidebar  = () => { sidebar.classList.add('open'); overlay.classList.add('active'); };
const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('active'); };
menuBtn?.addEventListener('click', openSidebar);
closeSidebarBtn?.addEventListener('click', closeSidebar);
overlay?.addEventListener('click', closeSidebar);

newChatBtn?.addEventListener('click', () => {
  switchSection('chat');
  messages.innerHTML = '';
  chatHistory = [];
  welcomeScreen.style.display = 'flex';
  textInput.value = ''; autoResize(); updateSendBtn();
});

// Fire question into chat from any panel
function fireQuestion(q) {
  switchSection('chat');
  textInput.value = q; autoResize(); updateSendBtn();
  sendMessage();
}

document.querySelectorAll('.suggestion-card').forEach(c => c.addEventListener('click', () => fireQuestion(c.dataset.q)));
document.querySelectorAll('.discover-card').forEach(c => c.addEventListener('click', () => fireQuestion(c.dataset.q)));
document.querySelectorAll('.imagine-btn').forEach(b => b.addEventListener('click', () => fireQuestion(b.dataset.q)));
document.querySelectorAll('.lab-start-btn').forEach(b => {
  b.addEventListener('click', () => { const card = b.closest('.lab-card'); if (card) fireQuestion(card.dataset.q); });
});

clearHistoryBtn?.addEventListener('click', () => {
  recentHistory = []; save('recent', recentHistory);
  renderRecentHistory(); showToast('History cleared');
});

// ════════════════════════════════════════
// TEXTAREA & SEND BUTTON
// ════════════════════════════════════════

function autoResize() {
  textInput.style.height = 'auto';
  textInput.style.height = Math.min(textInput.scrollHeight, 200) + 'px';
}
function updateSendBtn() { sendBtn.disabled = !textInput?.value.trim() || isTyping; }

textInput?.addEventListener('input', () => { autoResize(); updateSendBtn(); });
textInput?.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (!sendBtn.disabled) sendMessage(); }
});
sendBtn?.addEventListener('click', sendMessage);

// ── Voice ──
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new SR(); rec.lang = 'en-US'; rec.interimResults = false;
  rec.onresult = e => { textInput.value = e.results[0][0].transcript; autoResize(); updateSendBtn(); micBtn.style.color = ''; };
  rec.onerror = rec.onend = () => { micBtn.style.color = ''; };
  micBtn?.addEventListener('click', () => { micBtn.style.color = 'var(--accent)'; rec.start(); });
} else if (micBtn) { micBtn.style.opacity = '0.4'; micBtn.title = 'Voice not supported'; }

// ════════════════════════════════════════
// CAMERA
// ════════════════════════════════════════

const cameraBtn     = document.getElementById('cameraBtn');
const cameraModal   = document.getElementById('cameraModal');
const cameraClose   = document.getElementById('cameraClose');
const cameraSnap    = document.getElementById('cameraSnap');
const cameraFlip    = document.getElementById('cameraFlip');
const cameraUpload  = document.getElementById('cameraUpload');
const cameraVideo   = document.getElementById('cameraVideo');
const cameraCanvas  = document.getElementById('cameraCanvas');
const imgFileInput  = document.getElementById('imgFileInput');
const imgCameraInput = document.getElementById('imgCameraInput');
const imgPreviewWrap= document.getElementById('imgPreviewWrap');
const imgPreview    = document.getElementById('imgPreview');
const imgRemoveBtn  = document.getElementById('imgRemoveBtn');

let cameraStream    = null;
let facingMode      = 'environment'; // back camera default
let attachedImage   = null;          // base64 data URL

// Open camera — show action sheet on mobile, modal on desktop
cameraBtn?.addEventListener('click', () => {
  const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) {
    showCameraSheet();
  } else {
    if (navigator.mediaDevices?.getUserMedia) {
      cameraModal.classList.remove('hidden');
      startCamera();
    } else {
      imgFileInput.removeAttribute('capture');
      imgFileInput.click();
    }
  }
});

function showCameraSheet() {
  // Remove any existing sheet
  document.getElementById('camSheet')?.remove();
  const sheet = document.createElement('div');
  sheet.id = 'camSheet';
  sheet.style.cssText = `
    position:fixed;bottom:0;left:0;right:0;z-index:300;
    background:var(--surface);border-top:1px solid var(--border);
    border-radius:20px 20px 0 0;padding:16px;
    display:flex;flex-direction:column;gap:10px;
    animation:slideUp .25s ease;
  `;
  sheet.innerHTML = `
    <div style="width:40px;height:4px;background:var(--border);border-radius:4px;margin:0 auto 8px;"></div>
    <button id="sheetCamera" style="display:flex;align-items:center;gap:14px;padding:14px 16px;background:var(--surface2);border:1px solid var(--border);border-radius:12px;color:var(--text);font-size:15px;font-family:inherit;cursor:pointer;">
      <i class="fa-solid fa-camera" style="color:var(--accent);font-size:20px;width:24px;text-align:center;"></i> Take Photo
    </button>
    <button id="sheetGallery" style="display:flex;align-items:center;gap:14px;padding:14px 16px;background:var(--surface2);border:1px solid var(--border);border-radius:12px;color:var(--text);font-size:15px;font-family:inherit;cursor:pointer;">
      <i class="fa-solid fa-image" style="color:var(--accent);font-size:20px;width:24px;text-align:center;"></i> Choose from Gallery
    </button>
    <button id="sheetCancel" style="padding:14px;background:transparent;border:none;color:var(--text-muted);font-size:14px;font-family:inherit;cursor:pointer;">Cancel</button>
  `;
  document.body.appendChild(sheet);

  // Backdrop
  const backdrop = document.createElement('div');
  backdrop.id = 'camBackdrop';
  backdrop.style.cssText = 'position:fixed;inset:0;z-index:299;background:rgba(0,0,0,0.5);';
  document.body.appendChild(backdrop);

  const close = () => { sheet.remove(); backdrop.remove(); };

  document.getElementById('sheetCamera').onclick = () => {
    close();
    // Use dedicated camera input (capture="environment" hardcoded in HTML)
    imgCameraInput.click();
  };
  document.getElementById('sheetGallery').onclick = () => {
    close();
    // Use gallery input (no capture attribute)
    imgFileInput.click();
  };
  document.getElementById('sheetCancel').onclick = close;
  backdrop.onclick = close;
}

// Close camera modal
cameraClose?.addEventListener('click', stopCamera);
cameraModal?.addEventListener('click', e => { if (e.target === cameraModal) stopCamera(); });

async function startCamera() {
  try {
    if (cameraStream) cameraStream.getTracks().forEach(t => t.stop());
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false
    });
    cameraVideo.srcObject = cameraStream;
  } catch (err) {
    stopCamera();
    // Fallback to file upload if camera not available
    imgFileInput.click();
  }
}

function stopCamera() {
  if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); cameraStream = null; }
  cameraModal.classList.add('hidden');
}

// Flip camera
cameraFlip?.addEventListener('click', () => {
  facingMode = facingMode === 'environment' ? 'user' : 'environment';
  startCamera();
});

// Take snapshot
cameraSnap?.addEventListener('click', () => {
  const w = cameraVideo.videoWidth;
  const h = cameraVideo.videoHeight;
  cameraCanvas.width = w;
  cameraCanvas.height = h;
  cameraCanvas.getContext('2d').drawImage(cameraVideo, 0, 0, w, h);
  const dataUrl = cameraCanvas.toDataURL('image/jpeg', 0.85);
  setAttachedImage(dataUrl);
  stopCamera();
});

// Upload from gallery
cameraUpload?.addEventListener('click', () => {
  stopCamera();
  imgFileInput.click();
});

// File input change (gallery)
imgFileInput?.addEventListener('change', e => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => setAttachedImage(ev.target.result);
  reader.readAsDataURL(file);
  imgFileInput.value = '';
});

// Camera input change (take photo)
imgCameraInput?.addEventListener('change', e => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => setAttachedImage(ev.target.result);
  reader.readAsDataURL(file);
  imgCameraInput.value = '';
});

function setAttachedImage(dataUrl) {
  attachedImage = dataUrl;
  imgPreview.src = dataUrl;
  imgPreviewWrap.classList.remove('hidden');
  updateSendBtn();
}

// Remove attached image
imgRemoveBtn?.addEventListener('click', () => {
  attachedImage = null;
  imgPreview.src = '';
  imgPreviewWrap.classList.add('hidden');
  updateSendBtn();
});

// Override updateSendBtn to also enable when image attached
function updateSendBtn() {
  sendBtn.disabled = (!textInput?.value.trim() && !attachedImage) || isTyping;
}

// ════════════════════════════════════════
// FREE AI — Puter (no key needed)
// ════════════════════════════════════════

async function callAI(userMessage, imageDataUrl) {
  const msgs = [{ role: 'system', content: SYS }];
  chatHistory.slice(-8).forEach(m => msgs.push({ role: m.role, content: m.text }));

  if (imageDataUrl) {
    // Vision message with image
    msgs.push({
      role: 'user',
      content: [
        { type: 'image_url', image_url: { url: imageDataUrl } },
        { type: 'text', text: userMessage || 'What do you see in this image? Describe it in detail.' }
      ]
    });
  } else {
    msgs.push({ role: 'user', content: userMessage });
  }

  const resp = await puter.ai.chat(msgs, { model: 'gpt-4o-mini' });
  const text = typeof resp === 'string' ? resp
    : resp?.message?.content ?? resp?.content ?? String(resp);
  if (!text?.trim()) throw new Error('Empty response. Please try again.');
  return text.trim();
}

// ── Status indicator ──
function setStatus(state) {
  if (!statusDot || !statusLabel) return;
  statusDot.className = 'status-dot' + (state === 'loading' ? ' loading' : state === 'error' ? ' error' : '');
  statusLabel.textContent = state === 'loading' ? 'Thinking…' : state === 'error' ? 'Error' : 'AI Ready';
}

// ════════════════════════════════════════
// MARKDOWN FORMATTER
// ════════════════════════════════════════

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function formatMd(text) {
  const blocks = [];
  text = text.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, _l, code) => {
    blocks.push(`<pre><code>${escapeHtml(code.trim())}</code></pre>`);
    return `\x00B${blocks.length - 1}\x00`;
  });
  text = text.replace(/`([^`\n]+)`/g, (_, c) => `<code>${escapeHtml(c)}</code>`);
  text = text.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');

  const html = text.split(/\n\n+/).map(block => {
    if (block.includes('\x00B')) return block;
    const lines = block.split('\n').filter(l => l.trim());
    if (!lines.length) return '';
    if (lines.every(l => /^[-•]\s/.test(l.trim())))
      return '<ul>' + lines.map(l => `<li>${l.replace(/^[-•]\s+/,'')}</li>`).join('') + '</ul>';
    if (lines.every(l => /^\d+\.\s/.test(l.trim())))
      return '<ol>' + lines.map(l => `<li>${l.replace(/^\d+\.\s+/,'')}</li>`).join('') + '</ol>';
    if (lines.length === 1 && /^#{1,3}\s/.test(lines[0]))
      return `<h3>${lines[0].replace(/^#+\s/,'')}</h3>`;
    return `<p>${lines.join('<br>')}</p>`;
  }).join('');

  return html.replace(/\x00B(\d+)\x00/g, (_, i) => blocks[+i]);
}

// ════════════════════════════════════════
// MESSAGE RENDERING
// ════════════════════════════════════════

function appendUser(text, imageDataUrl) {
  welcomeScreen.style.display = 'none';
  const d = document.createElement('div');
  d.className = 'msg-user';
  const imgHtml = imageDataUrl
    ? `<img class="msg-image" src="${imageDataUrl}" alt="attached image" />`
    : '';
  d.innerHTML = `<div class="msg-user-bubble">${imgHtml}${text ? escapeHtml(text) : ''}</div>`;
  messages.appendChild(d); scrollBottom();
}

function showTyping() {
  const d = document.createElement('div');
  d.className = 'typing-indicator'; d.id = 'typingDots';
  d.innerHTML = `<div class="ai-avatar"><i class="fa-solid fa-robot"></i></div><div class="typing-dots"><span></span><span></span><span></span></div>`;
  messages.appendChild(d); scrollBottom();
}
function removeTyping() { document.getElementById('typingDots')?.remove(); }

function createAIBubble(badge, isError = false) {
  removeTyping();
  const id = Date.now();
  const d = document.createElement('div');
  d.className = 'msg-ai' + (isError ? ' msg-error' : '');
  d.dataset.id = id;
  d.innerHTML = `
    <div class="ai-avatar"><i class="fa-solid fa-robot"></i></div>
    <div class="msg-ai-content">
      <div class="ai-name">Wubet Copilot <span class="ai-badge">${badge}</span></div>
      <div class="ai-text streaming-cursor" id="at-${id}"></div>
      <div class="ai-actions" id="aa-${id}" style="display:none">
        <button class="ai-action-btn" onclick="copyMsg(this,${id})"><i class="fa-regular fa-copy"></i> Copy</button>
        <button class="ai-action-btn" onclick="saveLib(this,${id})"><i class="fa-regular fa-bookmark"></i> Save</button>
        <button class="ai-action-btn" id="voiceReadBtn" onclick="readAloud(this,${id})" title="Read aloud"><i class="fa-solid fa-volume-high"></i></button>
        <button class="ai-action-btn" onclick="likeMsg(this)"><i class="fa-regular fa-thumbs-up"></i> Helpful</button>
        <button class="ai-action-btn" onclick="dislikeMsg(this)"><i class="fa-regular fa-thumbs-down"></i></button>
      </div>
    </div>`;
  messages.appendChild(d); scrollBottom();
  return id;
}

function finalizeAI(id, text) {
  const te = document.getElementById(`at-${id}`);
  const ae = document.getElementById(`aa-${id}`);
  if (te) { te.innerHTML = formatMd(text); te.classList.remove('streaming-cursor'); }
  if (ae) ae.style.display = 'flex';
  const d = document.querySelector(`[data-id="${id}"]`);
  if (d) d.dataset.text = text;
  scrollBottom();
}

function scrollBottom() { requestAnimationFrame(() => { chatArea.scrollTop = chatArea.scrollHeight; }); }

// ── Action buttons ──
window.copyMsg = (btn, id) => {
  const el = document.querySelector(`[data-id="${id}"]`);
  if (!el) return;
  navigator.clipboard.writeText(el.dataset.text || '').then(() => {
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
    setTimeout(() => { btn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy'; }, 2000);
  });
};

window.saveLib = (btn, id) => {
  const el = document.querySelector(`[data-id="${id}"]`);
  if (!el) return;
  const text = el.dataset.text || '';
  const all = [...messages.children];
  const idx = all.indexOf(el);
  let question = 'Saved answer';
  for (let i = idx - 1; i >= 0; i--) {
    if (all[i].classList.contains('msg-user')) {
      question = all[i].querySelector('.msg-user-bubble')?.textContent || question; break;
    }
  }
  savedItems.unshift({ id: Date.now(), question, answer: text, time: new Date().toLocaleString() });
  save('library', savedItems);
  btn.classList.add('saved');
  btn.innerHTML = '<i class="fa-solid fa-bookmark"></i> Saved';
  showToast('✓ Saved to Library');
  updateStats();
};

window.likeMsg = btn => {
  btn.classList.toggle('liked');
  btn.innerHTML = btn.classList.contains('liked') ? '<i class="fa-solid fa-thumbs-up"></i> Helpful' : '<i class="fa-regular fa-thumbs-up"></i> Helpful';
};
window.dislikeMsg = btn => { btn.innerHTML = '<i class="fa-solid fa-thumbs-down"></i>'; btn.style.color = '#f85149'; };

// ════════════════════════════════════════
// SEND MESSAGE
// ════════════════════════════════════════

async function sendMessage() {
  const question = textInput.value.trim();
  if ((!question && !attachedImage) || isTyping) return;

  // Fire pending voice greeting on first user gesture (mobile-safe)
  if (window._pendingGreeting) {
    speakGreeting(window._pendingGreeting);
    window._pendingGreeting = null;
  }

  isTyping = true;
  const imageToSend = attachedImage;
  const label = question || 'Analyze this image';

  // Animate image flying up then clear
  if (imageToSend && imgPreviewWrap) {
    imgPreviewWrap.classList.add('sending');
    await new Promise(r => setTimeout(r, 300));
  }

  // Clear input + image
  textInput.value = ''; autoResize();
  attachedImage = null;
  imgPreview.src = '';
  imgPreviewWrap.classList.remove('sending');
  imgPreviewWrap.classList.add('hidden');
  updateSendBtn();

  // Show user message (with image if attached)
  appendUser(label, imageToSend);
  addToRecent(label);
  showTyping();
  setStatus('loading');

  try {
    const answer = await callAI(question, imageToSend);
    const id = createAIBubble('Free AI ✦');
    finalizeAI(id, answer);
    chatHistory.push({ role: 'user', text: label });
    chatHistory.push({ role: 'assistant', text: answer });
    setStatus('ready');
  } catch (err) {
    const id = createAIBubble('Error', true);
    finalizeAI(id, `**Connection error:** ${err.message}\n\nThe free AI service may be temporarily unavailable. Please try again in a moment.`);
    setStatus('error');
    setTimeout(() => setStatus('ready'), 3000);
  }

  isTyping = false;
  updateSendBtn();
}

// ════════════════════════════════════════
// RECENT HISTORY
// ════════════════════════════════════════

function renderRecentHistory() {
  if (!historyList) return;
  historyList.innerHTML = '';
  if (!recentHistory.length) {
    historyList.innerHTML = '<li class="history-empty"><i class="fa-regular fa-comment-dots"></i><span>No conversations yet</span></li>';
    return;
  }
  recentHistory.slice(0, 20).forEach(q => {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.innerHTML = `<i class="fa-regular fa-message"></i><span>${escapeHtml(q.length > 38 ? q.slice(0,38)+'…' : q)}</span>`;
    li.addEventListener('click', () => fireQuestion(q));
    historyList.appendChild(li);
  });
}

function addToRecent(q) {
  recentHistory = [q, ...recentHistory.filter(x => x !== q)].slice(0, 20);
  save('recent', recentHistory);
  renderRecentHistory();
  updateStats();
}

// ════════════════════════════════════════
// LIBRARY
// ════════════════════════════════════════

function renderLibrary() {
  const empty = document.getElementById('libraryEmpty');
  const list  = document.getElementById('libraryList');
  if (!list) return;
  list.innerHTML = '';
  if (!savedItems.length) { empty.style.display = 'flex'; return; }
  empty.style.display = 'none';
  savedItems.forEach(item => {
    const li = document.createElement('li');
    li.className = 'library-item';
    li.innerHTML = `
      <div class="library-item-q"><i class="fa-regular fa-message"></i> ${escapeHtml(item.question)}</div>
      <div class="library-item-a">${escapeHtml(item.answer)}</div>
      <div class="library-item-footer">
        <span class="library-item-time">${item.time}</span>
        <button class="library-delete-btn" onclick="deleteLib(${item.id})"><i class="fa-solid fa-trash-can"></i> Remove</button>
      </div>`;
    list.appendChild(li);
  });
}

window.deleteLib = id => {
  savedItems = savedItems.filter(i => i.id !== id);
  save('library', savedItems);
  renderLibrary(); updateStats(); showToast('Removed from Library');
};

// ════════════════════════════════════════
// TASKS
// ════════════════════════════════════════

function renderTasks() {
  const list  = document.getElementById('taskList');
  const empty = document.getElementById('taskEmpty');
  if (!list) return;
  list.innerHTML = '';
  empty.style.display = tasks.length ? 'none' : 'flex';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.done ? ' done' : '');
    li.innerHTML = `
      <div class="task-check" onclick="toggleTask(${task.id})">${task.done ? '<i class="fa-solid fa-check"></i>' : ''}</div>
      <span class="task-text">${escapeHtml(task.text)}</span>
      <button class="task-delete" onclick="deleteTask(${task.id})"><i class="fa-solid fa-xmark"></i></button>`;
    list.appendChild(li);
  });
}

const saveTasks = () => save('tasks', tasks);

window.toggleTask = id => {
  const t = tasks.find(t => t.id === id);
  if (t) { t.done = !t.done; saveTasks(); renderTasks(); updateStats(); }
};
window.deleteTask = id => {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks(); renderTasks(); updateStats();
};

const taskInput  = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');

function addTask() {
  const text = taskInput?.value.trim();
  if (!text) return;
  tasks.unshift({ id: Date.now(), text, done: false });
  saveTasks(); renderTasks(); updateStats();
  taskInput.value = '';
  showToast('✓ Task added');
}
addTaskBtn?.addEventListener('click', addTask);
taskInput?.addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });

// ════════════════════════════════════════
// VOICE AI ASSISTANT
// ════════════════════════════════════════

let isSpeaking = false;

// Wait for voices to be available (async on mobile)
function getVoices() {
  return new Promise(resolve => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) { resolve(voices); return; }
    window.speechSynthesis.onvoiceschanged = () => resolve(window.speechSynthesis.getVoices());
    // Timeout fallback
    setTimeout(() => resolve(window.speechSynthesis.getVoices()), 2000);
  });
}

function pickMaleVoice(voices) {
  // Try named male voices first
  return voices.find(v => /en/i.test(v.lang) && /david|mark|daniel|alex|fred|james|ryan|guy|tom|bruce|ralph/i.test(v.name))
    // Any English voice that doesn't sound female
    || voices.find(v => /en/i.test(v.lang) && !/samantha|karen|moira|victoria|fiona|zira|susan|lisa|kate|emily|siri/i.test(v.name))
    // Any English voice
    || voices.find(v => /en/i.test(v.lang))
    || voices[0];
}

async function speakGreeting(text) {
  if (!window.speechSynthesis) return;
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.95;
  utt.pitch = 0.85;  // Lower pitch = more masculine
  utt.volume = 1;

  const voices = await getVoices();
  const voice = pickMaleVoice(voices);
  if (voice) utt.voice = voice;

  utt.onstart = () => { isSpeaking = true; updateVoiceBtnState(true); };
  utt.onend = () => { isSpeaking = false; updateVoiceBtnState(false); };
  utt.onerror = () => { isSpeaking = false; updateVoiceBtnState(false); };

  // Mobile Chrome fix: resume if suspended
  if (window.speechSynthesis.paused) window.speechSynthesis.resume();
  window.speechSynthesis.speak(utt);

  // Mobile Safari/Chrome workaround: sometimes needs a nudge
  setTimeout(() => {
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
  }, 100);
}

function speakText(text) {
  if (!window.speechSynthesis) return;
  const clean = text
    .replace(/```[\s\S]*?```/g, 'code block')
    .replace(/`[^`]+`/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/#{1,3}\s/g, '')
    .replace(/[-•]\s/g, '')
    .replace(/\n+/g, '. ')
    .trim();
  speakGreeting(clean);
}

function updateVoiceBtnState(speaking) {
  const btn = document.getElementById('voiceReadBtn');
  if (!btn) return;
  btn.classList.toggle('speaking', speaking);
  btn.title = speaking ? 'Stop speaking' : 'Read aloud';
  btn.querySelector('i').className = speaking ? 'fa-solid fa-stop' : 'fa-solid fa-volume-high';
}

// Stop speech
window.stopSpeech = () => {
  window.speechSynthesis?.cancel();
  isSpeaking = false;
  updateVoiceBtnState(false);
};

// Read AI response aloud
window.readAloud = (btn, id) => {
  if (isSpeaking) { window.stopSpeech(); return; }
  const el = document.querySelector(`[data-id="${id}"]`);
  if (!el) return;
  speakText(el.dataset.text || '');
};

// Pre-load voices on page load
if (window.speechSynthesis) window.speechSynthesis.getVoices();

// ════════════════════════════════════════
// TOAST
// ════════════════════════════════════════

function showToast(msg) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}
