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
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
};
