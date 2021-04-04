# trono.js
A super simple, extremely small, and pretty useful tool for building dom elements in JavaScript

## Getting Started
### Install
    npm i trono

### Usage
    import $ from 'trono';
    $.h1('Hola, Mundo');

### Todo List Example
    const items = ['Start using trono.js', 'Focus on my project'];
    $.section(() => {
      $.header(() => {
        $.h1('Todo List');
        const input = $.input('type="text" placeholder="Add a new item"');
        $.button.add('Add').onclick = () => {
          $.li.todo-item(input.value, ul);
        };
      });
      const ul = $.ul.todo-items(() => {
        items.forEach(item => $.li.todo-item(item));
      });
    });

## Syntax
$`TAG`.`CLASSES`(`ELEMENT_STRING`, `CONTENT`, `ATTACH_NODE`, `REFERENCE_NODE`);

Returns the created  [DOM Element](https://www.w3schools.com/jsref/dom_obj_all.asp)

#### Hoisting
Instead of defining tag and classes in the `ELEMENT_STRING`, you can hoist them to before the
parenthesis. So `$('h1.title', 'My Title')` is the same as `$.h1.title('My Title')`.

If you hoist, then the expected arguments *may* change. Here are examples showing different behaviors:
1) `$.span('This is Content')`
1) `$.span('#span-id title="span"', 'This is Content')`
1) `$.input('type="checkbox" checked')`

The `ELEMENT_STRING` will be removed as the expected first argument, unless either of the following conditions are satisfied:
1) The user provides a second argument that is clearly the content (i.e. of type `string` or `function`).
1) The element is a type that cannot have content/children, as in `input` or `br`

In the 2nd example, condition (1) was satisfied, since the 2nd argument is *clearly* the content.
In the 3rd example, `input` is an *empty* element, meaning it can't have child nodes.

##### List of *empty* element tags
`['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']`

#### ELEMENT_STRING
Text-representatin of the element being created, in the following order:
1) Tag. Defaults to `div`. Tag can be hoisted.
1) Classes. Prefixed with a `.`, as in `.first.second.third`. Can be hoisted.
1) Id. Prefixed with a #, as in `#first-name`
1) Attributes. Each is separated by a space, and functions the same as when createad in an HTML tag.

##### Examples:
* `$.div()` or `$()`
    * `<div></div>`

* `$.div.block()` or `$('div.block')`
    * `<div class="block"></div>`

* `$.h1.title()` or `$('h1.title')`
    * `<h1 class="title"></h1>`

* `$.input('type="checkbox" checked')`
    * `<input type="checkbox" checked>`

* `$.i.icon.close('#close-icon aria-hidden="true" title="Close Icon"')`
    * `<i id="close-icon" aria-hidden="true" title="Close Icon" class="icon close"></i>`

#### CONTENT (optional)
Either a function or string
##### Content as text:
* `$.span('Hello, World')` ⇒ `<span>Hello, World</div>`
* `$.button('Click Me')` ⇒ `<button>Click Me</button>`

##### Content as a function:
Passes the dom element as an arg. This is usually unnecessary, since elements are automatically appended to the containing element. However, in cases of delayed execution (timeout, event callback, etc.) it can often be useful.

    $.ul.items(() => {
        $.li('Item 1');
        $.li(() => {
            $.span('Item');
            $.span('2');
        });
    });

*Output:*

    <ul class="items">
        <li>Item 1</li>
        <li>
            <span>Item</span>
            <span>2</span>
        </li>
    </ul>

**Note**:
If element has no content, the arg can just be eliminated. Thus, `ATTACH_NODE` and
    $.button(document.body);
    $.input(document.body);

#### ATTACH_NODE (optional)
Determines which parent node to attach to. If not specified, attaches to the node in our current context. The context node is either the node for which we're currently executing its content function, or it is `document.body`.

    $.section(() => {
       $.h1('This element is a child of section');
       $('.popup', '...and this is a child of body', document.body);
    });

Be careful with code that has delayed execution, since its context is lost. For this reason, it's often useful to use the node argument to attach it explicitly.

    $.section(section => {
       $('button', 'Click Me').onclick = () => {
          $.h1('This element gets appended to document.body');
          $.h1('Wherease this will get appended in section', section);
       };
    });

#### REFERENCE_NODE (optional)
Rather than appending to the `ATTACH_NODE` you can insert before this reference node.

    $.section(section => {
       const button = $('button', 'Insert Above')
       button.onclick = () => {
          $('div', `Item ${section.children.length}`, section, button);
       };
    });
