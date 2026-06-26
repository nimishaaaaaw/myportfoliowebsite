// ============================================================
// NIMISHA MAJGAWALI — PORTFOLIO SCRIPT
// ============================================================

document.getElementById('footerYear').textContent = new Date().getFullYear();

/* ---------------- Real profile links ---------------- */
const LINKS = {
  linkedin: 'https://www.linkedin.com/in/nimisha-majgawali/',
  leetcode: 'https://leetcode.com/u/nimishaaaaaw/',
};
['linkedinLink','contactLinkedin'].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.href = LINKS.linkedin;
});
['leetcodeLink','contactLeetcode'].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.href = LINKS.leetcode;
});

/* ---------------- Custom cursor (desktop only) ---------------- */
(function initCursor(){
  if(!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const cursor = document.getElementById('petalCursor');
  let raf = null, mx = 0, my = 0, hovering = false;
  window.addEventListener('mousemove', (e)=>{
    mx = e.clientX; my = e.clientY;
    cursor.style.opacity = '1';
    if(!raf){
      raf = requestAnimationFrame(()=>{
        const scale = hovering ? 1.25 : 1;
        cursor.style.transform = `translate(${mx - 2}px, ${my - 2}px) scale(${scale})`;
        raf = null;
      });
    }
  });
  document.addEventListener('mouseleave', ()=> cursor.style.opacity = '0');

  document.querySelectorAll('a, button').forEach(el=>{
    el.addEventListener('mouseenter', ()=> hovering = true);
    el.addEventListener('mouseleave', ()=> hovering = false);
  });
})();

/* ---------------- Sticky nav shadow + active link + mobile toggle ---------------- */
const nav = document.getElementById('siteNav');
window.addEventListener('scroll', ()=>{
  nav.classList.toggle('scrolled', window.scrollY > 12);
}, { passive:true });

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', ()=>{
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
navLinks.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click', ()=>{
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded','false');
  });
});

const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[data-nav]');
const sectionObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id = entry.target.id;
      navAnchors.forEach(a=>{
        a.classList.toggle('active', a.getAttribute('href') === '#'+id);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach(s=> sectionObserver.observe(s));

/* ---------------- Scroll reveal ---------------- */
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function observeReveals(root=document){
  root.querySelectorAll('.reveal, .reveal-stagger').forEach(el=> revealObserver.observe(el));
}

/* ---------------- Hero typed animation ---------------- */
(function typeLoop(){
  const el = document.getElementById('typedText');
  const words = ['delightful interfaces.', 'fast, clean frontends.', 'fun little details.', 'things people enjoy.'];
  let wi = 0, ci = 0, deleting = false;

  function tick(){
    const word = words[wi];
    if(!deleting){
      ci++;
      el.textContent = word.slice(0, ci);
      if(ci === word.length){
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
      setTimeout(tick, 58);
    } else {
      ci--;
      el.textContent = word.slice(0, ci);
      if(ci === 0){
        deleting = false;
        wi = (wi+1) % words.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, 32);
    }
  }
  tick();
})();

/* ---------------- Hero stitched-thread background (drawn once, decorative) ---------------- */
(function drawStitches(){
  const svg = document.querySelector('.hero-stitch-bg');
  if(!svg) return;
  const path = `M -20 740 C 140 700, 180 600, 130 520 C 90 450, 240 430, 300 350
                C 360 270, 280 210, 350 130 C 410 60, 540 50, 620 -20`;
  svg.innerHTML = `
    <path d="${path}" fill="none" stroke="#C9D2C4" stroke-width="2" stroke-linecap="round"
      stroke-dasharray="10 9" opacity="0.7"/>
    <g stroke="#3E6259" stroke-width="1.6" stroke-linecap="round" opacity="0.4">
      <path d="M50 700 L62 712 M62 700 L50 712"/>
      <path d="M210 580 L222 592 M222 580 L210 592"/>
      <path d="M290 400 L302 412 M302 400 L290 412"/>
      <path d="M390 180 L402 192 M402 180 L390 192"/>
    </g>`;
})();

/* ---------------- Section divider stitches (lightweight, repeated) ---------------- */
document.querySelectorAll('.section-divider').forEach((div, i)=>{
  div.innerHTML = `
  <svg viewBox="0 0 1180 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="28" x2="1180" y2="28"
      stroke="#C9D2C4" stroke-width="2" stroke-linecap="round" stroke-dasharray="9 10" opacity="0.85"/>
    <g stroke="#C97B5A" stroke-width="1.8" stroke-linecap="round" opacity="0.55">
      <path d="M175 21 L187 33 M187 21 L175 33"/>
      <path d="M495 21 L507 33 M507 21 L495 33"/>
      <path d="M815 21 L827 33 M827 21 L815 33"/>
      <path d="M1075 21 L1087 33 M1087 21 L1075 33"/>
    </g>
  </svg>`;
});

/* ============================================================
   DATA: SKILLS
============================================================ */
const DEVICON = (slug, variant='plain') => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-${variant}.svg`;

const skillGroups = [
  {
    title: '🧩 Languages',
    chips: [
      ['Python', DEVICON('python')], ['JavaScript', DEVICON('javascript')],
      ['TypeScript', DEVICON('typescript')], ['Java', DEVICON('java')],
      ['SQL', DEVICON('mysql')], ['Bash', DEVICON('bash')],
    ]
  },
  {
    title: '🎨 Frontend',
    chips: [
      ['React', DEVICON('react')], ['Next.js', DEVICON('nextjs')],
      ['Tailwind CSS', DEVICON('tailwindcss')], ['HTML5', DEVICON('html5')],
      ['CSS3', DEVICON('css3')], ['Figma', DEVICON('figma')], ['Storybook', DEVICON('storybook')],
    ]
  },
  {
    title: '⚙️ Backend & APIs',
    chips: [
      ['Node.js', DEVICON('nodejs')], ['Express.js', DEVICON('express')],
      ['Flask', DEVICON('flask')], ['FastAPI', DEVICON('fastapi')],
      ['REST APIs', null], ['WebSockets', null],
    ]
  },
  {
    title: '🗄️ Databases',
    chips: [
      ['MySQL', DEVICON('mysql')], ['MongoDB', DEVICON('mongodb')],
      ['PostgreSQL', DEVICON('postgresql')], ['Neo4j', DEVICON('neo4j')],
    ]
  },
  {
    title: '☁️ Cloud & DevOps',
    chips: [
      ['AWS', DEVICON('amazonwebservices', 'plain-wordmark')], ['Docker', DEVICON('docker')],
      ['GitHub Actions', DEVICON('githubactions')], ['Vercel', DEVICON('vercel', 'original')], ['Render', null],
    ]
  },
  {
    title: '🤖 AI & GenAI',
    chips: [
      ['LangGraph', null], ['RAG', null], ['Groq LLaMA', null],
      ['Gemini', null], ['Scikit-learn', DEVICON('scikitlearn', 'original')], ['NLP', null],
    ]
  },
];

const skillsGrid = document.getElementById('skillsGrid');
skillGroups.forEach(group=>{
  const card = document.createElement('div');
  card.className = 'skill-group reveal';
  card.innerHTML = `
    <h3 class="skill-group-title">${group.title}</h3>
    <div class="skill-chips">
      ${group.chips.map(([name, icon])=>`
        <span class="skill-chip">${icon ? `<img src="${icon}" alt="" loading="lazy" onerror="this.remove()">` : ''}${name}</span>
      `).join('')}
    </div>`;
  skillsGrid.appendChild(card);
});

/* ============================================================
   DATA: PROJECTS
============================================================ */
const featuredProjects = [
  {
    name: 'CareCrypt',
    tag: 'pinned',
    img: 'img/carecrypt.webp',
    fallback: 'img/carecrypt.jpg',
    desc: "An encrypted patient-records system — AES-128 field-level encryption, a 5-table normalised MySQL schema, and a full audit trail logging every action by user, IP, and timestamp. Five layered security controls, sub-200ms response times across beta users, and Groq LLaMA 3.1 turning structured records into plain-English summaries.",
    stack: ['Python', 'Flask', 'MySQL', 'Docker', 'Fernet AES-128', 'Groq LLaMA 3.1'],
    github: 'https://github.com/nimishaaaaaw/CareCrypt',
    live: 'https://carecrypt.onrender.com',
  },
  {
    name: 'SkillRadar',
    tag: 'pinned',
    img: 'img/skillradar.webp',
    fallback: 'img/skillradar.jpg',
    desc: "Paste a resume and a job description — SkillRadar scores the match with a TF-IDF + cosine-similarity pipeline, surfaces matched vs. missing skills against a 200+ term skills dictionary, and calls Groq LLaMA 3.1 for 3–5 targeted improvement suggestions. A rule-based strength scorer adds a second, independent quality signal.",
    stack: ['Python', 'Flask', 'Scikit-learn', 'TF-IDF', 'Groq LLaMA 3.1', 'Docker'],
    github: 'https://github.com/nimishaaaaaw/SkillRadar',
    live: 'https://skillradar-591t.onrender.com',
  },
  {
    name: 'Tourvisto',
    tag: 'pinned',
    img: 'img/tourvisto.webp',
    fallback: 'img/tourvisto.jpg',
    desc: "A full-stack AI travel SaaS — Google Gemini 1.5 Flash generates structured day-by-day itineraries with budgets and auto-sourced imagery, behind Google OAuth and tiered admin/user roles. The admin dashboard tracks users, trips, and KPIs through live Syncfusion data visualisations, including an interactive world map of trip activity.",
    stack: ['React 19', 'Appwrite', 'Gemini 1.5 Flash', 'Vercel'],
    github: 'https://github.com/nimishaaaaaw/tourvisto',
    live: 'https://tourvisto-nine.vercel.app',
  },
];

const moreProjects = [
  {
    name: 'DocuMind AI',
    img: 'img/documind.webp', fallback: 'img/documind.jpg',
    desc: "Upload a PDF, DOCX, or TXT — get source-cited, confidence-scored answers via a 4-stage RAG pipeline (semantic chunking, hybrid FAISS + BM25 retrieval, cross-encoder re-ranking, query decomposition).",
    stack: ['FastAPI', 'FAISS', 'Sentence Transformers', 'Groq LLaMA 3.1'],
    github: 'https://github.com/nimishaaaaaw/documind-ai',
    live: 'https://documind-ai-vozp.onrender.com/',
  },
  {
    name: 'MailMorph',
    img: 'img/mailmorph.webp', fallback: 'img/mailmorph.jpg',
    desc: 'A tiny, focused tool that rewrites pasted emails into a more formal tone in one click — paste, rewrite, copy.',
    stack: ['JavaScript', 'LLM API'],
    github: 'https://github.com/nimishaaaaaw/MailMorph',
    live: 'https://mailmorph-1.onrender.com/',
  },
  {
    name: 'AgentGraph-Intel',
    img: null,
    desc: "A multi-agent AI research system built in LangGraph — three specialised agents (Researcher, Knowledge Graph Builder, Analyst) coordinating through stateful, conditional routing. The Knowledge Graph Builder extracts entities and relationships via LLM-powered NLP into Neo4j, enabling multi-hop reasoning that flat vector search can't reach.",
    stack: ['Python', 'LangGraph', 'Neo4j', 'FastAPI', 'AWS ECS'],
    github: 'https://github.com/nimishaaaaaw/AgentGraph-Intel',
    live: null,
  },
  {
    name: 'Streakify',
    img: 'img/streakify.webp', fallback: 'img/streakify.jpg',
    desc: 'A mobile-first habit tracker with a custom date-driven streak algorithm handling continuity tracking and missed-day resets across daily, weekly, and monthly recurrence.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    github: 'https://github.com/nimishaaaaaw/streakify',
    live: 'https://streakify-kappa.vercel.app',
  },
  {
    name: 'NutriGenie',
    img: 'img/nutrigenie.webp', fallback: 'img/nutrigenie.jpg',
    desc: 'A KNN + cosine-similarity recommender over 500K+ recipes, returning personalised meal plans from a 6-parameter health profile — BMI, BMR, and caloric targets included.',
    stack: ['Python', 'FastAPI', 'Scikit-learn', 'MongoDB', 'Streamlit'],
    github: 'https://github.com/nimishaaaaaw/nutrigenie',
    live: 'https://nutrigenie-food.streamlit.app',
  },
  {
    name: 'Biblio',
    img: 'img/biblio.webp', fallback: 'img/biblio.jpg',
    desc: 'A clean, calm book-discovery app — "your book, found." Built to make searching for a next read feel as soothing as reading one.',
    stack: ['React', 'Vite'],
    github: 'https://github.com/nimishaaaaaw/biblio',
    live: 'https://biblio-silk.vercel.app',
  },
];

const githubIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.7 1.1.7 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z"/></svg>`;
const liveIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 5h5v5M19 5 10 14M7 5H5v14h14v-2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function projectShot(p, css){
  if(!p.img){
    return `<div class="${css}" style="display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#3E6259,#26352E);min-height:220px;height:100%;">
      <span style="font-family:'Alata',sans-serif;color:#EFF1ED;font-size:1.25rem;letter-spacing:0.03em;text-align:center;padding:20px;">${p.name}<br><span style="font-family:'Manrope',sans-serif;font-size:0.76rem;font-weight:600;opacity:0.85;">multi-agent system · diagram coming soon</span></span>
    </div>`;
  }
  return `<img src="${p.img}" onerror="this.onerror=null;this.src='${p.fallback}'" alt="${p.name} screenshot" loading="lazy" width="1100" height="600">`;
}

const featuredWrap = document.getElementById('projectsFeatured');
featuredProjects.forEach(p=>{
  const el = document.createElement('article');
  el.className = 'proj-feature reveal';
  el.innerHTML = `
    <div class="proj-shot-wrap">
      <div class="proj-shot-tape"></div>
      ${projectShot(p, '')}
    </div>
    <div class="proj-feature-text">
      <span class="proj-pin">📌 ${p.tag}</span>
      <h3 class="proj-title">${p.name}</h3>
      <p class="proj-desc">${p.desc}</p>
      <div class="proj-stack">${p.stack.map(s=>`<span>${s}</span>`).join('')}</div>
      <div class="proj-links">
        <a class="proj-link" href="${p.github}" target="_blank" rel="noopener">${githubIcon} code</a>
        ${p.live ? `<a class="proj-link" href="${p.live}" target="_blank" rel="noopener">${liveIcon} live app</a>` : ''}
      </div>
    </div>`;
  featuredWrap.appendChild(el);
});

const moreGrid = document.getElementById('projectsGrid');
moreProjects.forEach(p=>{
  const el = document.createElement('article');
  el.className = 'proj-card reveal';
  el.innerHTML = `
    <div class="proj-card-shot">${projectShot(p,'')}</div>
    <div class="proj-card-body">
      <h4 class="proj-card-title">${p.name}</h4>
      <p class="proj-card-desc">${p.desc}</p>
      <div class="proj-card-stack">${p.stack.map(s=>`<span>${s}</span>`).join('')}</div>
      <div class="proj-card-links">
        <a href="${p.github}" target="_blank" rel="noopener">${githubIcon} code</a>
        ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener">${liveIcon} live</a>` : ''}
      </div>
    </div>`;
  moreGrid.appendChild(el);
});

/* ============================================================
   DATA: EXPERIENCE TIMELINE
============================================================ */
const experience = [
  {
    role: 'Front-End Developer Intern',
    org: 'MediKloud (Healthcare SaaS)',
    date: 'Apr 2026 – Present',
    points: [
      'Refactored a fragmented production React/TypeScript codebase into a component-driven design system, eliminating hardcoded styling via a centralised Tailwind CSS token architecture.',
      'Documented component props and usage patterns in Storybook, improving isolation, testability, and onboarding for future contributors.',
      'Collaborated with designers and engineers to validate component behaviour against acceptance criteria before each release on a regulated healthcare platform.',
    ]
  },
  {
    role: 'Software Engineering Intern',
    org: 'Ethnus',
    date: 'Jan 2025 – May 2025',
    points: [
      'Delivered 4 production modules — authentication, real-time messaging, document sharing, and role-based access control — across 3 agile sprints on a live platform serving 15+ users.',
      'Built RBAC conditional logic into backend middleware across 8 API endpoints, closing unauthorized access paths at the route layer.',
      'Integrated WebSocket-based real-time messaging and whiteboard features, enabling synchronous collaborative editing for 6 concurrent users.',
      'Reviewed ~4 pull requests per sprint against defined acceptance criteria, maintaining zero regressions across every release.',
    ]
  },
];

const timelineWrap = document.getElementById('timeline');
experience.forEach(e=>{
  const item = document.createElement('div');
  item.className = 'tl-item reveal';
  item.innerHTML = `
    <span class="tl-dot"></span>
    <div class="tl-card">
      <h3 class="tl-role">${e.role}</h3>
      <div class="tl-meta">${e.org} <span class="tl-date">· ${e.date}</span></div>
      <ul class="tl-points">${e.points.map(pt=>`<li>${pt}</li>`).join('')}</ul>
    </div>`;
  timelineWrap.appendChild(item);
});

/* ============================================================
   DATA: HOBBIES
============================================================ */
const hobbies = [
  ['🛠️', 'building fun side projects'],
  ['📌', 'curating aesthetic Pinterest boards'],
  ['🎧', 'listening to music on loop'],
  ['💪', 'working out'],
  ['💄', 'doing makeup'],
  ['💬', 'talking to anyone about anything'],
  ['📚', 'reading books'],
  ['🧶', 'crocheting'],
  ['🎨', 'sketching & painting'],
  ['✈️', 'planning the next trip'],
];

const hobbyCloud = document.getElementById('hobbyCloud');
hobbies.forEach(([emoji, label])=>{
  const el = document.createElement('div');
  el.className = 'hobby-pill reveal';
  el.innerHTML = `<span class="emoji">${emoji}</span> ${label}`;
  hobbyCloud.appendChild(el);
});

/* ---------------- Apply stagger delays + observe everything ---------------- */
document.querySelectorAll('.reveal').forEach((el, i)=>{
  el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`;
});
observeReveals();
