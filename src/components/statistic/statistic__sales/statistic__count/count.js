import { count__data } from './count__data.js';
import { tooltipWithLinearGraph } from '../../../../plugins/tooltip__lineBar.js';

export const statistic__count = {
  type: 'bar',
  data: count__data,
  options: {
    barPercentage: 1.0,
    scales: {
      x: {},
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
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
