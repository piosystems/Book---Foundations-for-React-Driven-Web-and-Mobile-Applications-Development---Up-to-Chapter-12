const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

const paths = {
    styles: {
      src: 'src/chapter12/bulma/**/*.css',
      dest: 'build/chapter12/bulma/'
    },
    //scripts: {
    //  src: 'src/scripts/**/*.js',
    //  dest: 'assets/scripts/'
   // }
  };

/*
gulp.task('minify-css', () => {
    return gulp.src(paths.styles.src)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({
            basename: 'book-example',
            suffix: '.min'
          }))
        .pipe(gulp.dest(paths.styles.dest));
});
*/
const minifyCSS = () => {
  return gulp.src(paths.styles.src)
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(rename({
          basename: 'book-example',
          suffix: '.min'
        }))
      .pipe(gulp.dest(paths.styles.dest));
};

exports.default = minifyCSS