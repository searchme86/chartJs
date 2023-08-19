import { defaultOptions } from '../../../../config/chartDefaultConfig.js';
import { dashboard__data } from './dashboard__data.js';
import { chartVerticalLine } from '../../../../config/chartPlugins.js';

import { externalTooltipHandler } from '../../../../plugins/tooltip__lineVertical.js';

export const statistic__dashboard = {
  data: dashboard__data,
  plugins: [chartVerticalLine],
  options: {
    ...defaultOptions,
    plugins: {
      tooltip: {
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
      },
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    interaction: {
      mode: 'index',
    },
  },
};
