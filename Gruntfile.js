// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Lazyload grunt tasks.
  require('grunt-lazyload')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    templates: 'app/templates',
    pkg: grunt.file.readJSON('package.json')
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      options: {
          spawn: false // Important, don't remove this!
      },
      js: {
        files: [
          '<%= config.app %>/scripts/**/*.js'
        ],
        tasks: ['jshint', 'uglify', 'bsReload']
      },
      sass: {
        files: [
          '<%= config.app %>/**/*.scss',
        ],
        tasks: ['compass', 'bsReload']
      },
      html: {
        files: [
          '<%= config.app %>/**/*.html',
        ],
        tasks: ['copy:html', 'bsReload']
      }
    },

    // BrowserSync
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            '<%= config.app %>/**/*.*'
          ]
        },
        options: {
          watchTask: true,
          server: './',
        }
      }
    },
    bsReload: {
        all: {
            reload: true
        }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            './assets/',
            './templates/',
            './styles/',
            './scripts/',
            './index.html',
            '!<%= config.app %>/**/*.html'
          ]
        }]
      },
    },

    // JS uglify.
    uglify: {
      dist: {
        options: {
          banner: '/**\n * <%= config.pkg.name %> - Version: <%= config.pkg.version %>\n * \n' +
            ' * <%= grunt.template.today("yyyy-mm-dd") %>\n *\n * @author <%= config.pkg.author %>\n */\n\n',
          preserveComments: false,
          mangle: true,
          compress: {
            drop_console: true
          }
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>/',
          src: 'scripts/**/*.js',
          dest: './'
        }]
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        '<%= config.app %>/scripts/*.js'
      ]
    },
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: '<%= config.app %>/styles/',
          cssDir: './styles/',
          environment: 'development',
          // require: 'susy',
          raw: 'require \'compass\'\n'
        }
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          // Copy global files.
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: './',
         src: [
            '*.{ico,png,txt,md,json}',              // Global files.
            'img/{,*/}*.{webp,jpg,png,gif,svg}',    // Images.
            'fonts/{,*/}*.*',                       // Fonts.
            'translate/{,*/}*.json',                // translations.
            'assets/**/*',                          // default assets.
          ]
        }]
      },
      html: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: './',
          src: [
            '**/*.html'
          ]
        }]
      }
    }
  });

  // Explicit lazyLoad tasks.
  grunt.lazyLoadNpmTasks('grunt-contrib-connect', 'connect');
  grunt.lazyLoadNpmTasks('grunt-contrib-jshint', 'jshint');
  grunt.lazyLoadNpmTasks('jshint-stylish', 'stylish');
  grunt.lazyLoadNpmTasks('grunt-autoprefixer', 'autoprefixer');
  grunt.lazyLoadNpmTasks('grunt-browser-sync', 'browserSync');
  grunt.lazyLoadNpmTasks('grunt-contrib-clean', 'clean');
  grunt.lazyLoadNpmTasks('grunt-contrib-copy', 'copy');
  grunt.lazyLoadNpmTasks('grunt-contrib-sass', 'sass');
  grunt.lazyLoadNpmTasks('grunt-contrib-compass', 'compass');
  grunt.lazyLoadNpmTasks('grunt-contrib-uglify', 'uglify');
  grunt.lazyLoadNpmTasks('grunt-contrib-watch', 'watch');
  grunt.lazyLoadNpmTasks('grunt-contrib-cssmin', 'cssmin');
  grunt.lazyLoadNpmTasks('grunt-contrib-concat', 'concat');

  // Register tasks.
  grunt.registerTask('dist', [
    'clean',
    'compass',
    'uglify:dist',
    'copy',
  ]);
  grunt.registerTask('serve', [
    'dist',
    'browserSync',
    'watch'
  ]);
  grunt.registerTask('default', [
    'serve'
  ]);
};
