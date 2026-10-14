const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
const navLinks = [...document.querySelectorAll('.nav-link')];
const toTop = document.getElementById('to-top');
const sections = [...document.querySelectorAll('main section[id]')];

function onScroll(){
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 20);
  toTop.classList.toggle('visible', y > 600);
  let current = 'home';
  sections.forEach(section => {
    if (y >= section.offsetTop - 180) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', onScroll, {passive:true});
onScroll();

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});
navLinks.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded','false');
}));

toTop.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
document.getElementById('year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

let counted = false;
const statsBand = document.querySelector('.stats-band');
const statsObserver = new IntersectionObserver(entries => {
  if(!entries[0].isIntersecting || counted) return;
  counted = true;
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = Number(el.dataset.count);
    const duration = 1050;
    const start = performance.now();
    const tick = now => {
      const p = Math.min((now-start)/duration,1);
      const eased = 1 - Math.pow(1-p,3);
      el.textContent = Math.floor(target*eased).toLocaleString();
      if(p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  statsObserver.disconnect();
},{threshold:.4});
statsObserver.observe(statsBand);


// ---------------------------------------------------------
// PROJECT THUMBNAILS & LIVE LINKS
// Edit project-settings.js to change images or project URLs.
// ---------------------------------------------------------
const projectSettings = window.PROJECT_SETTINGS || {};

document.querySelectorAll('.project-card').forEach(card => {
  const key = card.dataset.project;
  const settings = projectSettings[key] || {};
  const image = card.querySelector('[data-project-image]');
  const links = card.querySelectorAll('[data-project-url]');

  if (image && settings.thumbnail) image.src = settings.thumbnail;

  links.forEach(link => {
    if (settings.url) {
      link.href = settings.url;
      link.hidden = false;
    } else {
      link.removeAttribute('href');
      link.hidden = true;
    }
  });
});

const projects = {
  learnhub:{kicker:'Digital Learning Platform',title:'LearnHUB',summary:'A digital learning and e-commerce ecosystem supporting short courses, learner access, online payments, course delivery and reporting.',role:'Platform support, web improvements, course digitisation, learner administration and reporting.',focus:'LMS experience, e-commerce, usability, course delivery and learner engagement.',outcome:'A more structured and scalable digital learning environment supporting institutional and corporate learning.'},
  nova:{kicker:'Research & Innovation',title:'NOVA Research & Innovation',summary:'A modern institutional digital experience for research, innovation, entrepreneurship and social-impact initiatives.',role:'Website concept, information architecture, interface design and WordPress implementation.',focus:'Research credibility, modern UX, responsive design and African innovation storytelling.',outcome:'A clearer digital identity designed to communicate NOVA\'s research and innovation ecosystem.'},
  analytics:{kicker:'Data & Reporting',title:'Learner Engagement Analytics',summary:'A reusable reporting approach that turns LMS exports into management-ready engagement dashboards and individual learner views.',role:'Data cleaning, workbook design, dashboard structure, learner profiling and reporting logic.',focus:'Engagement, completion, enrolment, progress, management visibility and client reporting.',outcome:'Faster visibility of learner performance and clearer follow-up actions for programme teams and clients.'},
  courses:{kicker:'Digital Content',title:'Digital Course Experiences',summary:'Structured online learning experiences combining content, multimedia, interactive activities, assessments and progression rules.',role:'Course digitisation, content structuring, multimedia integration, assessment setup and quality checks.',focus:'Learner journey, accessibility, interactivity, assessment and completion experience.',outcome:'More consistent online learning experiences that are ready for delivery and easier for learners to navigate.'},
  leadworks:{kicker:'Web Development',title:'Leadworks',summary:'A community-focused website concept designed to communicate programmes, impact, partnerships and opportunities.',role:'Website structure, content presentation, visual direction and user experience planning.',focus:'Community impact, programme discovery, enquiries and partner visibility.',outcome:'A clearer web presence focused on storytelling, services and stakeholder engagement.'},
  training:{kicker:'STEM & Facilitation',title:'Coding & Robotics Training',summary:'Hands-on digital skills and coding/robotics facilitation supporting learners, educators and Train-the-Trainer programmes.',role:'Facilitation, workshop preparation, educator support, technology adoption and programme coordination.',focus:'Coding, robotics, digital confidence, educator development and practical learning.',outcome:'Training delivery across multiple programmes, including large educator and learner cohorts.'}
};
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
function openProject(key){
  const p = projects[key]; if(!p) return;
  document.getElementById('modal-kicker').textContent=p.kicker;
  document.getElementById('modal-title').textContent=p.title;
  document.getElementById('modal-summary').textContent=p.summary;
  document.getElementById('modal-role').textContent=p.role;
  document.getElementById('modal-focus').textContent=p.focus;
  document.getElementById('modal-outcome').textContent=p.outcome;
  const modalProjectLink = document.getElementById('modal-project-link');
  const liveUrl = (projectSettings[key] || {}).url || '';
  if (liveUrl) {
    modalProjectLink.href = liveUrl;
    modalProjectLink.hidden = false;
  } else {
    modalProjectLink.removeAttribute('href');
    modalProjectLink.hidden = true;
  }
  modal.showModal();
}
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', e => {
    if (e.target.closest('a')) return;
    if(e.target.closest('button') || e.target === card || e.target.closest('.project-art') || e.target.closest('.project-body')) openProject(card.dataset.project);
  });
  card.addEventListener('keydown', e => {if(e.key==='Enter'||e.key===' '){e.preventDefault();openProject(card.dataset.project);}});
});
modalClose.addEventListener('click',()=>modal.close());
modal.addEventListener('click',e=>{const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close();});

const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Hi Amos,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
  window.location.href = `mailto:amoschauke95@gmail.com?subject=${subject}&body=${body}`;
});
