var $ = require('ep_etherpad-lite/static/js/rjquery').$; // use jQuery

exports.postAceInit = function (hook_name, args, cb) {
	var brightness = clientVars.brightness;
	
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
			
			// copied from pad_userlist.js
			var newColor = color;
		    var parts = newColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		    // parts now should be ["rgb(0, 70, 255", "0", "70", "255"]
		    if (parts) {
		      delete (parts[0]);
		      for (var i = 1; i <= 3; ++i) {
		          parts[i] = parseInt(parts[i]).toString(16);
		          if (parts[i].length == 1) parts[i] = '0' + parts[i];
		      }
		      var newColor = "#" +parts.join(''); // "0070ff"
		    }
		    
			pad.notifyChangeColor(newColor);
	        pad.myUserInfo.globalUserColor = newColor;
	        
			// paduserlist.renderMyUserInfo();
			// doesn't work
			// dirty: copied from paduserlist.renderMyUserInfo()
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
	var cancelButton = $("<a class='brightColorPicker-cancelButton'>X</a>");
    cancelButton.click(function() {
    	$('#colorpicker').brightColorPicker('hide');
    });
    $(".brightColorPicker-colorPanel").append(cancelButton);

    

	
};


