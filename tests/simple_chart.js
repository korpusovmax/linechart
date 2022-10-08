import { LineChart } from './../src/linechart.js'

let array = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121];
let linechart_1 = new LineChart("chart1", 400, 200, array);
linechart_1.params['stroke-linecap'] = 'round';
linechart_1.update();
