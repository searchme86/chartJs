import {
  chartAnimation,
  chartType,
  chartColor,
} from '../../../../config/chartConfig.js';
import { createXYCoordinateSets } from '../../../../util/util.js';

const dashboardDataSets = {
  daily_timeLine: [
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
    '24:00',
  ],
  sales: [
    100, 0, 0, 0, 0, 0, 0, 0, 150, 200, 300, 240, 250, 260, 280, 310, 330, 350,
    350, 300, 280, 150, 100, 100,
  ],
  incoming: [
    0, 0, 0, 0, 0, 0, 0, 0, 20, 50, 20, 140, 110, 140, 90, 40, 0, 40, 90, 150,
    200, 250, 300, 350,
  ],
};

const { daily_timeLine, sales, incoming } = dashboardDataSets;
const { chartTypeLine } = chartType;
const {
  type: { hoverAnimation },
} = chartAnimation;
const {
  blue: { typeAColorMain, typeAColorHover },
  gray: { typeBColorMain, typeBColorHover },
} = chartColor;

let salesCoordinate = createXYCoordinateSets(daily_timeLine, sales);
let incomingCoordinate = createXYCoordinateSets(daily_timeLine, incoming);

export const dashboard__data = {
  datasets: [
    {
      ...hoverAnimation,
      ...chartTypeLine,
      label: '판매금액',
      data: salesCoordinate,
      borderColor: typeAColorMain,
      backgroundColor: typeAColorMain,
      pointBackgroundColor: typeAColorMain,
      pointHoverBackgroundColor: typeAColorMain,
      pointHoverBorderColor: typeAColorHover,
    },
    {
      ...hoverAnimation,
      ...chartTypeLine,
      data: incomingCoordinate,
      label: '유입수',
      borderColor: typeBColorMain,
      backgroundColor: typeBColorMain,
      pointBackgroundColor: typeBColorMain,
      pointHoverBackgroundColor: typeBColorMain,
      pointHoverBorderColor: typeBColorHover,
    },
  ],
};
