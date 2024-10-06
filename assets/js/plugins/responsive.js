function updateStyles() {
  let windowWidth = window.innerWidth;

  if (windowWidth <= 640) {
    document.documentElement.style.fontSize = '10px';
  } else if (windowWidth <= 1024) {
    document.documentElement.style.fontSize = '6.5px';
  } else if (windowWidth <= 1200) {
    let baseFontSize = windowWidth / 100 * .626;
    document.documentElement.style.fontSize = baseFontSize + 'px';
  } else if (windowWidth <= 1440) {
    let baseFontSize = windowWidth / 100 * .562999;
    document.documentElement.style.fontSize = baseFontSize + 'px';
  } else {
    let baseFontSize = (windowWidth / 100 * .520834);
    document.documentElement.style.fontSize = baseFontSize + 'px';
  }

  updateDynamicElements(parseFloat(document.documentElement.style.fontSize));
}

function updateDynamicElements(baseFontSize) {
  const container = document.querySelector('.container');
  if (!container) return;

  const elements = container.querySelectorAll('*');

  elements.forEach(element => {
    let styles = window.getComputedStyle(element);
    let fontSize = styles.getPropertyValue('font-size');
    if (fontSize.includes('rem-calc')) {
      let value = parseFloat(fontSize.replace('rem-calc(', '').replace('px)', ''));
      if (!isNaN(value)) {
        let remValue = (value / baseFontSize).toFixed(3);
        element.style.fontSize = remValue + 'rem';
      }
    }
  });
}

function remCalc(valuesInPx) {
  let windowWidth = window.innerWidth;
  let values = valuesInPx.split(' ').map(value => parseFloat(value));

  if (windowWidth <= 768) {
    let remValues = values.map(value => (value / 16).toFixed(3) + 'rem');
    return remValues.join(' ');
  } else {
    let baseFontSize = windowWidth <= 1440 ? windowWidth / 100 : (windowWidth / 100) * 1.2;
    let remValues = values.map(value => (value / baseFontSize).toFixed(3) + 'rem');
    return remValues.join(' ');
  }
}

window.onload = function() {
  updateStyles();
};

window.addEventListener('resize', function() {
  updateStyles();
});

document.addEventListener('DOMContentLoaded', function() {
  localStorage.setItem('applyRemCalc', 'true');
  updateStyles();
});
