class LineChart {
  constructor(element_id, width, height, array) {
    this.id = element_id;
    this.div = document.getElementById(this.id);
    this.div.innerHTML += '<svg id="' + element_id + '_svg" width="' + width + '" height="' + height + '" xmlns="http://www.w3.org/2000/svg"></svg>';
    this.svg = document.getElementById(this.id + '_svg');
    this.svg.innerHTML += '<path id="' + element_id + '_background_path" fill="transparent"></path><path id="' + element_id + '_path" fill="transparent"></path><defs id="' + element_id + '_defs"></defs>';
    this.path = document.getElementById(this.id + '_path');
    this.bpath = document.getElementById(this.id + '_background_path');
    this.defs = document.getElementById(this.id + '_defs');
    this.data = array.slice(); // copy array
    this.params = {
      'max_value': Math.max.apply(null,  this.data),
      'width': width,
      'height': height,
      'segment': 'curve',
      'padding': 8,
      'stroke': '#0066DE',
      'color': '#2F8FFF',
      'stroke-width': '8',
      'gradient': true,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    }
    this.generator = new Generator(this);
  }

  update() {
    this.generator.create_styles(this.params);
    this.generator.normalyze();
    this.generator.draw();
  }
}

class Generator {
  constructor(line_chart) {
    this.id = line_chart.id;
    this.params = line_chart.params;
    this.data = line_chart.data;
    this.svg_path = line_chart.path;
    this.bsvg_path = line_chart.bpath;
    this.defs = line_chart.defs;
  }

  make_gradient() {
    this.defs.innerHTML += '<linearGradient id="gradient_' + this.id + '" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="' + this.params['color'] +'"/><stop offset="100%" stop-color="' + this.params['color'] + '" stop-opacity="0"/></linearGradient>';
    this.bsvg_path.setAttribute('fill', 'url(#gradient_' + this.id + ')');
  }

  apply_styles(path) {
    path.setAttribute('stroke', this.params['stroke']);
    path.setAttribute('stroke-width', this.params['stroke-width']);
    path.setAttribute('stroke-linejoin', this.params['stroke-linejoin']);
    path.setAttribute('stroke-linecap', this.params['stroke-linecap']);
  }

  create_styles() {
    this.apply_styles(this.bsvg_path);
    this.apply_styles(this.svg_path);
    this.bsvg_path.setAttribute('fill', this.params['color']);
    this.bsvg_path.setAttribute('stroke', 'transparent');

    if (this.params['gradient'] == true) {
      this.make_gradient();
    }
  }

  normalyze() {
    // Normalyzing data. Diapason from 0 to 1
    for (var i = 0; i < this.data.length; i++) {
      this.data[i] = (this.params['max_value']-this.data[i])/this.params['max_value'];
    }
    console.log(this.data);
  }

  //TODO: rename to 'render'
  //TODO: side hints
  //TODO: side arrows
  draw() {
    var count = this.data.length;
    var padding = this.params['padding'];
    var height = this.params['height']-padding*2
    var block_width = (this.params['width']-padding*2)/(count-1)/2;
    //TODO: segment type - block
    // Move to (0, value[1])
    var path_str = 'M ' + padding + ' ' + (this.data[0]*height+parseInt(padding)) + ' ';
    var background_path_str = 'M ' + padding + ' ' + (height+parseInt(padding)+parseInt(this.params['stroke-width'])/2) + ' '
    + 'L ' + padding + ' ' + (this.data[0]*height+parseInt(padding)) + ' ';
    // Drawing bezier curves
    for (var i = 0; i < count-1; i++) {
    var changes = '';

        if (this.params['segment'] == 'curve') {
        changes = 'C ' + (block_width*(2*i+1)+parseInt(padding)) + ' ' + (this.data[i]*height+parseInt(padding)) + ' '
        + (block_width*(2*i+1)+parseInt(padding)) + ' ' + (this.data[i+1]*height+parseInt(padding)) + ' '
        + (block_width*(2*(i+1))+parseInt(padding)) + ' ' + (this.data[i+1]*height+parseInt(padding)) + ' ';
        } else if (this.params['segment'] == 'line') {
        changes = 'L ' + (block_width*(2*(i+1))+parseInt(padding)) + ' ' + (this.data[i+1]*height+parseInt(padding)) + ' ';
        }
        path_str += changes;
        background_path_str += changes;
    }

    // TODO: if data.len == 1 (dot)
    // Apply changes
    this.svg_path.setAttribute('d', path_str);
    if (this.data.length != 1) {
        this.bsvg_path.setAttribute('d', background_path_str + 'L ' + (block_width*(2*(count-1))+parseInt(padding)) + ' ' + (height+parseInt(padding)+parseInt(this.params['stroke-width'])/2) + ' Z');
    }
  }
}

export { LineChart }
