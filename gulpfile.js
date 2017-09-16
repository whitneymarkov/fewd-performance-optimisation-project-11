'use strict';

const gulp = require('gulp'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    spritesmith = require('gulp.spritesmith'),
    svgSprite = require('gulp-svg-sprite'),
    del = require('del');


// const options = {
//     src: 'src',
//     dist: 'dist'
// };

// Minify JS and maps
gulp.task('minifyScripts', function() {
    gulp.src('js/app.js')
        .pipe(maps.init())
        .pipe(babel({
                presets: ['env']
            }))
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('js'));
});

// CSS to Sass and maps
gulp.task('compileSass', function() {
    gulp.src('scss/application.scss')
        .pipe(maps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename('application.min.css'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('css'));
});

// Avatar spritesheet
gulp.task('compileAvatars', function() {
    let spriteData = gulp.src('img/avatars/*.jpg').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
    }));
    return spriteData.pipe(gulp.dest('img/avatars'));
});

// SVG spritesheet
let config = {
    mode: {
        symbol: {
            sprite: 'sprite.svg',
            dest: './'
        }
    },
    svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false
    }
};

gulp.task('compileSpritesheet', function() {
    gulp.src('img/svg/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('img/svg'));
});

gulp.task('watchFiles', function() {
    gulp.watch('scss/**/*.scss', ['compileSass']);
    gulp.watch('js/app.js', ['minifyScripts']);
});

gulp.task('clean', function() {
    del(['dist', 'css', 'js/app.min.js*', 'img/avatars/sprite.*', 'img/svg/sprite.svg']);
});

gulp.task('build', ['minifyScripts', 'compileSass', 'compileAvatars', 'compileSpritesheet'], function() {
    return gulp.src(['css/application.min.css', 'js/app.min.js', 'index.html', 'img/**'], {base: './'})
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles']);

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});
