export const defaultData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Weekly Sales',
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor: [
        'rgba(255, 26, 104, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(0, 0, 0, 0.2)',
      ],
      borderColor: [
        'rgba(255, 26, 104, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0, 0, 0, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export const defaultOptionsStyle = {
  defaultLayOut: {
    padding: {
      left: 10, // 왼쪽 여백 조정
      right: 10, // 오른쪽 여백 조정
      top: 10, // 위쪽 여백 조정
      bottom: 10, // 아래쪽 여백 조정
    },
  },
  defaultScalesX: {
    x: {
      beginAtZero: true,
      grid: {
        display: false, // 수직선(격자무늬)를 숨깁니다.
      },
      ticks: {
        padding: 10,
      },
      //pointHover속성으로 인해 x와 y축으로 일부 호버가 가려지는 것을 offset:true를 통해 간격을 제공함
      //If true, extra space is added to the both edges and the axis is scaled to fit into the chart area. This is set to true for a bar chart by default.
      offset: true,
    },
  },
  defaultScalesY: {
    y: {
      beginAtZero: true,
      grid: {
        display: true, // 수평선(가로줄)을 표시합니다.
      },
      min: 0,
      max: 1000,
      ticks: {
        padding: 10,
        callback: (value, index, ticks) => {
          return value + '만';
        },
      },
      //pointHover속성으로 인해 x와 y축으로 일부 호버가 가려지는 것을 offset:true를 통해 간격을 제공함
      //If true, extra space is added to the both edges and the axis is scaled to fit into the chart area. This is set to true for a bar chart by default.
      offset: true,
    },
  },
};

const { defaultLayOut, defaultScalesX, defaultScalesY } = defaultOptionsStyle;

export const defaultOptions = {
  layout: {
    ...defaultLayOut,
  },
  scales: {
    ...defaultScalesX,
    ...defaultScalesY,
  },
};

const defaultPlugins = {
  legend: {
    display: true,
    position: 'bottom',
  },
};

const defaultConfig = {
  type: 'bar',
  data: defaultData,
  options: defaultOptions,
};

export const createConfig = (a, b) => {
  if (a && typeof a !== 'string') {
    return;
  }

  const ElemId = document.getElementById(a);

  let CanvasId = ElemId ?? 'myChart';
  let chartOptionsObj = b ?? defaultConfig;

  console.log('CanvasId', CanvasId);
  console.log('chartOptionsObj', chartOptionsObj);

  return { CanvasId, chartOptionsObj };
};
