var elixir = require('laravel-elixir');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var notify = require('gulp-notify');
var _ = require('underscore');
var utilities = require('laravel-elixir/ingredients/commands/Utilities');

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

    src = utilities.buildGulpSrc(src, baseDir, '**/*');

    options = _.extend({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }, options);

    gulp.task('imagemin', function() {
        return gulp.src(src)
            .pipe(imagemin(options))
            .pipe(gulp.dest(output || 'public/img'))
            .on('error', notify.onError({
                title: 'ImageMin Failed!',
                message: 'Failed to optimise images.',
                icon: __dirname + '/../laravel-elixir/icons/fail.png'
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
