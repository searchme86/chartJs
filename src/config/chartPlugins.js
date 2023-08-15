import { checkAndExitIfNullOrUndefined } from '../util/util.js';
import { colorScheme } from './colorColors.js';

const { verticalLineBackgroundColor, verticalLineColor } = colorScheme;

export const chartVerticalLine = {
  id: 'chartVerticalLine',
  afterDraw: function (chart) {
    if (chart.tooltip?._active?.length) {
      let indicator = chart.tooltip.getActiveElements();
      if (indicator.length > 0) {
        let lowerGraph = chart.tooltip.getActiveElements()[0].element;
        let upperGrapth = chart.tooltip.getActiveElements()[1].element;

        checkAndExitIfNullOrUndefined(lowerGraph, upperGrapth);

        let start__XCoordinate = Math.min(lowerGraph.x, upperGrapth.x);
        let start__YCoordinate = Math.min(lowerGraph.y, upperGrapth.y);

        let howFar__XCoordinate = Math.max(lowerGraph.x, upperGrapth.x);
        let howFar__YCoordinate = Math.max(lowerGraph.y, upperGrapth.y);

        let ctx = chart.ctx;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(start__XCoordinate, start__YCoordinate);
        ctx.lineTo(howFar__XCoordinate, howFar__YCoordinate);
        ctx.lineWidth = 1;
        ctx.strokeStyle = verticalLineColor;
        ctx.setLineDash([6, 6]);
        ctx.fillStyle = verticalLineBackgroundColor;
        ctx.stroke();
        ctx.restore();
      }
    }
  },
};
