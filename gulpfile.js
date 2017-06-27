/**
 * Created by Sergey on 14.06.2016.
 */

// npm i gulp gulp-sass gulp-concat gulp-uglifyjs gulp-cssnano gulp-rename browser-sync gulp-scss -f

// gulp watch для запуска

var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglifyjs'),
    cssnano     = require('gulp-cssnano'),
    rename      = require('gulp-rename'),
    scss        = require("gulp-scss");

//SASS
gulp.task('sass', function(){
    return gulp.src('scss/default.scss')
    //return gulp.src('sass/**/*.sass')
    // return gulp.src('sass/**/*.+(scss|sass)') //
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream: true}))
});


//SCSS
/*gulp.task("scss", function () {
    gulp.src(
        "home/scss/!**!/!*.scss"
    ).pipe(scss(
        {"bundleExec": true}
    )).pipe(gulp.dest("home/static/css"));
});*/

//
gulp.task('scripts', function(){
    return gulp.src([
        'js/common.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
});

//css
gulp.task('css-libs', ['sass'], function(){
    return gulp.src('css/default.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('css'));
});

//browser-sync
gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

//watcher SASS
gulp.task('watch', [/*'browser-sync',*/'css-libs', 'scripts', 'sass'], function(){
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('**/*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});