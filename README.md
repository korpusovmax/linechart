# LineChart
Easy-to-use js library for building graphs using svg.
## Examples
<img src="images\demo_1.png" alt="demo1"/>
<img src="images\demo_2.png" alt="demo2"/>

## How to use
Just add linechart.js from 'src' directory to your project. And add this lines to your .html

```html
<div id="chart1"></div>

<script type="module" src="path/to/linechart.js"></script>
```

Now in your main.js you can create graph (don't forget to import linechart.js!)
```js
import { LineChart } from 'path/to/linechart.js'

let array = [8, 3, 7, 6, 9, 2];
let linechart_1 = new LineChart("chart1", 400, 200, array);
linechart_1.update();
```

Also you can explore some examples in 'tests' directory.