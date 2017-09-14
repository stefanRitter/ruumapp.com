'use strict';

module.exports = function (grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        stylus: {
            compile: {
                options: {
                    compress: true,
                    paths: ['src/**/*']
                },
                files: {
                    'dist/app.css': 'src/app.styl'
                }
            }
        },

        jade: {
            compile: {
                options: {
                    client: false,
                    pretty: true
                },
                files: [ {
                    cwd: 'src/',
                    src: [
                        'pages/**/*'
                    ],
                    dest: 'dist',
                    expand: true,
                    ext: '.html'
                } ]
            }
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'src/CNAME',
                            'src/**/*.jpg',
                            'src/**/*.svg',
                            'src/**/*.png',
                            'src/**/*.mp4',
                            'src/**/*.ogv',
                            'src/**/*.css',
                            'src/*.ico',
                            'src/*.html',
                            'home/**/*',
                        ],
                        dest: 'dist/',
                        filter: 'isFile'}
                    ]
                },
            root: {
                    files: [
                        {
                            expand: true,
                            flatten: true,
                            src: [
                                'rootpages/**/*'
                            ],
                            dest: 'dist/',
                            filter: 'isFile'}
                        ]
            },
            sales: {
                        files: [
                            {
                                expand: true,
                                flatten: true,
                                src: [
                                    'sales/**/*'
                                ],
                                dest: 'dist/sales/',
                                filter: 'isFile'
                            }
                        ]
                },
            all: {
                        files: [
                            {
                                expand: true,
                                flatten: true,
                                src: [
                                    'all/**/*'
                                ],
                                dest: 'dist/all/',
                                filter: 'isFile'
                            }
                        ]
                }
            },

                watch: {
                    styles: {
                        files: ['src/**/*.styl'],
                        tasks: ['copy','stylus','jade']
                    },
                    html: {
                        files: ['oldhome/**/*','home/**/*', 'src/**/*.jade'],
                        tasks: ['copy','stylus','jade']
                    }
                },

                'gh-pages': {
                    options: {
                        base: 'dist',
                        clone: 'node_modules/.tmp/'
                    },
                    src: ['**']
                }
            });

            grunt.registerTask('build',   ['copy', 'stylus', 'jade']);
            grunt.registerTask('publish', ['build', 'gh-pages']);
            grunt.registerTask('default', ['build', 'watch']);
        };
