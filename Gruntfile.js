module.exports = function(grunt) {

    [
        'grunt-browserify',
        'grunt-express-server',
        'grunt-contrib-uglify',
        'grunt-contrib-jshint',
        'grunt-contrib-watch',
    ].forEach(task => {
        grunt.loadNpmTasks(task);
    });

    grunt.initConfig({

        browserify: {
            // main: {
            //     src: []
            // },
            rocketCalculator: {
                src: ['client/scripts/RocketCalc/*.js'],
                dest: 'public/scripts/rocketCalc.js'
            },
            rocketSimulator: {
                src: ['client/scripts/RocketSim/*.js'],
                dest: 'public/scripts/rocketSim.js'
            }
        },

        uglify: {
            all: {
                files: {
                    'public/scripts/main.min.js': 'public/scripts/main.js'
                }
            }
        },

        jshint: {
            all: ['Gruntfile.js', 'client/scripts/*.js', 'client/scripts/**/*.js'],
            options: {
                esversion: 6
            }
        },

        watch: {
            express: {
              files: ['**/*.js', '**/*.ejs'],
              tasks: ['jshint','browserify', 'express:dev'],
              options: {
                spawn: false
              }
            }
        },

        express: {
            dev: {
              options: {
                script: './server.js'
              }
            }
        }
    });

    grunt.registerTask('start', ['jshint', 'browserify', 'express:dev', 'watch']);
    grunt.registerTask('clean', 'uglify');
};