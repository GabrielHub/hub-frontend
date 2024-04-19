import { ELO_CONFIG } from 'constants';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DiamondIcon from '@mui/icons-material/Diamond';

export const ELO_ICON_MAP = {
  Bronze: <BookmarkIcon sx={{ color: '#F97317' }} />,
  Silver: <BookmarkIcon sx={{ color: '#E1E1E1' }} />,
  Gold: <BookmarkIcon sx={{ color: '#FBCC15' }} />,
  Emerald: <DiamondIcon sx={{ color: '#8CFD93' }} />,
  Sapphire: <DiamondIcon sx={{ color: '#509DFF' }} />,
  Ruby: <DiamondIcon sx={{ color: '#BA2A2C' }} />,
  Amethyst: <DiamondIcon sx={{ color: '#B825FF' }} />,
  Diamond: <DiamondIcon sx={{ color: '#3CFFFF' }} />,
  Opal: (
    <DiamondIcon
      sx={{
        background: 'linear-gradient(45deg, #85ffff 30%, #8388B1 90%)',
        color: 'white',
        borderRadius: '50%'
      }}
    />
  ),
  Invincible: (
    <DiamondIcon
      sx={{
        background: 'linear-gradient(45deg, #EEFDFE 30%, #AAD0FE 90%)',
        color: '#FF8AFF',
        borderRadius: '50%'
      }}
    />
  )
};

// * Function that takes an elo value (0 to 2200+) and returns the corresponding tier, icon and color
export const getEloTier = (elo) => {
  if (elo > ELO_CONFIG.Invincible) {
    return 'Invincible';
  }
  if (elo > ELO_CONFIG.Opal) {
    return 'Opal';
  }
  if (elo > ELO_CONFIG.Diamond) {
    return 'Diamond';
  }
  if (elo > ELO_CONFIG.Amethyst) {
    return 'Amethyst';
  }
  if (elo > ELO_CONFIG.Ruby) {
    return 'Ruby';
  }
  if (elo > ELO_CONFIG.Sapphire) {
    return 'Sapphire';
  }
  if (elo > ELO_CONFIG.Emerald) {
    return 'Emerald';
  }
  if (elo > ELO_CONFIG.Gold) {
    return 'Gold';
  }
  if (elo > ELO_CONFIG.Silver) {
    return 'Silver';
  }
  return 'Bronze';
};

export default {};
