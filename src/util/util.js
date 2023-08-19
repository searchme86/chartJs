//기존의 타이틀을 지우다.
export const deleteElementsByClass = (className) => {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
};

// 자식 요소를 모두 삭제하는 함수
export const deleteAllChildElements = (parentElement) => {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
};

//
export const generateNewObj = (arr, arrayDataLabel, obj) => {
  if (!arr.length) {
    new Errow('배열에 값이 없습니다.');
  }

  let result;
  result = arr.map((item) => ({
    label: arrayDataLabel,
    ...item,
    ...obj,
  }));

  return result;
};

//
export const mixObj = (dataA, dataB) => {
  if (!dataA || !dataB) {
    return;
  }
  let result = dataA.map((something, index) => {
    let wow = [{ ...something }, { ...dataB[index] }];
    return wow;
  });
  return result;
};

//
export const calculateDiffInfo = (dataA, dataB, hoverIndex) => {
  if (!dataA || !dataB) {
    return;
  }
  let calculateDiff = dataA.map((dd, index) => {
    let aa = { diff: Math.abs(dd.y - dataB[index].y), unit: '%' };
    return aa;
  });

  return calculateDiff[hoverIndex];
};

export const checkifExistedOrCreateTooltip = (chart) => {
  const canvasContainer = chart.canvas.parentNode;
  let tooltipContainer = canvasContainer.querySelector('div');
  if (!tooltipContainer) {
    tooltipContainer = document.createElement('div');
    tooltipContainer.classList.add('box__tooltip-bubble');

    const tooltipList = document.createElement('ul');
    tooltipList.classList.add('tooltip__list');

    tooltipContainer.appendChild(tooltipList);
    canvasContainer.appendChild(tooltipContainer);
  }
  return tooltipContainer;
};

export const checkAndExitIfNullOrUndefined = (...args) => {
  for (const arg of args) {
    if (arg === null || arg === undefined || arg === ' ') {
      console.log(
        '전달한 값 중에 null이거나 undefined 혹은 값이 전달되지 않았습니다.'
      );
      return;
    }
  }
};

export const createXYCoordinateSets = (dataArrayA, dataArrayB) => {
  checkAndExitIfNullOrUndefined(dataArrayA, dataArrayB);

  if (dataArrayA.length !== dataArrayB.length) {
    console.log('입력한 배열의 요소 갯수가 일치하지 않습니다.');
    return;
  }

  let result = dataArrayA.map((item, index) => {
    return {
      x: item,
      y: dataArrayB[index],
    };
  });

  return result;
};

export const createDiffArray = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new Error('모든 인자의 값은 배열이어야 합니다.');
  }

  if (a.length !== b.length) {
    throw new Error('모든 배열의 요소 갯수를 일치시켜주세요');
  }

  const c = [];
  for (let i = 0; i < a.length; i++) {
    const diff = Math.abs(a[i] - b[i]);
    const roundedDiff = Math.floor(diff);
    c.push(roundedDiff);
  }

  return c;
};
