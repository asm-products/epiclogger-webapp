'use strict';
var Path = require('path');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssDir: 'assets/css',
    sassDir: '<%= cssDir %>/sass',
    jsDir: 'assets/js',
    bowerDir: './bower_components',
    sass: {                              // Task 
	    dist: {                            // Target 
	      options: {                       // Target options 
	        style: 'compressed'
	      },
	      files: {                         // Dictionary of files 
	        '<%= cssDir %>/default.css': '<%= sassDir %>/default.sass',       // 'destination': 'source'
	        '<%= cssDir %>/landing.css': '<%= sassDir %>/landing.sass',
	        '<%= cssDir %>/signup.css': '<%= sassDir %>/singup.sass', 
	      }
	    }
    },
    watch: {
      options: {
        nospawn: true
      },
      sass : {
        files: [
          '<%= sassDir %>/'
        ],
        tasks : ['sass']
      },
      js:{
        files:[
          'Gruntfile.js'
        ],
        tasks : ['clean', 'concat']
      },
      cssmin:{
        files: [''],
        tasks : ['']
      }
    },
    concat:{
      options: {
        separator: '\n'
      },
      vendorCSS: {
        src:[
          
        ],
        dest: ''
      },
      vendorJS: {
        src: [
          
        ],
        dest: '' 
      }
    },
    cssmin: {
      target: {
        files:{
           '': ['']
        }
      }
    },
    uglify: {
      options: {
          report: 'min',
          sourceMapRoot: './<%= buildJSDir %>',
          sourceMap:function(path) { return path.replace(/js/,'map').replace('.js',".map")}
      },
      js: {
          expand: true,
          cwd: './<%= buildJSDir %>/',
          src: '*.js',
          dest: './<%= buildJSDir %>/',
          ext: '.min.js'
      }
    },
    clean: {
      build: {
        src: [
          './<%= buildJSDir %>/*.js',
          './<%= buildJSDir %>/*.js.map'
        ]
      }
    },
    shell: {
      updateDepPkgs: {
        command: 'cnpm install && bower install --allow-root'
      },
      bower: {
        command: 'bower install --allow-root'
      },
      npm: {
        command: 'cnpm install'
      },
      gitPull: {
        command: 'cd .. && git add -A . && git stash && git pull'
      }
    }
  });
  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('build', ['shell:updateDepPkgs', 'clean:build', 'concat', 'less', 'uglify']);
  grunt.registerTask('deploy', ['shell:gitPull','shell:updateDepPkgs','clean:build', 'concat', 'less', 'uglify']);
};