import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import Carousel from 'react-multi-carousel';
import { fetchSpells } from 'rest';
import { SpellCard } from 'components/SpellCard';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    partialVisibilityGutter: 70
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    partialVisibilityGutter: 70
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 70 // * Peeks into previous or next image/card
  }
};

export function ImageCarousel() {
  const [spells, setSpells] = useState([]);
  const [spellIndex, setSpellIndex] = useState(0);
  const [errorText, setErrorText] = useState(null);
  const [carouselRef, setCarouselRef] = useState(null);

  // TODO Stop paginating once we hit the limit, (not sure when that is)
  const getSpells = useCallback(async (pagination = 0) => {
    const { data, error } = await fetchSpells(pagination);
    if (error) {
      setErrorText(JSON.stringify(error));
      // eslint-disable-next-line no-console
      console.log('ERROR', error);
    } else {
      setErrorText(null);
      if (data?.spells.length) {
        setSpells((prevSpells) => prevSpells.concat(data.spells));
      }
    }
  }, []);

  const handleCardChange = (index) => {
    const { currentSlide, totalItems } = carouselRef.state;

    // * If we're at the end of the slide, fetch next set of images
    if (currentSlide + 1 === totalItems - 1) {
      getSpells(spellIndex + 1);
      setSpellIndex((prevState) => prevState + 1);
    }
    carouselRef.goToSlide(index);
  };

  useEffect(() => {
    if (!spells.length) {
      getSpells();
    }
  }, [getSpells, spells]);

  return (
    <Box m={2} p={2}>
      <Typography variant="h6" align="center" gutterBottom>
        A Carousel of Spells
      </Typography>
      {errorText && <Typography variant="h4">Error fetching spells! {errorText}</Typography>}
      <Box sx={{ margin: 'auto', maxWidth: 800 }}>
        <Carousel
          responsive={responsive}
          centerMode
          arrows={false}
          draggable={false}
          swipeable={false}
          keyBoardControl={false}
          ref={(el) => {
            setCarouselRef(el);
          }}>
          {Boolean(spells.length) &&
            spells.map(({ name, level, school, image }, index) => (
              <SpellCard
                index={index}
                key={name}
                imageURL={image}
                name={name}
                level={level}
                school={school}
                onClick={handleCardChange}
              />
            ))}
        </Carousel>
      </Box>
    </Box>
  );
}

export default {};
