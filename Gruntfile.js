module.exports = function(grunt) {

    [
        'grunt-browserify',
        'grunt-contrib-uglify'
    ].forEach(task => {
        grunt.loadNpmTasks(task);
    })

    grunt.initConfig({
        browserify: {
            client: {
                src: ['client/*.js','client/**/*.js'],
                dest: 'public/scripts/main.js'
            }
        },
        uglify: {
            all: {
                files: {
                    'public/scripts/main.min.js': 'public/scripts/main.js'
                }
            }
        }
    });

    grunt.registerTask('start', 'browserify');
    grunt.registerTask('clean', 'uglify');
}