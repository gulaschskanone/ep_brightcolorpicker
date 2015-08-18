ep_brightcolorpicker
=======

Etherpad-Plugin that replace the farbtastic color picker with [jQuery Bright Color Picker Plugin](https://github.com/bmamlin/brightcolorpicker-jquery-plugin) as proposed in [issue #151](https://github.com/ether/etherpad-lite/issues/151).

* small amount of 40 quite bright selectable user colors (better readable)
* tested with EPL 1.5.7


# brightness level (settings.json) #
```
"ep_brightcolorpicker" : {
  "brightness" : 0.25                   // default; fix level (0.1 .. 0.5)
  // "brightness" : [_min_, _max_]	    // random level between min and max (0.1 .. 0.5)
}
```