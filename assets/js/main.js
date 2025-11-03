/* Main interactions for the Liquid Glass personal site */

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  body.classList.add('is-loaded');

  initHeaderMenu();
  initSectionObserver();
  initCopyToClipboard();
  initFloatingBackground();
  updateCurrentYear();
  initModeToggle();
  initMediumZoom();
});

function initHeaderMenu(){
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const navLinks = nav ? Array.from(nav.querySelectorAll('a[data-section]')) : [];

  if(!menuToggle || !nav){
    return;
  }

  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open', !expanded);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    });
  });

  document.addEventListener('click', (event) => {
    if(!nav.classList.contains('is-open')){
      return;
    }
    if(event.target instanceof Element && (event.target.closest('.site-nav') || event.target.closest('.menu-toggle'))){
      return;
    }
    menuToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  });
}

function initSectionObserver(){
  const navLinks = Array.from(document.querySelectorAll('.site-nav a[data-section]'));
  if(!navLinks.length || typeof IntersectionObserver === 'undefined'){
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = navLinks.find(item => item.dataset.section === id);
      if(!link){
        return;
      }
      if(entry.isIntersecting){
        navLinks.forEach(item => item.classList.remove('is-active'));
        link.classList.add('is-active');
      }
    });
  }, {
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0.5
  });

  navLinks.forEach(link => {
    const sectionId = link.dataset.section;
    const section = sectionId ? document.getElementById(sectionId) : null;
    if(section){
      observer.observe(section);
    }
  });
}

function initCopyToClipboard(){
  const buttons = Array.from(document.querySelectorAll('[data-copy]'));
  if(!buttons.length){
    return;
  }

  buttons.forEach(button => {
    const targetId = button.getAttribute('data-copy');
    const target = targetId ? document.getElementById(targetId) : null;
    const state = button.parentElement?.querySelector('.copy-state');

    if(!target){
      return;
    }

    button.addEventListener('click', async () => {
      const value = extractCopyValue(target);
      if(!value){
        return;
      }

      try{
        if(navigator.clipboard){
          await navigator.clipboard.writeText(value);
        }else{
          legacyCopy(value);
        }
        if(state){
          state.textContent = 'Copied';
          setTimeout(() => state.textContent = '', 2200);
        }
      }catch(error){
        console.error('Copy failed', error);
        if(state){
          state.textContent = 'Copy failed';
          setTimeout(() => state.textContent = '', 2200);
        }
      }
    });
  });
}

function extractCopyValue(target){
  if(target instanceof HTMLAnchorElement){
    if(target.href && target.href.startsWith('mailto:')){
      return target.href.replace('mailto:', '');
    }
    return target.textContent?.trim() ?? '';
  }
  return target.textContent?.trim() ?? '';
}

function legacyCopy(value){
  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function initFloatingBackground(){
  const shapes = Array.from(document.querySelectorAll('.bg-shapes [data-float]'));
  if(!shapes.length){
    return;
  }

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(motionQuery.matches){
    shapes.forEach(shape => {
      shape.style.setProperty('--tx', '0px');
      shape.style.setProperty('--ty', '0px');
    });
    return;
  }

  const handlePointerMove = (event) => {
    const { innerWidth, innerHeight } = window;
    const xRatio = (event.clientX / innerWidth) - 0.5;
    const yRatio = (event.clientY / innerHeight) - 0.5;

    shapes.forEach((shape, index) => {
      const depth = (index + 1) / shapes.length;
      const tx = xRatio * 40 * depth;
      const ty = yRatio * 40 * depth;
      shape.style.setProperty('--tx', `${tx}px`);
      shape.style.setProperty('--ty', `${ty}px`);
    });
  };

  const resetTransforms = () => {
    shapes.forEach(shape => {
      shape.style.setProperty('--tx', '0px');
      shape.style.setProperty('--ty', '0px');
    });
  };

  window.addEventListener('pointermove', handlePointerMove);
  window.addEventListener('mouseleave', resetTransforms);

  const handleMotionChange = (event) => {
    if(event.matches){
      resetTransforms();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mouseleave', resetTransforms);
    }
  };

  if(typeof motionQuery.addEventListener === 'function'){
    motionQuery.addEventListener('change', handleMotionChange);
  }else if(typeof motionQuery.addListener === 'function'){
    motionQuery.addListener(handleMotionChange);
  }
}

function updateCurrentYear(){
  const yearTarget = document.getElementById('current-year');
  if(yearTarget){
    yearTarget.textContent = String(new Date().getFullYear());
  }
}

function initModeToggle(){
  const toggle = document.querySelector('.mode-toggle');
  if(!toggle){
    return;
  }

  const body = document.body;
  const layoutLiquid = document.querySelector('.layout-liquid');
  const layoutTech = document.querySelector('.layout-tech');

  const labels = {
    liquid: 'Switch to Technical Mode',
    tech: 'Switch to iOS26 Mode'
  };

  const applyState = (isTechMode) => {
    body.classList.toggle('mode-tech', isTechMode);
    body.classList.toggle('mode-liquid', !isTechMode);
    toggle.setAttribute('aria-pressed', String(isTechMode));
    toggle.textContent = isTechMode ? labels.tech : labels.liquid;
    if(layoutLiquid){
      layoutLiquid.setAttribute('aria-hidden', String(isTechMode));
    }
    if(layoutTech){
      layoutTech.setAttribute('aria-hidden', String(!isTechMode));
    }
  };

  toggle.addEventListener('click', () => {
    const nextState = !body.classList.contains('mode-tech');
    applyState(nextState);
  });

  applyState(body.classList.contains('mode-tech'));
}

function initVideoModal(){
  const thumbnails = document.querySelectorAll('.tech-demo-thumbnail');
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const closeBtn = modal?.querySelector('.video-modal-close');
  const backdrop = modal?.querySelector('.video-modal-backdrop');

  if(!modal || !modalVideo){
    return;
  }

  // Play preview on hover
  thumbnails.forEach(thumb => {
    const video = thumb.querySelector('video');
    if(video){
      thumb.addEventListener('mouseenter', () => {
        video.play().catch(() => {});
      });
      thumb.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    }

    // Open modal on click
    thumb.addEventListener('click', () => {
      const videoSrc = thumb.getAttribute('data-video');
      if(videoSrc){
        modalVideo.querySelector('source').src = videoSrc;
        modalVideo.load();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        modalVideo.play();
      }
    });
  });

  // Close modal
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    modalVideo.pause();
    modalVideo.currentTime = 0;
  };

  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modal.classList.contains('active')){
      closeModal();
    }
  });
}
