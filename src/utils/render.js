export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;

    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const removeChild = (childComponent) => {
  const parent = childComponent.getElement().parentElement;
  parent.removeChild(childComponent.getElement());
};

export const appendChild = (place, childComponent) => {
  place.appendChild(childComponent.getElement());
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newChildElement = newComponent.getElement();
  const oldChildElement = oldComponent.getElement();

  const isEsistElements = !!(parentElement && newChildElement && oldChildElement);
  if (isEsistElements && parentElement.contains(oldChildElement)) {
    parentElement.replaceChild(newChildElement, oldChildElement);
  }
};
