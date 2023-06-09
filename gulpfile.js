let fetch = require("node-fetch");
const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');



gulp.task('css', function(done){
    console.log('minifying css...');
    gulp.src('./assests/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assests.css'));

     gulp.src('./assests/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assests'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assests'));
    done();
});


// gulp.task('js', function(done){
//     console.log('minifying js...');
//      gulp.src('./assests/**/*.js')
//     .pipe(uglify())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assests'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assests'));
//     done()
// });


gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assests/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assests'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assests'));
    done();
});


// empty the public/assests directory
gulp.task('clean:assests', function(done){
    del.sync('./public/assests');
    done();
});

gulp.task('build', gulp.series('clean:assests', 'css', 'js'), function(done){
    console.log('Building assets');
    done();
});