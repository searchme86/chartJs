import { chartType, chartColor } from '../../../../config/chartConfig.js';
import {
  createXYCoordinateSets,
  createDiffArray,
} from '../../../../util/util.js';

const countDataSets = {
  standardsData: [
    '2022-10-20',
    '2022-10-21',
    '2022-10-22',
    '2022-10-23',
    '2022-10-24',
    '2022-10-25',
    '2022-10-26',
  ],
  blueData: [2, 4, 10, 4, 12, 20, 10],
  grayData: [10, 20, 2, 30, 25, 4, 2],
};

const { standardsData, blueData, grayData, linearData } = countDataSets;

const { chartTypeLine, chartTypeBar } = chartType;

let barBlueCoordinate = createXYCoordinateSets(standardsData, blueData);
let barGrayCoordinate = createXYCoordinateSets(standardsData, grayData);

const linearDiffDataSets = createDiffArray(grayData, blueData);
let linearDataCoordinate = createXYCoordinateSets(
  standardsData,
  linearDiffDataSets
);

export const count__data = {
  labels: standardsData,
  datasets: [
    {
      order: 1,
      label: '판매금액',
      ...chartTypeBar,
      data: barBlueCoordinate,
      backgroundColor: ['rgba(255, 26, 104, 0.2)'],
      borderColor: ['rgba(255, 26, 104, 1)'],
      borderWidth: 1,
    },
    {
      order: 1,
      label: '취소금액',
      ...chartTypeBar,
      data: barGrayCoordinate,
      backgroundColor: ['rgba(54, 162, 235, 0.2)'],
      borderColor: ['rgba(54, 162, 235, 1)'],
      borderWidth: 1,
    },
    {
      order: 0,
      label: '취소율',
      ...chartTypeLine,
      data: linearDataCoordinate,
      backgroundColor: ['rgba(0, 0, 0, 0.2)'],
      borderColor: ['rgba(0, 0, 0, 1)'],
      borderWidth: 1,
      borderDash: [5, 5],
      borderWidth: 1,
    },
  ],
};
