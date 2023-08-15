import { count__data } from './count__data.js';

import { tooltipWithLinearGraph } from '../../../../plugins/newTooltip.js';

export const statistic__count = {
  type: 'bar',
  data: count__data,
  options: {
    barPercentage: 1.0,
    // categoryPercentage: 1.0,
    scales: {
      x: {
        // type: 'time',
        // time: {
        //   unit: 'day',
        // },
      },
      y: {
        beginAtZero: true,
      },
    },
    //
    plugins: {
      tooltip: {
        enabled: true,
        position: 'nearest',
        external: tooltipWithLinearGraph,
      },
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  },
};