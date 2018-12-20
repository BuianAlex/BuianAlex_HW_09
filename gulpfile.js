var gulp = require('gulp'), // Подключаем Gulp
	sass = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync = require('browser-sync'), // Подключаем Browser Sync
	concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del = require('del'), // Подключаем библиотеку для удаления файлов и папок
	babel = require('gulp-babel'),
	cache = require('gulp-cache'), // Подключаем библиотеку кеширования
	autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
	rigger = require('gulp-rigger'),
	imagemin = require('gulp-imagemin');


const createBrowserSync  = function(cd){
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'src' // Директория для сервера - src
		},
		notify: false // Отключаем уведомления
	});
	cd();
}



const createCss = function (cd) {
	gulp.src('src/sass/**/*.scss') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('src/css')) // Выгружаем результата в папку src/css
		.pipe(browserSync.reload({ stream: true })) // Обновляем CSS на странице при изменении
	cd();
}

const minCss = function (cd) {
	gulp.src('src/css/main.css') // Выбираем файл для минификации
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({ suffix: '.min' })) // Добавляем суффикс .min
		.pipe(gulp.dest('src/css/')); // Выгружаем в папку src/css
		cd();
};


const createLibsCss = gulp.series(createCss,function (cd) {
	gulp.src('src/css/libs.css', { allowEmpty: true }) // Выбираем файл для минификации
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({ suffix: '.min' })) // Добавляем суффикс .min
		.pipe(gulp.dest('src/css/')); // Выгружаем в папку src/css
	cd();
});

//use if exist js libs
const libScripts = function (cd) {
	gulp.src([ // Берем все необходимые библиотеки
		'src/js/libs/jquery-3.3.1.min.js',
		'src/js/libs/popper.min.js',
		'src/js/libs/bootstrap.min.js',
		'src/js/libs/buttons.js',
	], { allowEmpty: true })
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('src/js')); // Выгружаем в папку src/js
	cd();
}
const reload = function (cd) {
	browserSync.reload();
	cd(); reload
	
}

const watch = gulp.series(createCss, libScripts, createBrowserSync, function (cd) {
	gulp.watch('src/sass/**/*.scss', createCss); // Наблюдение за sass файлами в папке sass
	gulp.watch('src/*.html', reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('src/js/**/*.js', reload);   // Наблюдение за JS файлами в папке js
	cd();
});



const cleanDist = function (cd) {
	del.sync('build'); // Удаляем папку dist перед сборкой
	cd();
};

gulp.task('build', gulp.series(cleanDist, createCss, createLibsCss, minCss,  function (cd) {
			var buildCss = gulp.src([ // Переносим библиотеки в продакшен
				'src/css/*',
			])
				.pipe(gulp.dest('build/css'))

			var buildFonts = gulp.src('src/fonts/**/*') // Переносим шрифты в продакшен
				.pipe(gulp.dest('build/fonts'))

			var buildJs = gulp.src('src/js/**/*')
				.pipe(babel({
					presets: ['@babel/env']
				})) // Переносим скрипты в продакшен
				.pipe(gulp.dest('build/js'))

			var buildHtml = gulp.src('src/*.html')// Переносим HTML в продакшен
				.pipe(rigger()) //собираем кумки html
				.pipe(gulp.dest('build'));

			var imagMin = gulp.src('src/img/*')
				.pipe(imagemin())
				.pipe(gulp.dest('build/img'));
			cd();
		}));



exports.default = watch;

