const $ = require('../index');

const content = callback => {
  document.body.innerHTML = '';
  callback();
  return document.body.innerHTML;
};

it('creates element with tag', () => {
  expect(content(() => $.div())).toBe('<div></div>');
  expect(content(() => $.h1())).toBe('<h1></h1>');
});

it('creates classes', () => {
  expect(content(() => $.h1.title())).toBe('<h1 class="title"></h1>');
  expect(content(() => $.i.icon.close())).toBe('<i class="icon close"></i>');
});

it('creates id', () => {
  expect(content(() => $.h1('#title', ''))).toBe('<h1 id="title"></h1>');
  expect(content(() => $.span.one.two('#ref', ''))).toBe('<span id="ref" class="one two"></span>');
});

it('creates attributes', () => {
  expect(content(() => $.a('href="./"', ''))).toBe('<a href="./"></a>');
  expect(content(() => $.a.menu('href="./"', ''))).toBe('<a href="./" class="menu"></a>');
  expect(content(() => $.input.name('#first type="text"'))).toBe('<input type="text" id="first" class="name">');
  expect(content(() => $.input('checked'))).toBe('<input checked="">');
});

it('creates text', () => {
  expect($.button('Click Me').innerText).toBe('Click Me');
});

it('attaches to another element', () => {
  const el = document.createElement('div');
  $.button('Click Me', el);
  expect(el.children[0].tagName).toBe('BUTTON');
  expect(el.children[0].innerText).toBe('Click Me');
});

describe('empty element', () => {
  it('attaches as first arg', () => {
    const el = document.createElement('div');
    $.input(el);
    expect(el.children[0].tagName).toBe('INPUT');
  });

  it('attaches as 2nd arg', () => {
    const el = document.createElement('div');
    $.input('type="checkbox"', el);
    expect(el.children[0].tagName).toBe('INPUT');
  });
});

it('attaches non-empty element to another element', () => {
  const el = document.createElement('div');
  $.button(el);
  expect(el.children[0].tagName).toBe('BUTTON');
});
