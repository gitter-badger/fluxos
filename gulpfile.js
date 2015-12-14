//LAST EDIT: 14/12/2015
var gulp = require("gulp");
var typescript = require("gulp-typescript");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var merge = require('merge2');
var tsProject = typescript.createProject("tsconfig.json", {
  declaration: true //not working on gulp-typescript but ok...
});


gulp.task("src", function() {

  var tsResult = gulp.src(["src/**/*.ts", "src/**/**/*.ts"]) // instead of gulp.src(["src/**/*.ts", "src/**/**/*.ts"]) //lib, and lib/queries. //except lib.d.ts. Maybe for future use:  { base: './src/' }
    .pipe(typescript(tsProject));

  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done. 
    tsResult.dts.pipe(gulp.dest('./compiled')),
    tsResult.js.pipe(gulp.dest('./compiled')),
    tsResult.js.pipe(gulp.dest("../react-typescript-fullstack-skeleton/node_modules/fluxos/compiled/")),
    tsResult.dts.pipe(gulp.dest("../react-typescript-fullstack-skeleton/node_modules/fluxos/compiled/")),
	tsResult.js.pipe(gulp.dest("../ask-me-anything/node_modules/fluxos/compiled/")),
    tsResult.dts.pipe(gulp.dest("../ask-me-anything/node_modules/fluxos/compiled/")),
	tsResult.js.pipe(gulp.dest("../taglub/node_modules/fluxos/compiled/")),
    tsResult.dts.pipe(gulp.dest("../taglub/node_modules/fluxos/compiled/"))
  ]);
});


gulp.task('compat', function(callback) {
  return gulp.src([
      './node_modules/flux/dist/Flux.min.js',
      './compiled/lib/Helper.js',
      './compiled/lib/fluxosPayload.js',
      './compiled/lib/fluxosDispatcher.js',
      './compiled/lib/fluxosStore.js',
      './compiled/lib/fluxosContext.js',
      './compiled/index.js'
    ])
    // getBundleName creates a cache busting name
    .pipe(concat(require('./package.json').name + ".js"))
    .pipe(uglify())
    .pipe(gulp.dest('./compat'))
    .on('error', function(err) {
      console.log(err);
    });
});


gulp.task("compiledTypings", function() {

  return gulp.src(["compiled/**/*d.ts"])
    .pipe(gulp.dest("../react-typescript-fullstack-skeleton/node_modules/fluxos/compiled/"))
	.pipe(gulp.dest("../taglub/node_modules/fluxos/compiled/"))
	;
});


gulp.task("watchSrc", function() {
  gulp.watch("src/**/*.ts", ['src']);
});

gulp.task("watchCompiledTypings", function() {
  gulp.watch("compiled/**/*d.ts", ['compiledTypings']);
});

gulp.task("watchAll", ["watchSrc", "watchCompiledTypings"], function() {

});

gulp.task("default", ["src", "compat", "watchSrc"], function() {

});