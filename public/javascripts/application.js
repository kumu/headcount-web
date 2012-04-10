(function() {
	function initialize(data) {
		var $target = $('#headcount');
		
		var guide = new RenderGuide();
		guide.add(new Series('users'));
		guide.add(new Series('accounts'));
		guide.add(new Series('workspaces'));
		guide.add(new Series('elements'));
		guide.add(new Series('connections'));
		
		var view = new MorrisView($target);
		view.render(data, guide);
	}
	
	function Series(key, options) {
		options = options || {};
		
		this.key = key;
		this.label = options.label;
		this.color = options.color;
	}
	
	function Palette(colors) {
		this.colors = colors || ['black', 'blue', 'purple', 'red', 'orange', 'yellow', 'green', 'brown'];
		this.reset();
	}
	
	Palette.prototype.reset = function() {
		this.index = 0;
	}
	
	Palette.prototype.next = function() {
		if (this.index > this.colors.length - 1)
			this.index = 0;
		
		return this.colors[this.index++];
	}
	
	function RenderGuide() {
		this.series = _([]);
		this.palette = new Palette();
	}
	
	RenderGuide.prototype.add = function(series) {
		this.series.push(series);
		return this;
	}
	
	RenderGuide.prototype.keys = function() {
		return this.series.pluck('key');
	}
	
	RenderGuide.prototype.labels = function() {
		return this.series.map(function(series) {
			return series.label || series.key.titleize();
		});
	}
	
	RenderGuide.prototype.colors = function() {
		var palette = this.palette;
		
		return this.series.map(function(series) {
			return series.color || palette.next()
		});
	}
	
	function MorrisView($el) {
		this.el = $el[0];
	}
	
	MorrisView.prototype.render = function(data, guide) {
		console.log(guide.keys());
		console.log(guide.labels());
		
		Morris.Line({
		  element: this.el,
		  data: data,
		  xkey: 'timestamp',
		  ykeys: guide.keys(),
		  labels: guide.labels(),
		  lineColors: guide.colors(),
		  lineWidth: 2,
		  pointSize: 0
		});
	}
	
	// expose the api
	window.Headcount = {
		initialize: initialize
	};
})();