module.exports = function(grunt) {
    
    grunt.initConfig({
        browserify: {
            client: {
                src: ['client/*.js','client/**/*.js'],
                dest: 'public/scripts/main.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.registerTask('start', 'browserify');
}