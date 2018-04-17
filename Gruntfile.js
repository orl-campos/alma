module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('assemble');

  // Project configuration.
  grunt.initConfig({

    //Task configuration
    
    //Clean
    clean: ['_dist/','_site/'],

    //Asseble
        assemble: {
            options: {
                layoutdir: '_layouts',
                layout: 'default-layout.hbs',
                partials: '_partials/*.*'
            },
            site: {
                expand: true,
                cwd: '.',
                src: "pages/**/*.hbs",
                dest: '_site'
            }
        },    

    //concat   
    
    //cssmin

    //imagemin

    //uglify


    //Starts local server
    connect: {
      server: {
        options: {
          port: 5000,
          base: './_site'
        }
      }
    },


        copy: {
            dev: {
                files: [
                    { expand: true, cwd: 'js/', src: ['**','**/*.js'], dest: '_site/js/' },
                    { expand: true, cwd: 'css/', src: ['*.min.css'], dest: '_site/css/' },
                    { expand: true, cwd: 'fonts/', src: ['*.*'], dest: '_site/fonts/' },
                    { expand: true, cwd: 'images/', src: ['*.*','**/*.*'], dest: '_site/images/' }
                ]
            }
        },

    //
    jshint: {
      files: ['Gruntfile.js', '**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },




    watch: {
      options: { livereload: true },
      less: {
        files: ['css/**/*','css/*'],
        tasks: ['less:dev']
      },
      js: {
        files: ['js/**/*','js/*'],
        tasks: ['copy']
      },
      assemble: {
        files: ['pages/**/*.hbs', 'pages/*.hbs', '_partials/*.hbs', '_layouts/*.hbs'],
        tasks: ['assemble']
      }
    },


    less: {
      dev: {
        src: ['css/alma.less'],
        dest: '_site/css/alma.css',
      }
    }   

  });

    var lessFilesConfig = [
        {
            expand: true,
            src: ['css/*.less','!css/_*.less'],
            dest: '_site',
            ext: '.css'
        }
    ];

  grunt.registerTask('default' , [
    'clean',
    'assemble',
    'copy:dev',
    'less:dev'
  ]);  

  grunt.registerTask('serve' , [
    'clean',
    'assemble',
    'copy:dev',
    'less:dev',
    'connect',
    'watch'
  ]);  



};


