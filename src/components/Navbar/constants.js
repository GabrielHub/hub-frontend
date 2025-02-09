export const navConfig = [
  {
    title: 'RANKING',
    path: '/ranking'
  },
  {
    title: 'PLAYERS',
    path: '/players'
  },
  {
    title: 'GAMES',
    path: '/games'
  },
  {
    title: 'TOOL',
    path: '/tool'
  },
  {
    title: 'ANALYSIS',
    path: '/analysis',
    children: [
      {
        title: 'LEAGUE AVERAGES',
        path: '/analysis/league'
      },
      {
        title: 'BY POSITION',
        path: '/analysis/position'
      },
      {
        title: 'NBA COMPARISON',
        path: '/analysis/similarity'
      },
      {
        title: 'AWARDS',
        path: '/analysis/awards'
      },
      {
        title: 'ARCHIVE',
        path: '/analysis/archive'
      }
    ]
  },
  {
    title: 'ADMIN',
    path: '/admin',
    children: [
      {
        title: 'UPLOAD',
        path: '/admin/manualUpload'
      },
      {
        title: 'DASHBOARD',
        path: '/admin/dashboard'
      }
    ]
  }
];

export const MenuStyles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '24px',
    top: '24px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%'
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
};

export default {};
