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

This will scan your `resources/assets/images` directory for all image files.

### Changing the default image directories

If you want to process a different image directory, you can update your Elixir config by either:

#### Defining `elixir.config.images` in your *Gulpfile*

You can define `elixir.config.images` in your `gulpfile.js` like so:

```javascript
var elixir = require('laravel-elixir');

require('laravel-elixir-imagemin');

elixir.config.images = {
    folder: 'img',
    outputFolder: 'img'
};

elixir(function(mix) {
   mix.imagemin();
});
```

#### Setting `config.images` in an `elixir.json` file

You can create an [`elixir.json`](https://github.com/laravel/elixir/blob/dfd6655537eb3294a4c71e826cd0e8a6f6b2108b/index.js#L50-L67)
file in your project root to modify Elixir's default settings.

```json
{
    "images": {
        "folder": "img",
        "outputFolder": "img"
    }
}
```

#### Upgrading from the old syntax

If you're upgrading from the old syntax, where you defined custom directories like so:

```javascript
mix.imagemin("./resources/assets/img", "public/images/foo/bar/");
```

All you have to do is:

- Remove the first two parameters, then
- Follow the instructions for ["Changing the default image directories"](#changing-the-default-image-directories)

**Note**: You don't define the full path anymore. Instead of `resources/assets/img` you simply use `img`, because
laravel-elixir-imagemin will look inside your `assets` and `public` directories (or whatever else you may have
configured).

### Custom imagemin options

You can override the default imagemin options by passing in an options object like so:

```javascript
mix.imagemin({
    optimizationLevel: 3,
    progressive: true,
    interlaced: true
});
```

Available imagemin options are listed [here in the gulp-imagemin readme](https://github.com/sindresorhus/gulp-imagemin#imageminoptions).
