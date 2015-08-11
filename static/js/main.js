var $ = require('ep_etherpad-lite/static/js/rjquery').$; // use jQuery



exports.postAceInit = function (hook_name, args, cb) {
	// delete $.fn.farbtastic;
	// $(".farbtastic").remove();
	$("#mycolorpicker").remove();
	$("#myuser").prepend( "<div id='colorpicker'></div>" );
	
	
	$('#colorpicker').brightColorPicker({
		'brightness' : 0.25,
		'callback' : function (color) {
			pad.myUserInfo.colorId = color;
			pad.notifyChangeColor(color);
			$("#myswatch").css({'background-color': pad.myUserInfo.colorId});
		    
			if (browser.msie && parseInt(browser.version) <= 8) {
				$("li[data-key=showusers] > a").css({'box-shadow': 'inset 0 0 30px ' + pad.myUserInfo.colorId,'background-color': pad.myUserInfo.colorId});
		    }
		    else
		    {
		       $("li[data-key=showusers] > a").css({'box-shadow': 'inset 0 0 30px ' + pad.myUserInfo.colorId});
		    }	
		}
	});
	
	$("#myswatch").click(function(){
		$('#colorpicker').brightColorPicker('toggle');
	});

	
};
