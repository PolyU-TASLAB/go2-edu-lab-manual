const toast = document.querySelector('.toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      showToast(button.dataset.copyLabel ? `已复制${button.dataset.copyLabel}` : `已复制：${button.dataset.copy}`);
    } catch {
      showToast('复制失败，请手动选择内容');
    }
  });
});

const chapterLinks = [...document.querySelectorAll('.operation-nav a')];
const chapters = [...document.querySelectorAll('.chapter-card')];

function markChapter(chapter) {
  chapterLinks.forEach((link) => {
    if (chapter && link.hash === `#${chapter.id}`) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function targetFromHash(hash) {
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

function revealTarget(target) {
  if (!target) return;
  let ancestor = target;
  while (ancestor) {
    if (ancestor.matches('details')) ancestor.open = true;
    ancestor = ancestor.parentElement;
  }
  markChapter(target.closest('.chapter-card'));
  requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
}

// Reopening also works when the current URL already points to this card.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = targetFromHash(link.hash);
    if (!target) return;
    event.preventDefault();
    if (window.location.hash !== link.hash) {
      try {
        history.pushState(null, '', link.hash);
      } catch {
        window.location.hash = link.hash;
      }
    }
    revealTarget(target);
  });
});

window.addEventListener('hashchange', () => revealTarget(targetFromHash(window.location.hash)));

chapters.forEach((chapter) => {
  chapter.addEventListener('toggle', () => {
    if (chapter.open) markChapter(chapter);
    else if (!chapters.some((item) => item.open)) markChapter(null);
  });
});

document.querySelectorAll('[data-fold-action]').forEach((button) => {
  button.addEventListener('click', () => {
    const expand = button.dataset.foldAction === 'expand';
    document.querySelectorAll('.chapter-card, .device-card').forEach((card) => {
      card.open = expand;
    });
    if (!expand) markChapter(null);
  });
});

if (window.location.hash) revealTarget(targetFromHash(window.location.hash));
