//Gruntfile
module.exports = function(grunt) {
  //Initializing the configuration object
  grunt.initConfig({
    less: {
      style: {
        files: {
          "assets/stylesheets/style.css": "assets/stylesheets/style.less"
        }
      }
    },
    copy: {
      main: {
        files: [ 
            { expand: true, src: ['bower_components/**/*.min.js', 'node_modules/underscore/underscore-min.js'], dest: 'js/', flatten: true },
        ]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
};
