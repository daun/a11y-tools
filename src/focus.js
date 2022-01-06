import 'focus-options-polyfill'

import { createFocusTrap } from 'focus-trap'
import { tabbable } from 'tabbable'

export function trapFocus(
  focusElement,
  unfocusElements = [],
  initialFocus = null
) {
  // If required, traverse for background elements
  if (unfocusElements === true) {
    unfocusElements = getFocusTrapBackgroundElements(focusElement)
  }

  // Unhide element
  focusElement.setAttribute('aria-hidden', 'false')

  // Trap focus inside element
  getFocusTrap(focusElement, initialFocus).activate()

  // Only hide other elements *after* we move focus out of it
  Array.from(unfocusElements).forEach((element) => {
    element.dataset.ariaHiddenBefore = element.getAttribute('aria-hidden')
    element.setAttribute('aria-hidden', 'true')
  })

  // Return function to restore focus
  return () => restoreFocus(focusElement, unfocusElements)
}

export function restoreFocus(focusElement, unfocusElements = []) {
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
  getFocusTrap(focusElement).deactivate()
}

const focusTraps = new WeakMap()

export function getFocusTrap(focusElement, initialFocus = null) {
  if (focusTraps.has(focusElement)) {
    return focusTraps.get(focusElement)
  }

  // Find the first tabbable element for focus
  const focusTarget = getFocusTarget(focusElement, initialFocus)

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

export function getFocusTarget(focusContainer, initialFocus = null) {
  if (initialFocus) {
    return tabbable(focusContainer).find(initialFocus)
  }
  return tabbable(focusContainer)[0]
}

export function getFocusTrapBackgroundElements(
  focusContainer,
  untilParent = 'body'
) {
  const upperParent = focusContainer.closest(untilParent) || document.body

  const parents = []
  let node = focusContainer
  while (node.parentNode && node.parentNode != upperParent) {
    node = node.parentNode
    parents.push(node)
  }

  return parents.reduce((all, el) => {
    const siblings = Array.from((el.parentNode || {}).children || [])
    const siblingsExceptSelf = siblings.filter((sibling) => sibling !== el)
    return all.concat(siblingsExceptSelf)
  }, [])
}

export function focus(focusContainer, scroll = true) {
  const focusTarget = getFocusTarget(focusContainer)
  if (focusTarget) {
    focusTarget.focus({ preventScroll: !scroll })
  } else {
    focusContainer.setAttribute('tabindex', '-1')
    focusContainer.focus({ preventScroll: !scroll })
  }
}
