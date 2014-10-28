var elixir = require('laravel-elixir');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var notify = require('gulp-notify');
var _ = require('underscore');

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

elixir.extend('imagemin', function(src, output, options) {

    var config = this;

    var baseDir = config.assetsDir + 'img';

    src = this.buildGulpSrc(src, baseDir, '**/*');

    options = _.extend({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }, options);

    gulp.task('imagemin', function() {
        return gulp.src(src)
            .pipe(imagemin(options))
            .pipe(gulp.dest(output || 'public/img'))
            .pipe(notify({
                title: 'ImageMin Complete!',
                message: 'All images have be optimised.',
                icon: __dirname + '/../laravel-elixir/icons/pass.png'
            }));
    });

    this.registerWatcher('imagemin', [
        baseDir + '/**/*.png',
        baseDir + '/**/*.gif',
        baseDir + '/**/*.svg',
        baseDir + '/**/*.jpg',
        baseDir + '/**/*.jpeg'
    ]);

    return this.queueTask('imagemin');

});