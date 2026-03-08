// PDFSnip.com - Main JS

// FAQ accordion
document.addEventListener('DOMContentLoaded', () => {
  initFAQ();
  initDropZone();
  initNavScroll();
  initAnimations();
});

function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 50
      ? 'rgba(10,10,15,0.98)'
      : 'rgba(10,10,15,0.85)';
  });
}

function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// DROP ZONE
let selectedFiles = [];

function initDropZone() {
  const dz = document.querySelector('.drop-zone');
  const input = document.querySelector('.drop-input');
  if (!dz) return;

  dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('drag-over'); });
  dz.addEventListener('dragleave', () => dz.classList.remove('drag-over'));
  dz.addEventListener('drop', e => {
    e.preventDefault(); dz.classList.remove('drag-over');
    handleFiles([...e.dataTransfer.files]);
  });

  dz.addEventListener('click', e => {
    if (!e.target.closest('.file-list')) input.click();
  });

  if (input) {
    input.addEventListener('change', () => handleFiles([...input.files]));
  }
}

function handleFiles(files) {
  const accepted = files.filter(f => f.type === 'application/pdf' || f.name.endsWith('.pdf'));
  if (!accepted.length) { showToast('⚠️', 'Please upload PDF files only'); return; }
  selectedFiles = [...selectedFiles, ...accepted];
  renderFileList();
}

function renderFileList() {
  const list = document.querySelector('.file-list');
  if (!list) return;
  list.innerHTML = '';
  selectedFiles.forEach((file, i) => {
    const item = document.createElement('div');
    item.className = 'file-item';
    item.innerHTML = `
      <span class="file-item-icon">📄</span>
      <span class="file-item-name">${file.name}</span>
      <span class="file-item-size">${formatBytes(file.size)}</span>
      <button class="file-item-remove" onclick="removeFile(${i})">✕</button>
    `;
    list.appendChild(item);
  });

  const btn = document.querySelector('.btn-convert');
  if (btn) btn.disabled = selectedFiles.length === 0;
}

function removeFile(idx) {
  selectedFiles.splice(idx, 1);
  renderFileList();
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

// CONVERT SIMULATION
function startConvert() {
  if (!selectedFiles.length) return;
  const btn = document.querySelector('.btn-convert');
  const progress = document.querySelector('.progress-bar-wrap');
  const fill = document.querySelector('.progress-fill');
  const results = document.querySelector('.results-section');

  btn.disabled = true;
  btn.innerHTML = '⚙️ Converting...';
  progress.classList.add('show');

  let pct = 0;
  const interval = setInterval(() => {
    pct += Math.random() * 15;
    if (pct >= 100) {
      pct = 100;
      clearInterval(interval);
      fill.style.width = '100%';
      setTimeout(() => {
        btn.innerHTML = '🎉 Convert More';
        btn.disabled = false;
        results.classList.add('show');
        renderResults();
        showToast('✅', 'Conversion complete! Download your images below.');
      }, 400);
    }
    fill.style.width = pct + '%';
  }, 180);
}

function renderResults() {
  const grid = document.querySelector('.results-grid');
  if (!grid) return;
  grid.innerHTML = '';

  selectedFiles.forEach((file, fi) => {
    const pages = Math.floor(Math.random() * 4) + 1;
    for (let p = 1; p <= pages; p++) {
      const card = document.createElement('div');
      card.className = 'result-card';
      // Generate a placeholder canvas image
      const colors = ['#ff5533','#ffcc44','#44dd88','#4488ff','#cc44ff'];
      const col = colors[fi % colors.length];
      card.innerHTML = `
        <div class="result-img" style="background: linear-gradient(135deg, #1c1c28 0%, #2a2a3d 100%); display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;min-height:180px;">
          <span style="font-size:2rem;">🖼️</span>
          <span style="font-size:0.7rem;color:#9999bb;">Page ${p}</span>
        </div>
        <div class="result-card-bottom">
          <span class="result-name">${file.name.replace('.pdf','')}_p${p}.jpg</span>
          <button class="btn-dl" onclick="downloadSimulate(this)">↓</button>
        </div>
      `;
      grid.appendChild(card);
    }
  });
}

function downloadSimulate(btn) {
  const orig = btn.textContent;
  btn.textContent = '✓';
  btn.style.background = '#44dd88';
  setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 2000);
  showToast('✅', 'Download started!');
}

function downloadAll() {
  showToast('📦', 'Preparing ZIP archive...');
}

// TOAST
function showToast(icon, msg) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.innerHTML = `<span class="toast-icon">${icon}</span><span>${msg}</span>`;
  t.classList.add('show');
  clearTimeout(t._timeout);
  t._timeout = setTimeout(() => t.classList.remove('show'), 3200);
}

// SCROLL ANIMATIONS
function initAnimations() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.tool-card, .benefit-card, .step, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    obs.observe(el);
  });
}
