var eejs = require("ep_etherpad-lite/node/eejs");
var settings = require('ep_etherpad-lite/node/utils/Settings');

exports.eejsBlock_scripts = function (hook_name, args, cb) {
	args.content = args.content + eejs.require("ep_brightcolorpicker/templates/scripts.html", {}, module);
	return cb();
};

exports.eejsBlock_styles = function (hook_name, args, cb) {
	args.content = args.content + eejs.require("ep_brightcolorpicker/templates/styles.html", {}, module);
	return cb();
};

exports.clientVars = function(hook, context, callback)
{
	// return the setting to the clientVars, sending the value
	if(settings.ep_brightcolorpicker){
		return callback({ "brightness": settings.ep_brightcolorpicker.brightness });
	}
	else {
		return callback({ "brightness": false });
	}
};