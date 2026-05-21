const games = [
  {
    title: 'Jumping Shell Game',
    description: 'Hop through platforms, avoid obstacles, and score points in this polished action jumping game.',
    url: 'https://jumpingshellgame.github.io/',
    image: 'images/jumping-shell-game.png',
  },
  {
    title: 'Cookie Clicker',
    description: 'Click cookies, unlock upgrades, and grow your cookie empire in this addictive idle clicker.',
    url: 'https://sites.google.com/site/unblockedwtf/cookie-clicker',
    image: 'images/cookie-clicker.png',
  },
  {
    title: 'Drive Mad',
    description: 'Race through obstacles, avoid crashes, and finish each level in this fast-paced driving game.',
    url: 'https://sites.google.com/view/games-az/drive-mad',
    image: 'images/drive-mad.png',
  },
  {
    title: 'Rooftop Snipers',
    description: 'Battle opponents from rooftop platforms in this competitive two-player sniping game.',
    url: 'https://sites.google.com/view/classroom6x/rooftop-snipers',
    image: 'images/rooftop-snipers.png',
  },
  {
    title: 'Tiny Fishing',
    description: 'Catch fish, upgrade gear, and explore calming waters in this relaxing fishing adventure.',
    url: 'https://sites.google.com/site/unblockedwtf/tiny-fishing',
    image: 'images/tiny-fishing.png',
  },
  {
    title: 'Moto X3M',
    description: 'Drive through crazy stunts, ramps, and explosive obstacles in this thrilling bike stunt game.',
    url: 'https://sites.google.com/view/classroom6x/moto-x3m',
    image: 'images/moto-x3m.png',
  },
  {
    title: '1v1 LOL',
    description: 'Jump into a quick action arena and duel opponents in this fast-paced shooter showdown.',
    url: 'https://sites.google.com/view/classroom6x/1v1-lol',
    image: 'images/1v1-lol.png',
  },
  {
    title: 'Snow Rider 3D',
    description: 'Race snowmobiles over winter terrain and carve through snowy tracks in this 3D racer.',
    url: 'https://sites.google.com/view/classroom6x/snow-rider-3d',
    image: 'images/snow-rider-3d.png',
  },
  {
    title: 'Subway Surfers',
    description: 'Run, jump, and dodge trains while collecting coins through colorful city tracks.',
    url: 'https://sites.google.com/view/unblockedgames410/subway-surfers',
    image: 'images/subway-surfers.png',
  },
  {
    title: 'Merge Fruits',
    description: 'Combine fruits, grow your harvest, and complete lively puzzle objectives.',
    url: 'https://sites.google.com/view/classroom6x/merge-fruits',
    image: 'images/merge-fruits-new.svg',
  },
  {
    title: 'Archer Ragdoll',
    description: 'Shoot arrows, hit targets, and master ragdoll physics in this precision archery game.',
    url: 'https://sites.google.com/view/classroom6x/archer-ragdoll',
    image: 'images/archer-ragdoll-new.svg',
  },
];

const gamesGrid = document.getElementById('gamesGrid');
const searchInput = document.getElementById('gameSearch');
const template = document.getElementById('gameCardTemplate');
const starfield = document.getElementById('starfield');

function spawnConfetti(x, y) {
  const colors = ['#8b5cf6', '#60a5fa', '#facc15', '#34d399', '#f472b6'];
  for (let i = 0; i < 18; i += 1) {
    const particle = document.createElement('div');
    particle.className = 'confetti-piece';
    const size = 6 + Math.random() * 8;
    const angle = Math.random() * 360;
    const distance = 80 + Math.random() * 120;
    const velocityX = Math.cos(angle) * distance;
    const velocityY = Math.sin(angle) * distance - 30;

    particle.style.width = `${size}px`;
    particle.style.height = `${size * 0.55}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.opacity = '1';
    particle.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(particle);

    requestAnimationFrame(() => {
      particle.style.transition = 'transform 700ms ease-out, opacity 700ms ease-out';
      particle.style.transform = `translate(${velocityX}px, ${velocityY}px) rotate(${Math.random() * 720}deg)`;
      particle.style.opacity = '0';
    });

    window.setTimeout(() => {
      particle.remove();
    }, 780);
  }
}

function updateStarfieldVisibility() {
  const heroBottom = document.querySelector('.hero').getBoundingClientRect().bottom;
  if (heroBottom < 0) {
    starfield.classList.add('visible');
  } else {
    starfield.classList.remove('visible');
  }
}

window.addEventListener('scroll', updateStarfieldVisibility);
window.addEventListener('resize', updateStarfieldVisibility);

function createGameCard(game) {
  const card = template.content.cloneNode(true);
  const article = card.querySelector('.game-card');
  const image = card.querySelector('.game-card-image');
  const title = card.querySelector('.game-title');
  const description = card.querySelector('.game-description');
  const link = card.querySelector('.game-link');

  image.src = game.image;
  image.alt = `${game.title} image`;
  image.onerror = () => {
    if (!image.dataset.fallback) {
      image.dataset.fallback = 'true';
      image.src = 'images/placeholder.svg';
    }
  };
  title.textContent = game.title;
  description.textContent = game.description;
  link.href = game.url;
  link.textContent = 'Play now';

  article.addEventListener('click', (event) => {
    spawnConfetti(event.clientX, event.clientY);
    window.open(game.url, '_blank');
  });

  link.addEventListener('click', (event) => {
    event.stopPropagation();
    spawnConfetti(event.clientX, event.clientY);
    window.open(game.url, '_blank');
  });

  return card;
}

function renderGames(filter = '') {
  const query = filter.trim().toLowerCase();
  gamesGrid.innerHTML = '';

  const results = games.filter((game) => {
    return game.title.toLowerCase().includes(query);
  });

  if (results.length === 0) {
    gamesGrid.innerHTML = '<div class="empty-state">No games matched your search. Try a different keyword.</div>';
    return;
  }

  results.forEach((game) => {
    const card = createGameCard(game);
    gamesGrid.appendChild(card);
  });
}

searchInput.addEventListener('input', (event) => {
  renderGames(event.target.value);
});

renderGames();
