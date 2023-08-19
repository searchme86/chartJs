import {
  deleteElementsByClass,
  deleteAllChildElements,
  generateNewObj,
  mixObj,
  calculateDiffInfo,
  checkifExistedOrCreateTooltip,
} from '../util/util.js';

/**
 * chart.js의 plugin으로 사용되는 함수는, 일반함수의 콜백함수와 같다고 생각합니다.
 * chart.js의 plugin으로 바인딩 되는 함수는 chart.js에 제공하는 chart 컨텍스트 정보를 받아서 각 차트의 데이터를 접근할 수 있습니다.
 * tooltipWithLinearGraph 함수는 chartjs에서 제공하는 정보를 바탕으로 차트 정보를 가지고 툴팁을 생성하는 커스텀 함수입니다.
 * * */
export const tooltipWithLinearGraph = (context) => {
  const { chart, tooltip } = context;
  const tooltipContainer = checkifExistedOrCreateTooltip(chart);
  const {
    opacity: tooltipOpacity,
    body: tooltipBody,
    title: titleXaxisArray,
  } = tooltip;

  /**
   * 툴팁은 초기에 보이지 않기 위해, opacity를 0으로 초기화 시킵니다.
   * 매번 함수가 초기화되고 실행될때, 툴팁의 opacity가 0으로 만들도록 합니다.
   * * */

  if (tooltipOpacity === 0) {
    tooltipContainer.style.opacity = 0;
    return;
  }

  /**
   * 오직 차트의 갯수가 2개일 경우에만 실행되도록 분기처리 하였습니다.
   * 툴팁과 차트 사이의 vertical line은 오직 두 개의 차트로만 보여져야 하기 때문에, data의 length를 2개로 한정해야 하기 때문입니다.
   * * */
  if (chart.data.datasets?.length >= 2 && tooltip._active?.length >= 2) {
    const {
      ctx,
      data: { datasets: graphData, labels: titleXAxisOfGrapthArray },
    } = chart;

    const tooltipList =
      tooltipContainer.getElementsByClassName('tooltip__list')[0];
    const titleXAxisArray = titleXAxisOfGrapthArray || [];

    /**
     * tooltip._active[0]이든 tooltip._active[1]이든, tooltip._active[i]의 값의 index는 모두 동일합니다.
     * * */
    let currentIndexHovered = tooltip._active[0].index;

    /**
     * 차트1에 해당하는 라벨과, 데이터, 그리고, 그 데이터를 보여주는 단위를 하나의 객체로 만듭니다.
     * * */
    let result = generateNewObj(
      chart.data.datasets[0].data,
      chart.data.datasets[0].label,
      { unit: '원' }
    );

    /**
     * 차트2에 해당하는 라벨과, 데이터, 그리고, 그 데이터를 보여주는 단위를 하나의 객체로 만듭니다.
     * * */
    let resulta = generateNewObj(
      chart.data.datasets[1].data,
      chart.data.datasets[1].label,
      { unit: '원' }
    );

    /**
     * 위에서 만든 차트1과 차트2의 데이터를 하나의 객체로 만듭니다.
     * 이유는, forEach와 같이 데이터를 순환해 돔에 렌더링 하기 위해서 입니다.
     * * */
    let www = mixObj(result, resulta);

    /**
     * chartjs에 마우스를 호버할 경우, 호버한 인덱스(index)정보를 chartjs에서 구할 수 있습니다.
     * 현재 호버한 인덱스에 해당하는 차트의 정보를 얻기 위해, 객체에 해당 인덱스에 맞는 값을 구합니다.
     * * */
    let yAxisDataArrayHovered = www[currentIndexHovered];

    /**
     * 차트1과 차트2의 차이(diff)에 해당하는 데이터셋을 만들기 위해 새로운 객체를 만듭니다.
     * diff객체를 만들기 위해, 기존 객체의 데이터를 활용합니다.
     * * */
    let { diff, unit } = calculateDiffInfo(
      result,
      resulta,
      currentIndexHovered
    );

    /**
     * 새로 렌더링되는 돔을 보여주기 위해서는, 기존 돔을 삭제하기 위해,
     * 이전의 돔을 모두 제거합니다.
     * "delete-me" 클래스를 가진 모든 요소들을 삭제합니다.
     *
     * deleteAllChildElements : 모든 자식요소들을 삭제하는 함수를 import해서 tooltipList를 삭제합니다.
     * * */

    deleteElementsByClass('toolTip__title');
    deleteElementsByClass('offscreen');
    deleteAllChildElements(tooltipList);

    /**
     * *add new children
     * 현재 마우스 호버한 데이터를 보여주기 위해서는, 이전에 생성된 아이템을 삭제하기 위해, 이전에 돔을 삭제했습니다.
     * 이제는 마우스 호버한 그 데이터를 보여주기 위해, 마우스 호버한 인덱스에 해당 아이템을 추가(add)합니다.
     * 리스트 부분을 추가하는 것으로, 마우스 호버한 특정 그래프에 해당하는 y축 데이터를 추가합니다.
     */

    yAxisDataArrayHovered.forEach((eachYaxisData, i) => {
      const { label, y: yAxisValue, unit } = eachYaxisData;

      const tooltipLi = document.createElement('li');
      tooltipLi.classList.add('tooltip__Item');

      /**
       *
       * 차트1과 차트2에 해당하는 데이터를 돔에 add 합니다.
       */
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
    const tooltipGraphTitleText = document.createTextNode('취소율');
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

    /**
     * 툴팁이 보이도록 opacity에 1을 줍니다.
     */

    tooltipContainer.style.opacity = 1;

    /**
     * *positioning of the tooltip(caret)
     * 생성한 툴팁의 위치를 지정합니다.
     * 차트의 특정 데이터 포인트를 마우스 호버 할 경우, 생성한 툴팁이 어디에 위치 할 것인지 value를 계산합니다.
     */
    tooltipContainer.style.left = tooltip.caretX + 'px';
    tooltipContainer.style.top = `${
      tooltip.dataPoints[0].element.y -
      tooltipContainer.getBoundingClientRect().height -
      16
    }px`;
  } else {
    console.log('그래프가 1개만 존재합니다.');
  }
};
