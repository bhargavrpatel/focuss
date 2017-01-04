const gulp = require('gulp');
const childProcess = require('child_process');

const electronCommand = './node_modules/.bin/electron';

gulp.task('run', () => {
  childProcess.spawn(electronCommand, ['./app'], { stdio: 'inherit' });
});
