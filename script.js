// Oud & Ember — one small script for all pages. Each part only runs if its element is on the page.

// Perfume data used by the quiz and the gift builder: key: [name, price in AED, short description]
const PERFUMES = {
  'desert-rose':    ['Desert Rose', 320, 'Taif rose, pink pepper and soft musk. Romantic and glowing.'],
  'midnight-oud':   ['Midnight Oud', 480, 'Aged oud, leather and dark vanilla. Bold and unforgettable.'],
  'saffron-ember':  ['Saffron Ember', 395, 'Saffron, cardamom and warm amber. Like a desert sunset.'],
  'amber-tide':     ['Amber Tide', 290, 'Sea salt, bergamot and amber. Calm, fresh and easy.'],
  'jasmine-majlis': ['Jasmine Majlis', 340, 'Jasmine sambac, orange blossom and sandalwood. Bright and uplifting.'],
  'cedar-dune':     ['Cedar Dune', 360, 'Cedar, frankincense and vetiver. Quiet and grounding.']
};

// 1. Site search (header, every page): [title, link, keywords]
const INDEX = [
  ['Home', 'index.html', 'collection perfumes film video shop'],
  ['About Us', 'about.html', 'story atelier values team heritage'],
  ['Scent Finder quiz', 'scent-finder.html', 'quiz recommend match mood feel'],
  ['Ingredients', 'ingredients.html', 'oud rose saffron frankincense notes families woody floral spicy fresh'],
  ['Gift Builder', 'gift-builder.html', 'gift wrap box engraving present price'],
  ['Journal', 'journal.html', 'blog articles ai layering history oud'],
  ['Contact Us', 'contact.html', 'email phone address form visit hours social'],
  ['Journal: How we use AI', 'journal.html#ai', 'ai artificial intelligence disclosure ethics'],
  ['Journal: Layering perfume', 'journal.html#layering', 'layering guide combine'],
  ...Object.entries(PERFUMES).map(([key, [name, , desc]]) => [name + ' (perfume)', 'index.html#' + key, desc])
];

const q = document.getElementById('q');
const results = document.getElementById('results');
if (q) {
  q.addEventListener('input', () => {
    const words = q.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const hits = INDEX.filter(([t, , k]) => words.every(w => (t + ' ' + k).toLowerCase().includes(w))).slice(0, 6);
    results.innerHTML = hits.map(([t, u]) => `<li><a href="${u}">${t}</a></li>`).join('') || '<li class="none">No results</li>';
    results.hidden = !words.length;
  });
  q.form.addEventListener('submit', e => {           // Enter opens the first result
    e.preventDefault();
    const first = results.querySelector('a');
    if (first) location.href = first.href;
  });
  q.addEventListener('keydown', e => { if (e.key === 'Escape') { q.value = ''; results.hidden = true; } });
  document.addEventListener('click', e => { if (!q.form.contains(e.target)) results.hidden = true; });
}

// Hero background video: pause/play button (moving content must be stoppable)
const heroVideo = document.querySelector('.hero-video');
const pauseBtn = document.querySelector('.pause');
if (heroVideo && pauseBtn) pauseBtn.addEventListener('click', () => {
  const paused = heroVideo.paused ? (heroVideo.play(), false) : (heroVideo.pause(), true);
  pauseBtn.setAttribute('aria-pressed', paused);
  pauseBtn.textContent = paused ? 'Play background video' : 'Pause background video';
});

// Shared card markup for a recommended perfume
const card = key => {
  const [name, price, desc] = PERFUMES[key];
  return `<img src="images/p-${key}.jpg" alt="${name} perfume bottle" width="800" height="800">
    <div><p class="type">Your match</p><h3>${name}</h3><p>${desc}</p><p class="price">AED ${price} · 50 ml</p>
    <a class="btn" href="gift-builder.html">Make it a gift</a></div>`;
};

// 2. Scent Finder quiz: each answer votes for a perfume; most votes wins (ties go to the earliest answer)
const quiz = document.getElementById('quiz');
if (quiz) quiz.addEventListener('submit', e => {
  e.preventDefault();
  const votes = [...new FormData(quiz).values()];
  const count = key => votes.filter(v => v === key).length;
  const best = [...votes].sort((a, b) => count(b) - count(a))[0];
  const out = document.getElementById('match');
  out.innerHTML = card(best);
  out.hidden = false;
  document.getElementById('bestseller')?.remove();  // no need for the fallback once matched
  out.focus();
});

// 3. Gift Builder: live price summary
const gift = document.getElementById('gift');
if (gift) {
  const update = () => {
    const f = new FormData(gift);
    const [name, price] = PERFUMES[f.get('perfume')];
    const size = gift.querySelector('[name=size]:checked');
    const wrap = gift.querySelector('[name=wrap]:checked');
    const engraving = f.get('engrave').trim();
    const total = Math.round(price * size.value) + Number(wrap.value) + (engraving ? 40 : 0);
    document.getElementById('summary').textContent =
      `${name} · ${size.dataset.label} · ${wrap.dataset.label}${engraving ? ` · engraved "${engraving}"` : ''} — AED ${total}`;
  };
  gift.addEventListener('input', update);
  update();
}

// 4. Contact form: check required fields, show friendly errors, then a thank-you message.
// Nothing is sent or stored: this demo site has no server.
const form = document.getElementById('contact-form');
if (form) form.addEventListener('submit', e => {
  e.preventDefault();
  let firstBad = null;
  form.querySelectorAll('[required]').forEach(field => {
    const bad = !field.checkValidity();
    field.setAttribute('aria-invalid', bad);
    document.getElementById(field.id + '-err').textContent = bad ? field.dataset.error : '';
    if (bad && !firstBad) firstBad = field;
  });
  if (firstBad) return firstBad.focus();
  form.hidden = true;
  document.getElementById('thanks').hidden = false;
  document.getElementById('thanks').focus();
});
