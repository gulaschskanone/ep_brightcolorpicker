var $ = require('ep_etherpad-lite/static/js/rjquery').$; // use jQuery

exports.postAceInit = function (hook_name, args, cb) {
	var brightness;
   	if (clientVars.brightness){
   		if(typeof clientVars.brightness === 'object' 
   			&& between(clientVars.brightness[0],0.1,0.5)
   			&& between(clientVars.brightness[1],0.1,0.5)){
   	    	// range
   	        var min = Math.min(clientVars.brightness[0], clientVars.brightness[1]);
   	        var max = Math.max(clientVars.brightness[0], clientVars.brightness[1]); 
   	       	brightness = Math.floor((Math.random() * (max - min) + min) * 100) / 100;
   		}
   		else if(typeof clientVars.brightness === 'number' 
   			&& between(clientVars.brightness,0.1,0.5)){
   			// real number between [MAX|MIN]_BRIGHTNESS
   			brightness = clientVars.brightness;
   		}
   		else {
   			brightness = 0.25; // default
   		}
   	}
   	
	
	/**
	 * remove farbtastic
	 */
	// delete $.fn.farbtastic; // doesn't work
	// very dirty
	// TODO: improve the way to remove farbtastic
	$("#mycolorpicker").remove();
	$("#myuser").prepend( "<div id='colorpicker'></div>" );
	
	
	/**
	 * bind brightColorPicker plugin
	 */    
	$('#colorpicker').brightColorPicker({
		'brightness' : brightness,
		'callback' : function (color) {
			pad.myUserInfo.colorId = color;
			pad.notifyChangeColor(color);
			// paduserlist.renderMyUserInfo(); // doesn't work
			// dirty: copied rows from paduserlist.renderMyUserInfo()
			// TODO: run paduserlist.renderMyUserInfo()
			$("#myswatch").css({'background-color': color});
			if (browser.msie && parseInt(browser.version) <= 8) {
				$("li[data-key=showusers] > a").css({'box-shadow': 'inset 0 0 30px ' + color,'background-color': color});
		    }
		    else {
		       $("li[data-key=showusers] > a").css({'box-shadow': 'inset 0 0 30px ' + color});
		    }
		}
	});
	
	
	/**
	 * check chosen
	 */
	// remind color selection
	$(".brightColorPicker-colorPalette > div").filter(function(){
	    return $(this).css('background-color') === pad.myUserInfo.colorId;
	}).addClass('selected');
	
	// change on click
	$('.brightColorPicker-colorChoice').click( function (e){
		// remove "selected" classes
		$(".brightColorPicker-colorPalette > div").removeClass('selected');
		
		// add "selected" class
		$(this).addClass('selected');
	});
	
	
	
	/**
	 * toggle (open / close)
	 */
	$("#myswatch").click(function(){
		$('#colorpicker').brightColorPicker('toggle');
	});
	
	
	/**
	 * add cancel button
	 */
	var cancelButton = $("<a class='brightColorPicker-cancelButton' data-l10n-id='ep_brightcolorpicker.cancel'>Cancel</a>");
    cancelButton.click(function() {
    	$('#colorpicker').brightColorPicker('hide');
    });
    $(".brightColorPicker-colorPanel").append(cancelButton);

    
    /**
     *  helper
     */
    function between(x, min, max) {
    	  return x >= min && x <= max;
	}
	
};


