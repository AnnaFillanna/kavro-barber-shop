const image = (filename: string) => `${import.meta.env.BASE_URL}images/${filename}`

export const images = {
  hero: image('pexels-alexandre-saraiva-carniato-583650-6080361.jpg'),
  studioPortrait: image('pexels-behrouz-sasani-3568050-16226130.jpg'),
  studioWide: image('pexels-roman-murlyk-2850125-4862662.jpg'),
  studioDetail: image('pexels-vitalyagorbachev-10775082.jpg'),
  studioTools: image('pexels-miami302-16372624.jpg'),
  barbers: [
    {
      name: 'MILO KERN',
      role: 'CUTS & TEXTURE',
      image: image('pexels-anyajuarez-16146988.jpg'),
    },
    {
      name: 'JONAS REED',
      role: 'FADE & FORM',
      image: image('pexels-alexandre-saraiva-carniato-583650-5188619.jpg'),
    },
    {
      name: 'ELI NAVARRO',
      role: 'BEARD & RITUAL',
      image: image('pexels-alexandre-saraiva-carniato-583650-5188607.jpg'),
    },
  ],
} as const
