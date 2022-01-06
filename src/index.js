import { createFocusTrap } from 'focus-trap'
import { tabbable } from 'tabbable'
import OnDemandLiveRegion from 'on-demand-live-region'
import 'focus-options-polyfill'

export function ariaHide(container) {
  container.setAttribute('aria-hidden', 'true')
}

export function ariaShow(container) {
  container.setAttribute('aria-hidden', 'false')
  container.removeAttribute('hidden')
}

export function ariaPress(button) {
  button.setAttribute('aria-pressed', 'true')
}

export function ariaUnpress(button) {
  button.setAttribute('aria-pressed', 'false')
}

export function ariaCheck(button) {
  button.setAttribute('aria-checked', 'true')
}

export function ariaUncheck(button) {
  button.setAttribute('aria-checked', 'false')
}

export function ariaSelect(container) {
  container.setAttribute('aria-selected', 'true')
}

export function ariaUnselect(container) {
  container.setAttribute('aria-selected', 'false')
}

export function ariaDisable(container) {
  container.setAttribute('aria-disabled', 'true')
}

export function ariaEnable(container) {
  container.setAttribute('aria-disabled', 'false')
}

export function ariaCurrent(container, current = true) {
  if (typeof current === 'boolean') {
    current = current ? 'true' : 'false'
  }
  if (current === null) {
    container.removeAttribute('aria-current')
  } else {
    container.setAttribute('aria-current', current)
  }
}

export function ariaExpand(expander, expandingContainer = null, expanderLabel = '', expanderLabelEl = null) {
  expander.setAttribute('aria-expanded', 'true')
  if (expanderLabel) {
    (expanderLabelEl || expander).textContent = expanderLabel
  }
  if (expandingContainer) {
    expandingContainer.setAttribute('aria-hidden', 'false')
  }
}

export function ariaContract(expander, expandingContainer = null, expanderLabel = '', expanderLabelEl = null) {
  expander.setAttribute('aria-expanded', 'false')
  if (expanderLabel) {
    (expanderLabelEl || expander).textContent = expanderLabel
  }
  if (expandingContainer) {
    expandingContainer.setAttribute('aria-hidden', 'true')
  }
}

export function ariaTrapFocus(focusElement, unfocusElements = [], initialFocus = null) {
  // If required, traverse for background elements
  if (unfocusElements === true) {
    unfocusElements = ariaGetFocusTrapBackgroundElements(focusElement)
  }

  // Unhide element
  focusElement.setAttribute('aria-hidden', 'false')

  // Trap focus inside element
  ariaGetFocusTrap(focusElement, initialFocus).activate()

  // Only hide other elements *after* we move focus out of it
  Array.from(unfocusElements).forEach((element) => {
    element.dataset.ariaHiddenBefore = element.getAttribute('aria-hidden')
    element.setAttribute('aria-hidden', 'true')
  })

  // Return function to restore focus
  return () => ariaRestoreFocus(focusElement, unfocusElements)
}

export function ariaRestoreFocus(focusElement, unfocusElements = []) {
  // Restore background *before* we move focus into it
  focusElement.setAttribute('aria-hidden', 'true')

  Array.from(unfocusElements).forEach((element) => {
    let ariaHiddenBefore = element.dataset.ariaHiddenBefore
    if (ariaHiddenBefore === 'null') {
      ariaHiddenBefore = null
    }
    if (ariaHiddenBefore) {
      element.setAttribute('aria-hidden', ariaHiddenBefore)
    } else {
      element.removeAttribute('aria-hidden')
    }
    delete element.dataset.ariaHiddenBefore
  })

  // Release focus trap
  ariaGetFocusTrap(focusElement).deactivate()
}

const focusTraps = new WeakMap()

export function ariaGetFocusTrap(focusElement, initialFocus = null) {
  if (focusTraps.has(focusElement)) {
    return focusTraps.get(focusElement)
  }

  // Find the first tabbable element for focus
  const focusTarget = ariaGetFocusTarget(focusElement, initialFocus)

  const focusTrap = createFocusTrap(focusElement, {
    initialFocus: focusTarget,
    fallbackFocus: focusElement,
    preventScroll: true,
    escapeDeactivates: false,
    allowOutsideClick: true
  })

  focusTraps.set(focusElement, focusTrap)

  return focusTrap
}

export function ariaGetFocusTarget(focusContainer, initialFocus = null) {
  if (initialFocus) {
    return tabbable(focusContainer).find(initialFocus)
  }
  return tabbable(focusContainer)[0]
}

export function ariaGetFocusTrapBackgroundElements(focusContainer, untilParent = 'body') {
  const upperParent = focusContainer.closest(untilParent) || document.body

  const parents = []
  let node = focusContainer
  while (node.parentNode && node.parentNode != upperParent) {
    node = node.parentNode
    parents.push(node)
  }

  return parents.reduce((all, el) => {
    const siblings = Array.from(el.parentNode?.children || [])
    const siblingsExceptSelf = siblings.filter(sibling => sibling !== el)
    return all.concat(siblingsExceptSelf)
  }, [])
}

export function ariaFocus(focusContainer, scroll = true) {
  const focusTarget = ariaGetFocusTarget(focusContainer)
  if (focusTarget) {
    focusTarget.focus({ preventScroll: !scroll })
  } else {
    focusContainer.setAttribute('tabindex', '-1')
    focusContainer.focus({ preventScroll: !scroll })
  }
}

let liveRegion

export function ariaAnnounce(announcement) {
  if (!liveRegion) {
    liveRegion = new OnDemandLiveRegion()
  }
  liveRegion.say(announcement)
}
