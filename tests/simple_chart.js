import { LineChart } from './../src/linechart.js'

let array = [8, 3, 7, 6, 9, 2];
let linechart_1 = new LineChart("chart1", 400, 200, array);
linechart_1.params['stroke-linecap'] = 'round';
linechart_1.update();
