# laravel-elixir-imagemin

This is a simple imagemin wrapper around Laravel Elixir. Add it to your Elixir-enhanced Gulpfile, like so:

## Install

```
npm install --save-dev laravel-elixir-imagemin
```

## Usage

### Example *Gulpfile*:

```javascript
var elixir = require('laravel-elixir');

require('laravel-elixir-imagemin');

elixir(function(mix) {
   mix.imagemin();
});
```

This will scan your `resources/assets/images` directory for all image files. Instead, if you only want to process a
different directory, you may do:

```javascript
mix.imagemin("./resources/assets/img");
```

Finally, if you'd like to output to a different directory than the default public/images, then you may override this as well.

```javascript
mix.imagemin("./resources/assets/img", "public/images/foo/bar/");
```

#### Advanced example

In third argument you could pass imagemin options.

```javascript
mix.imagemin("./resources/assets/img", "public/img", { optimizationLevel: 3, progressive: true, interlaced: true });
```