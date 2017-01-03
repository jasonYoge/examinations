(function () {
	var docEl = document.documentElement;
	var tid;
	var setViewport = function (scale) {
		var $viewport = document.querySelector('meta[name="viewport"]');
		if ($viewport) {
			$viewport.setAttribute(
				'content',
				'initial-scale=' + scale +
				',maximum-scale=' + scale +
				',minimum-scale=' + scale +
				',user-scalable=no');
		} else {
			var metaViewport = '<meta name="viewport" content="initial-scale=' + scale +
				',maximum-scale=' + scale +
				',minimum-scale=' + scale +
				',user-scalable=no" />';
			document.write(metaViewport);
		}
	};

	var refreshRem = function (dpr) {
		var size = screen.width / 7.5;
		if (size > 60) {
			size = 60;
		}
		docEl.style.fontSize = size * dpr + 'px';
	};

	var updateViewport = function () {
		var devicePixelRatio = window.devicePixelRatio;
		var dpr = devicePixelRatio || 1;
		var scale = 1 / dpr;

		setViewport(scale);
		refreshRem(dpr);
	};

	window.addEventListener('resize', function () {
		clearTimeout(tid);
		tid = setTimeout(updateViewport, 300);
	}, false);

	window.addEventListener('pageshow', function (e) {
		if (e.persisted) {
			clearTimeout(tid);
			tid = setTimeout(updateViewport, 300);
		}
	}, false);

	updateViewport();
})();