import {
  deleteElementsByClass,
  deleteAllChildElements,
  generateNewObj,
  mixObj,
  calculateDiffInfo,
  checkifExistedOrCreateTooltip,
} from '../util/util.js';

export const tooltipWithLinearGraph = (context) => {
  const { chart, tooltip } = context;
  const tooltipContainer = checkifExistedOrCreateTooltip(chart);
  const {
    opacity: tooltipOpacity,
    body: tooltipBody,
    title: titleXaxisArray,
  } = tooltip;

  if (tooltipOpacity === 0) {
    tooltipContainer.style.opacity = 0;
    return;
  }

  const {
    ctx,
    data: { datasets: graphData, labels: titleXAxisOfGrapthArray },
  } = chart;
  //

  console.log('chart', chart);

  //

  const tooltipList =
    tooltipContainer.getElementsByClassName('tooltip__list')[0];
  const titleXAxisArray = titleXAxisOfGrapthArray || [];

  //tooltip._active[0]이든 tooltip._active[1]이든, tooltip._active[i]의 값의 index는 모두 동일하다.
  let currentIndexHovered = tooltip._active[0].index;

  let result = generateNewObj(
    chart.data.datasets[0].data,
    chart.data.datasets[0].label,
    { unit: '원' }
  );

  let resulta = generateNewObj(
    chart.data.datasets[1].data,
    chart.data.datasets[1].label,
    { unit: '건' }
  );

  let www = mixObj(result, resulta);

  let yAxisDataArrayHovered = www[currentIndexHovered];

  let { diff, unit } = calculateDiffInfo(result, resulta, currentIndexHovered);

  // "delete-me" 클래스를 가진 요소들을 모두 삭제함
  deleteElementsByClass('toolTip__title');
  deleteElementsByClass('offscreen');
  // // // 자식 요소들을 모두 삭제함
  deleteAllChildElements(tooltipList);

  // ==============add new children==============
  //리스트 부분 추가
  //마우스 호버한 특정 그래프 데이터에 해당하는 y축 데이터
  yAxisDataArrayHovered.forEach((eachYaxisData, i) => {
    const { label, y: yAxisValue, unit } = eachYaxisData;

    const tooltipLi = document.createElement('li');
    tooltipLi.classList.add('tooltip__Item');

    //판매금액, 유입수
    const tooltipGraphTitle = document.createElement('strong');
    tooltipGraphTitle.classList.add('tooltip__graphTitle');
    const tooltipGraphTitleText = document.createTextNode(label);
    tooltipGraphTitle.appendChild(tooltipGraphTitleText);

    //숫자
    const tooltipContent = document.createElement('span');
    tooltipContent.classList.add('tooltip__graphValue');
    const tooltipItemValue = document.createTextNode(`${yAxisValue}${unit}`);
    tooltipContent.appendChild(tooltipItemValue);

    tooltipLi.appendChild(tooltipGraphTitle);
    tooltipLi.appendChild(tooltipContent);

    tooltipList.appendChild(tooltipLi);
  });

  // 돔 추가
  const moreLi = document.createElement('li');
  moreLi.classList.add('tooltip__Item');

  const tooltipGraphTitle = document.createElement('strong');
  tooltipGraphTitle.classList.add('tooltip__graphTitle');
  const tooltipGraphTitleText = document.createTextNode('유입당 판매율');
  tooltipGraphTitle.appendChild(tooltipGraphTitleText);

  const tooltipContent = document.createElement('span');
  tooltipContent.classList.add(
    'tooltip__graphValue',
    'tooltip__graphValue--blue'
  );

  const tooltipItemValue = document.createTextNode(`+${diff}${unit}`);
  tooltipContent.appendChild(tooltipItemValue);

  moreLi.appendChild(tooltipGraphTitle);
  moreLi.appendChild(tooltipContent);
  tooltipList.appendChild(moreLi);

  //새롭게 내용을 추가함
  //타이틀 부분 추가
  const tooltipStrong = document.createElement('strong');
  tooltipStrong.classList.add('offscreen');
  const tooltipTitle = document.createTextNode(
    `x축, ${titleXAxisArray[currentIndexHovered]}의 툴팁내용.`
  );
  tooltipStrong.appendChild(tooltipTitle);
  tooltipContainer.insertAdjacentElement('afterbegin', tooltipStrong);

  tooltipContainer.style.opacity = 1;

  // ==============positioning of the tooltip.==============
  tooltipContainer.style.left = tooltip.caretX + 'px';
  tooltipContainer.style.top = `${
    tooltip.dataPoints[0].element.y -
    tooltipContainer.getBoundingClientRect().height -
    16
  }px`;
  //   =========================== caret ===========================
  // 오직 차트의 갯수가 2개일 경우에만 실행되도록 함
  if (chart.data.datasets?.length >= 2 && tooltip._active?.length >= 2) {
  } else {
    console.log('그래프가 1개만 존재합니다.');
  }
};
