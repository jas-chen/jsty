import cachedFn from '../utils/cachedFn';

const createProp = prop => {
  if (process.env.NODE_ENV !== 'production') {
    if ((/[^-a-z]/g).test(prop)) {
      throw new Error(`Prop contains invalid characters: \`${prop}\`.`);
    }
  }

  return value => ({ prop, value });
};

export default cachedFn(createProp);
