import cachedFn from '../utils/cachedFn';

const createProp = prop => {
  if (process.env.NODE_ENV !== 'production') {
    if ((/[A-Z]/g).test(prop)) {
      throw new Error(`Prop should not contain uppercase characters: \`${prop}\`.`);
    }
  }

  return value => ({ prop, value });
};

export default cachedFn(createProp);
