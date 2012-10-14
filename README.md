# Shimmy

Shimmy is a simple way to shim methods which will be made available later on a page on in a process. The standard use case is web applications which want heavy scripts to be available at the bottom of a page but need DOM ready or other event methods to be useable earlier (for backward compatability, plugins or HTML event attributes).

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/wwalser/Shimmy/master/dist/Shimmy.min.js
[max]: https://raw.github.com/wwalser/Shimmy/master/dist/Shimmy.js

In your web page:

```html
<html>
  <head>
    <script src="dist/Shimmy.min.js"></script>
    <script>
      //Shim jQuery's DOM ready shortcut
      Shimmy.shim('$');
      $(function(){
        //do something on DOM ready
      });
    </script>
  </head>
  <body>
    <!-- CONTENT OF THE PAGE -->
    <!-- Load actual jQuery -->
    <script src="jquery.js"></script>
    <script>
      //Replace the shim with true implementation. All previous calls to $
      //will be ran on the real jQuery with the same context and arguments.
      jQuery.noConflict();
      $.replace(jQuery);
    </script>
  </body>
</html>
```

## Examples
See the examples/ directory.

## Contributing
Take care to maintain the existing coding style. Add unit tests for any new functionality or regression tests for fixes. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

_Note that files in the "dist" directory are generated via grunt. Source code lives under lib/._

## Release History
0.1.0: Initial release for collaboration, testing and experimentation. API unstable.

## License
Copyright (c) 2012 Wesley Walser  
Licensed under the MIT license.
