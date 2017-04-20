export default function cachedFn(create) {
  const cache = {};

  return name => {
    const fn = cache[name];
    return fn ? fn : cache[name] = create(name);
  }
}
