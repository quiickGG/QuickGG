const games = [
  {
    title: 'Jumping Shell Game',
    description: 'Hop through platforms, avoid obstacles, and score points in this polished action jumping game.',
    url: 'https://jumpingshellgame.github.io/',
    image: 'https://via.placeholder.com/520x300.png?text=Jumping+Shell+Game',
  },
  {
    title: 'Cookie Clicker',
    description: 'Click cookies, unlock upgrades, and grow your cookie empire in this addictive idle clicker.',
    url: 'https://sites.google.com/site/unblockedwtf/cookie-clicker',
    image: 'https://via.placeholder.com/520x300.png?text=Cookie+Clicker',
  },
  {
    title: 'Drive Mad',
    description: 'Race through obstacles, avoid crashes, and finish each level in this fast-paced driving game.',
    url: 'https://sites.google.com/view/games-az/drive-mad',
    image: 'https://via.placeholder.com/520x300.png?text=Drive+Mad',
  },
  {
    title: 'Rooftop Snipers',
    description: 'Battle opponents from rooftop platforms in this competitive two-player sniping game.',
    url: 'https://sites.google.com/view/classroom6x/rooftop-snipers',
    image: 'https://via.placeholder.com/520x300.png?text=Rooftop+Snipers',
  },
  {
    title: 'Tiny Fishing',
    description: 'Catch fish, upgrade gear, and explore calming waters in this relaxing fishing adventure.',
    url: 'https://sites.google.com/site/unblockedwtf/tiny-fishing',
    image: 'https://via.placeholder.com/520x300.png?text=Tiny+Fishing',
  },
  {
    title: 'Moto X3M',
    description: 'Drive through crazy stunts, ramps, and explosive obstacles in this thrilling bike stunt game.',
    url: 'https://sites.google.com/view/classroom6x/moto-x3m',
    image: 'https://via.placeholder.com/520x300.png?text=Moto+X3M',
  },
  {
    title: '1v1 LOL',
    description: 'Jump into a quick action arena and duel opponents in this fast-paced shooter showdown.',
    url: 'https://sites.google.com/view/classroom6x/1v1-lol',
    image: 'https://via.placeholder.com/520x300.png?text=1v1+LOL',
  },
  {
    title: 'Snow Rider 3D',
    description: 'Race snowmobiles over winter terrain and carve through snowy tracks in this 3D racer.',
    url: 'https://sites.google.com/view/classroom6x/snow-rider-3d',
    image: 'https://via.placeholder.com/520x300.png?text=Snow+Rider+3D',
  },
  {
    title: 'Subway Surfers',
    description: 'Run, jump, and dodge trains while collecting coins through colorful city tracks.',
    url: 'https://sites.google.com/view/unblockedgames410/subway-surfers',
    image: 'https://via.placeholder.com/520x300.png?text=Subway+Surfers',
  },
  {
    title: 'Merge Fruits',
    description: 'Combine fruits, grow your harvest, and complete lively puzzle objectives.',
    url: 'https://sites.google.com/view/classroom6x/merge-fruits',
    image: 'https://via.placeholder.com/520x300.png?text=Merge+Fruits',
  },
  {
    title: 'Archer Ragdoll',
    description: 'Shoot arrows, hit targets, and master ragdoll physics in this precision archery game.',
    url: 'https://sites.google.com/view/classroom6x/archer-ragdoll',
    image: 'https://via.placeholder.com/520x300.png?text=Archer+Ragdoll',
  },
];

const gamesGrid = document.getElementById('gamesGrid');
const searchInput = document.getElementById('gameSearch');
const template = document.getElementById('gameCardTemplate');

function createGameCard(game) {
  const card = template.content.cloneNode(true);
  const article = card.querySelector('.game-card');
  const image = card.querySelector('.game-card-image');
  const title = card.querySelector('.game-title');
  const description = card.querySelector('.game-description');
  const link = card.querySelector('.game-link');

  image.src = game.image;
  image.alt = `${game.title} image`;
  title.textContent = game.title;
  description.textContent = game.description;
  link.href = game.url;
  link.textContent = 'Play now';

  article.addEventListener('click', () => {
    window.open(game.url, '_blank');
  });

  return card;
}

function renderGames(filter = '') {
  const query = filter.trim().toLowerCase();
  gamesGrid.innerHTML = '';

  const results = games.filter((game) => {
    return game.title.toLowerCase().includes(query) || game.description.toLowerCase().includes(query);
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
