# A11y Tools

[![NPM version](https://img.shields.io/npm/v/a11y-tools)](https://www.npmjs.com/package/a11y-tools)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/a11y-tools?label=size)](https://bundlephobia.com/result?p=a11y-tools)
[![GitHub license](https://img.shields.io/github/license/daun/a11y-tools)](./LICENSE)

Collection of simple accessibility helpers.

- [ARIA](#aria)
- [Focus](#focus)
- [Speech](#speech)

## Installation

```bash
npm install a11y-tools
```

## ARIA

### Hide/Show

```js
import { ariaHide, ariaShow } from 'a11y-tools'

ariaHide(element) // set aria-hidden="true"
ariaShow(element) // set aria-hidden="false"
```

### Disable/Enable

```js
import { ariaDisable, ariaEnable } from 'a11y-tools'

ariaDisable(element) // set aria-disabled="true"
ariaEnable(element)  // set aria-disabled="false"
```

### Input States

```js
import { ariaCheck, ariaUncheck, ariaSelect, ariaUnselect, ariaPress, ariaUnpress } from 'a11y-tools'

ariaCheck(element)    // set aria-checked="true"
ariaUncheck(element)  // set aria-checked="false"

ariaSelect(element)   // set aria-selected="true"
ariaUnselect(element) // set aria-selected="false"

ariaPress(element)    // set aria-pressed="true"
ariaUnpress(element)  // set aria-pressed="false"
```

### Current

```js
import { ariaCurrent } from 'a11y-tools'

ariaCurrent(element)         // set aria-current="true"
ariaCurrent(element, false)  // set aria-current="false"
ariaCurrent(element, 'page') // set aria-current="page"
ariaCurrent(element, null)   // remove aria-current
```

### Expand/Contract

`element` = Toggle element (button)
`label` = Text content of toggle element
`container` = Content container (DOM element)

```js
import { ariaExpand, ariaContract } from 'a11y-tools'

ariaExpand(element)   // set aria-expanded="true"
ariaContract(element) // set aria-expanded="false"

ariaExpand(element, { container, label = 'Close' })
ariaContract(element, { container, label = 'Open' })
```

## Focus

### Trap focus

```js
import { trapFocus } from 'a11y-tools'

// Trap focus inside element
const focusTrapUndoFunction = trapFocus(element, {
  unfocusElements: true // aria-hide sibling containers?
})

// Restore focus to previously focused element
focusTrapUndoFunction()
```

### Focus element

```js
import { focus } from 'a11y-tools'

// Focus first tabbable child element without scrolling to it
focus(element, { scroll: false })
```

## Speech

### Announce to screenreaders

```js
import { speak } from 'a11y-tools'

speak('Navigated to page: About')
```

## License

[MIT](https://opensource.org/licenses/MIT)
