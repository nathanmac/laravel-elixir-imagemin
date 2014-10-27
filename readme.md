## Usage

This is a simple imagemin wrapper around Laravel Elixir. Add it to your Elixir-enhanced Gulpfile, like so:

```
var elixir = require('laravel-elixir');

require('laravel-elixir-imagemin');

elixir(function(mix) {
   mix.imagemin();
});
```

This will scan your `resources/assets/img` directory for all image files. Instead, if you only want to process a single image, you may do:

```
mix.imagemin("bootstrap.png");
```

Finally, if you'd like to output to a different directory than the default public/css, then you may override this as well.

```
mix.imagemin("bootstrap.png", "public/img/foo/bar/");
```
