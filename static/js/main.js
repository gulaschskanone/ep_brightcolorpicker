var $ = require('ep_etherpad-lite/static/js/rjquery').$; // use jQuery



exports.postAceInit = function (hook_name, args, cb) {
	/**
	 * remove farbtastic
	 */
	// delete $.fn.farbtastic; // doesn't work
	// very dirty:
	$("#mycolorpicker").remove();
	$("#myuser").prepend( "<div id='colorpicker'></div>" );
	// TODO: improve the way to remove farbtastic
	
	/**
	 * bind brightColorPicker plugin
	 */
	$('#colorpicker').brightColorPicker({
		'brightness' : 0.25,
		// TODO: put brightness level into settings.json
		'callback' : function (color) {
			pad.myUserInfo.colorId = color;
			pad.notifyChangeColor(color);
			// paduserlist.renderMyUserInfo(); // doesn't work
			// dirty: copied rows from paduserlist.renderMyUserInfo()
			$("#myswatch").css({'background-color': pad.myUserInfo.colorId});
			if (browser.msie && parseInt(browser.version) <= 8) {
				$("li[data-key=showusers] > a").css({'box-shadow': 'inset 0 0 30px ' + pad.myUserInfo.colorId,'background-color': pad.myUserInfo.colorId});
		    }
		    else {
		       $("li[data-key=showusers] > a").css({'box-shadow': 'inset 0 0 30px ' + pad.myUserInfo.colorId});
		    }	
			// TODO: run paduserlist.renderMyUserInfo()
		}
	});
	
	$("#myswatch").click(function(){
		$('#colorpicker').brightColorPicker('toggle');
	});

	
};
