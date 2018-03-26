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
                    pricing: {
                        files: [
                            {
                                expand: true,
                                flatten: false,
                                src: [
                                    'pricing/**/*'
                                ],
                                dest: 'dist/',
                                filter: 'isFile'
                            }
                        ]
                    },
                    css: {
                        files: [
                            {
                                expand: true,
                                flatten: false,
                                src: [
                                    'css/**/*'
                                ],
                                dest: 'dist/',
                                filter: 'isFile'
                            }
                        ]
                    },
                    images: {
                        files: [
                            {
                                expand: true,
                                flatten: false,
                                src: [
                                    'images/**/*'
                                ],
                                dest: 'dist/',
                                filter: 'isFile'
                            }
                        ]
                    },
                    js: {
                        files: [
                            {
                                expand: true,
                                flatten: true,
                                src: [
                                    'js/**/*'
                                ],
                                dest: 'dist/',
                                filter: 'isFile'
                            }
                        ]
                    },
                    pdfTerms: {
                        files: [
                            {
                                expand: true,
                                flatten: true,
                                src: [
                                    'pdf/terms/**/*'
                                ],
                                dest: 'dist/pdf/terms/',
                                filter: 'isFile'
                            }
                        ]
                    },
                    pdfPrivacy: {
                        files: [
                            {
                                expand: true,
                                flatten: true,
                                src: [
                                    'pdf/privacy/**/*'
                                ],
                                dest: 'dist/pdf/privacy/',
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
