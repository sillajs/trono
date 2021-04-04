const $ = require('silla');

const EMPTY = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img',
    'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
const CONTENT_TYPES = ['string', 'function'];

const isString = v => typeof v === 'string';
const isContent = v => CONTENT_TYPES.includes(typeof v);
const isEmpty = tag => EMPTY.includes(tag);

const create = (prefix, args) => {
  if (!prefix.length) return $(...args);
  const value = prefix.join('.');
  if (isString(args[0]) && (isContent(args[1]) || isEmpty(prefix[0]))) {
    const c = '#.'.includes(args[0][0]) ? '' : ' ';
    return $([value, args.shift()].join(c), ...args);
  }
  return $(value, ...args);
};

const proxy = prefix => {
  return new Proxy(()=>{}, {
    apply: (_, __, args) => create(prefix, args),
    get: (_, name) => proxy([...prefix, name])
  });
}

module.exports = proxy([]);
