export function ariaHide(container) {
  container.setAttribute('aria-hidden', 'true')
}

export function ariaShow(container) {
  container.setAttribute('aria-hidden', 'false')
  container.removeAttribute('hidden')
}

export function ariaDisable(container) {
  container.setAttribute('aria-disabled', 'true')
}

export function ariaEnable(container) {
  container.setAttribute('aria-disabled', 'false')
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

export function ariaPress(button) {
  button.setAttribute('aria-pressed', 'true')
}

export function ariaUnpress(button) {
  button.setAttribute('aria-pressed', 'false')
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

export function ariaExpand(
  toggleEl,
  { label = '', labelEl = null, container = null }
) {
  toggleEl.setAttribute('aria-expanded', 'true')
  if (container) {
    container.setAttribute('aria-hidden', 'false')
  }
  if (labelEl) {
    labelEl.textContent = label
  } else if (label) {
    toggleEl.textContent = label
  }
}

export function ariaContract(
  toggleEl,
  { label = '', labelEl = null, container = null }
) {
  toggleEl.setAttribute('aria-expanded', 'false')
  if (container) {
    container.setAttribute('aria-hidden', 'true')
  }
  if (labelEl) {
    labelEl.textContent = label
  } else if (label) {
    toggleEl.textContent = label
  }
}
