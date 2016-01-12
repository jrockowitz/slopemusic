module.exports = function(grunt) {

  grunt.initConfig({
    // Get project configuration from package.json.
    pkg: require('./package.json'),
    concat: {
      js: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
          'vendor/jquery.mobile.custom/jquery.mobile.custom.js',
          'js/main.js',
        ],
        dest: 'js/main.min.js'
      },
    },
    copy: {
      "bootstrap-fonts": {
        files: [
          {
            expand: true,
            cwd: 'bower_components/bootstrap-sass-official/assets/fonts',
            src: ['**', '.**'],
            dest: 'fonts'
          }
        ]
      },
      "font-awesome-fonts": {
        files: [
          {
            expand: true,
            cwd: 'bower_components/font-awesome/fonts',
            src: ['**', '.**'],
            dest: 'fonts'
          }
        ]
      }
    },
    csslint: {
      options: {
        csslintrc: 'css/.csslintrc'
      },
      dist: [
        '_site/css/main.css'
      ]
    },
    cssmin: {
      dist: {
        files: {
          'css/main.min.css': [
            '_site/css/main.css'
          ]
        }
      }
    },
    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      dist: {
        src: 'js/main.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'js/main.min.js': 'js/main.min.js'
        }
      }
    },
    responsive_images: {
      thumbnails: {
        options: {
          sizes: [
            {
              rename: false,
              width: 640,
              height: 480,
              gravity: 'North',
              aspectRatio: false,
              sharpen: {
                sigma: 1,
                radius: 2
              }
            }
          ]
        },
        files: [{
          expand: true,
          src: ['**/*.{jpg,gif,png}'],
          cwd: 'images/',
          dest: 'images-thumbnails/'
        }]
      }
    },
    sed: {
      // Fixes CSS Lint: WARNING: Values of 0 shouldn't have units specified.
      css: {
        path: '_site/css/main.css',
        pattern: ': 0%;',
        replacement: ': 0;'
      },
      dev: {
        path: '_config.yml',
        pattern: 'environment: production',
        replacement: 'environment: development'
      },
      prod: {
        path: '_config.yml',
        pattern: 'environment: development',
        replacement: 'environment: production'
      }
    },
    exec: {
      build: {
        cmd: 'jekyll build'
      },
      serve: {
        // http://unix.stackexchange.com/questions/102956/how-to-run-a-command-in-the-background-with-a-delay
        cmd: '(sleep 5; open http://localhost:4000) &\njekyll serve --drafts --watch'
      },
      deploy: {
        cmd: 'git add --all; git commit -am"Deploying changes to GitHub"; git push;'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-sed');

  grunt.registerTask('build', [ 'copy', 'concat', 'sed:css', 'cssmin', 'uglify', 'responsive_images', 'sed:dev']);
  grunt.registerTask('test', [ 'csslint', 'jshint' ]);
  grunt.registerTask('default', [ 'build', 'test', 'exec:build' ]);
  grunt.registerTask('serve', [ 'build', 'test', 'exec:serve' ]);
  grunt.registerTask('deploy', [ 'default', 'test', 'sed:prod', 'exec:deploy' ]);

};
