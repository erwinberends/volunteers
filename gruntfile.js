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
        src: 'bower_components/bootstrap/dist/js/bootstrap.min.js',
        dest: 'js/bootstrap.min.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
};
