var gulp     = require('gulp');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var _        = require('underscore');
var elixir   = require('laravel-elixir');
var config   = elixir.config;

/*
 |----------------------------------------------------------------
 | ImageMin Processor
 |----------------------------------------------------------------
 |
 | This task will trigger your images to be processed using
 | imagemin processor.
 |
 | Minify PNG, JPEG, GIF and SVG images
 |
 */
elixir.extend('imagemin', function(options) {

    config.images = _.extend({
        folder: 'images',
        outputFolder: 'images'
    }, config.images || {});

    options = _.extend({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }, options);

    new elixir.Task('imagemin', function () {
        var paths = new elixir.GulpPaths()
            .src(config.get('assets.images.folder'))
            .output(config.get('public.images.outputFolder'));

        return gulp.src(paths.src.path)
            .pipe(changed(paths.output.path))
            .pipe(imagemin(options))
            .on('error', function(e) {
                new elixir.Notification().error(e, 'ImageMin Failed!');
                this.emit('end');
            })
            .pipe(gulp.dest(paths.output.path))
            .pipe(new elixir.Notification('ImageMin Complete!'))
    }).watch(
        [
            config.get('assets.images.folder') + '/**/*.jpg',
            config.get('assets.images.folder') + '/**/*.jpeg',
            config.get('assets.images.folder') + '/**/*.svg',
            config.get('assets.images.folder') + '/**/*.gif',
            config.get('assets.images.folder') + '/**/*.png'
        ]
    );
});
