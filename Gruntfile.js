module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      build: {
        files: ['src/**/*'],
        tasks: ['build']
      }
    },
    clean: {
      build: 'dist' 
    },
    sync: {
      build: {
        files: [{
          expand: true, 
          cwd: 'src',
          src: ["**/*", "!vendor", "!assets/**/*.js", "!assets/**/*.less", "!templates/**"], 
          dot: true,
          dest: "dist"
        }],
        pretend: false, // Don't do any IO. Before you run the task with `updateAndDelete` PLEASE MAKE SURE it doesn't remove too much. 
        verbose: true // Display log messages when copying files 
      }
    },
    mincerrc: {
      options: {
        manifest: false,
        digest: false,
        include: [
          'vendor/assets/components',
          'src/assets/javascripts',
          'src/assets/stylesheets'
        ],
        clean: false,
        sourceMaps: false,
      },
      build: {
        cwd: 'src',
        src: ['**/application.*'],
        dest: 'dist'
      }
    },
    assemble: {
      options: {
        flatten: true,
        assets: 'assets',
        helpers: ['src/templates/helpers/*.js', 'handlebars-helpers'],
        partials: ['src/templates/partials/**/*.hbs'],
        layout: ['src/templates/layouts/default.hbs'],
        data: ['src/templates/data/*.{json,yml}']
      },
      build: {
        src: ['src/templates/pages/**/*.hbs'],
        dest: 'dist'
      }
    },
    connect: {
      build: {
        options: {
          open: true,
          livereload: true,
          base: 'dist/',
          port: 9090
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-mincerrc');
  grunt.loadNpmTasks('grunt-assemble');

  grunt.registerTask('test', ['jshint']);
  
  grunt.registerTask('build', ['clean:build', 'sync:build', 'mincerrc:build', 'assemble:build']);
  
  grunt.registerTask('serve', ['build', 'connect:build', 'watch:build']);

};