ep_brightcolorpicker
=======

Etherpad-Plugin that replaces the build-in farbtastic color picker with [jQuery Bright Color Picker Plugin](https://github.com/bmamlin/brightcolorpicker-jquery-plugin) as proposed in [issue #151](https://github.com/ether/etherpad-lite/issues/151).

* customizable brightness level (HSV/HSB color model)
* customizable amount of color columns (results in color matrix of *value x 5*)

![view ep_brightcolorpicker in action](https://raw.githubusercontent.com/gulaschskanone/ep_brightcolorpicker/master/static/image/ep_brightcolorpicker.png)


## brightness level (settings.json) ##
```
"ep_brightcolorpicker" : {
  "brightness" : 0.25           // default; brightness level (0 .. 1)
  "columns" : 6	    			// default; columns of color matrix (1 .. 10)
}
```

## sources ##
* [bmamlin's jQuery Bright Color Picker Plugin](https://github.com/bmamlin/brightcolorpicker-jquery-plugin)