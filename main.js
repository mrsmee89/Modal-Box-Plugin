(function($){
	$.fn.center = function(){
		return this.each(function(){
			var $this = $(this);
			$this.css({
				top: "50%",
				left: "50%",
				marginTop: -($this.outerHeight()/2),
				marginLeft: -($this.outerWidth()/2),
			})
		});
	}
	$.fn.simplePopup = function(options) {
		var glbStorage = {
			iniOverlay : true,
			body: $("body"),
			overlay : ""
		}
		var settings = $.extend(true,{
			overlay : true,
			event: "click",
			escape: true,
			speed: "",
			show : {
				animate: "fadeIn",
				speed: 400
			},
			hide : {
				animate: "fadeOut",
				speed: 400
			},
			overlay: {
				animate: "fade",
				speed: 400
			}
		},options);
		settings.event == "hover" ? settings.event = "mouseenter" : settings.event;
		if(settings.speed !== "") {
			$.each(settings,function(key,val){
				if(key == "speed") settings[key] == settings.speed;
				if(typeof val == "object") {
					for(var innerkey in val){
						if(innerkey === "speed") {
							val[innerkey] = settings.speed;
						}
					}
				}
			});
		}
		var count = 0;
		var methods = {
			init : function() {
				$('<div />', {
					"class" : "simplePopupOuterWrap",
					"data-index" : count++
				}).appendTo(glbStorage.body).append($(this).data("popUpHtml")).center()
				settings.overlay && glbStorage.iniOverlay && $("<div />", {
					"id" : "simplePopupOverlay"
				}).appendTo(glbStorage.body).click(methods.hide);
				glbStorage.iniOverlay ? glbStorage.iniOverlay = false : "";
				glbStorage.overlay == "" ? glbStorage.overlay = $("#simplePopupOverlay") : "";
			},
			show : function(){
				glbStorage.self = $('.simplePopupOuterWrap').eq($(this).data("simplePopup").index)[settings.show.animate](settings.show.speed);
				glbStorage.overlay[settings.overlay.animate == "fade" ? settings.overlay.animate + "In" : settings.overlay.animate](settings.overlay.speed);
			},
			hide : function() {
				if(glbStorage.overlay == "") return;
				glbStorage.overlay[settings.overlay.animate == "fade" ? settings.overlay.animate + "Out" : settings.overlay.animate](settings.overlay.speed);
				glbStorage.self[settings.hide.animate](settings.hide.speed);
			},
			escape: function(e) {
				var code = this.keyCode || this.which;
				if(code == 27) methods.hide();
			}
		}
		settings.escape && glbStorage.body.bind("keyup", function(e){methods.escape.call(e)});
		return this.each(function(i){
			var $this = $(this),
			data = $this.data('simplePopup');
             if(!$this.data('simplePopup')) {//initialize
             	!$this.find('.simplePopupHtml').length ? $this.wrapInner('<div class="simplePopupHtml" data-popUpId="'+i+'"/>') : $this.find('.simplePopupHtml').attr("data-popUpId", i)
             	$this.data("popUpHtml",$('[data-popUpId="'+i+ '"]'))
             	$this.data('simplePopup', {
	               target : $this,
	               index: i,
	               init: methods.init.call($this)
		         });
		          $this.bind(settings.event, methods.show);
             }
		});
	};
})(jQuery);