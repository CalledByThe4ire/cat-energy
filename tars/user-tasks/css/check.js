'use strict';

const gulp = tars.packages.gulp;
const cache = tars.packages.cache;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;
const postcss = tars.packages.postcss;
const reporter = require('postcss-reporter');
const syntaxScss = require('postcss-scss');
const stylelint = require('stylelint');

const cssPathesToLint = [].concat.apply([], [
    `./markup/${tars.config.fs.componentsFolderName}/**/*.scss`,
    `!./markup/${tars.config.fs.componentsFolderName}/**/_*.scss`,
]);

const stylelintConfig = {
    'extends': 'stylelint-config-htmlacademy',
    'plugins': [
        'stylelint-scss'
    ],
    'rules': {
        'indentation': 'tab',
        'number-leading-zero': null,
        'at-rule-no-unknown': [true, {
            ignoreAtRules: ['extend', 'at-root', 'debug', 'warn', 'error', 'if', 'else', 'for', 'each', 'while', 'mixin', 'include', 'content', 'return', 'function']
        }]
    }
};

const processors = [
    stylelint(stylelintConfig),
    reporter({
        clearAllMessages: true,
        throwError: true
    })
];

/**
 * Check JS for style and errors (optional task)
 */
module.exports = () => {
    return gulp.task('css:check', () => {

        return gulp.src(cssPathesToLint)
            .pipe(plumber({
                errorHandler() {
                    notifier.error('An error occurred while checking scss.');
                }
            }))
            .pipe(cache('stylelint'))
            .pipe(postcss(processors, {
                syntax: syntaxScss
            }));
    });
};
