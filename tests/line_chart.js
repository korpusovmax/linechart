import { LineChart } from './../src/linechart.js'

let array = [8, 3, 7, 6, 9, 2];
let linechart_1 = new LineChart("mychart", 400, 200, array);
linechart_1.params['segment'] = 'line';
linechart_1.params['stroke'] = '#E82D2D';
linechart_1.params['color'] = '#F24747';
linechart_1.params['stroke-linecap'] = 'square';
linechart_1.update();