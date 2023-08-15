import { colorScheme } from './colorColors.js';

const { blueMain, bluePointHover, bluePointBorderColor, grayMain, grayHover } =
  colorScheme;

export const chartType = {
  chartTypeLine: {
    type: 'line',
  },
  chartTypeBar: {
    type: 'bar',
  },
};

export const chartAnimation = {
  type: {
    normalAnimation: {},
    hoverAnimation: {
      borderWidth: 2,
      fill: false,
      pointStyle: 'circleRot',
      pointRadius: 5,
      pointBorderWidth: 2,
      pointHoverRadius: 5,
      pointHoverBorderWidth: 14,
      pointBorderColor: bluePointBorderColor,
    },
  },
};

export const chartColor = {
  blue: {
    typeAColorMain: blueMain,
    typeAColorHover: bluePointHover,
  },
  gray: {
    typeBColorMain: grayMain,
    typeBColorHover: grayHover,
  },
};
