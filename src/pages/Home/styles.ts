import { styled, Heading, Text } from '@ignite-ui/react'

export const HomeContainer = styled('div', {
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
  marginLeft: 'auto',
  height: '100vh',

  display: 'flex',
  alignItems: 'center',
  gap: '$20',
})

export const Hero = styled('div', {
  maxWidth: '30rem',
  padding: '0 $10',
  width: '100%',

  [`> ${Heading}`]: {
    color: '$white',
    '@media(max-width: 600px)': {
      fontSize: '$6xl',
    },
  },

  [`> ${Text}`]: {
    marginTop: '$2',
    color: '$gray200',
  },
})

export const Preview = styled('div', {
  paddingLeft: '$8',
  overflow: 'hidden',

  img: {
    objectFit: 'cover',
  },

  '@media(max-width: 600px)': {
    display: 'none',
  },
})
