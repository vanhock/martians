export const isWebpSupported = () => {
  const elem = document.createElement('canvas');

  if (elem.getContext && elem.getContext('2d')) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  } else {
    return false;
  }
};

export const getValue = (value) => {
  if (!value) return value;
  return value.trim();
};

export const getFormData = (event) => {
  return [...event.target.elements].reduce((acc = {}, element) => {
    const name = element.getAttribute('name');
    if (name) {
      acc[name] = getValue(element.value);
    }
    return acc;
  }, {});
};
