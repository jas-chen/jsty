export default function cachedFn(create, cache = {}) {
  return name => cache.hasOwnProperty(name)
    ? cache[name]
    : cache[name] = create(name);
}
