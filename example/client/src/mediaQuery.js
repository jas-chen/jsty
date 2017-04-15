import { media } from 'jsty';

const createMedia = query => {
  const m = media(query);
  m.query = query;
  return m;
};

export const phone = createMedia('screen and (max-width: 640px)');
export const pad = createMedia('screen and (max-width: 1024px)');
