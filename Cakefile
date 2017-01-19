###
# Cakefile template
#
# @author Nick K.
# @license [MIT](https://opensource.org/licenses/MIT)
###
vfs = require "vinyl-fs"
ora = do require "ora"
glob = require "glob"
junk = require "junk"
pify = require "pify"
rimraf = require "rimraf"
through = require "through2"
coffee = require "coffee-script"
{dirname, extname} = require "path"
sourcemaps = require "gulp-sourcemaps"
{red, yellow, green, cyan} = require "chalk"

# replace that thing with convert-source-map
applySourceMap = require "vinyl-sourcemaps-apply"

{cross, tick, pointer, warning, info} = require "figures"
{realpathSync, statSync, mkdirSync, watch} = require "fs"

LOG_NORMAL = 0
LOG_OK = 1
LOG_INFO = 2
LOG_WARN = 3
LOG_ERR = 4

LOG_MESSAGES = [
  pointer
  green tick
  cyan info
  yellow warning
  red cross
]

COFFEE_EXTNAMES = [".coffee", ".litcoffee", ".coffee.md"]

# Src dirname
SRC_DIR = realpathSync "#{__dirname}/src"

# Is devel task has been started?
isDevel = no

# Promisify glob using pify
glob = pify glob
rimraf = pify rimraf

###
# @param string
###
write = (string) -> process.stdout.write string

###
# @param string
###
writeErr = (string) -> process.stderr.write string

###
# @param string
# @param int level
###
log = (string, level = 0) ->
  if level in [LOG_NORMAL, LOG_OK, LOG_INFO]
    write "#{LOG_MESSAGES[level]} #{string}\n"
  else
    writeErr "#{LOG_MESSAGES[level]} #{string}\n"

###
# Handler for errors and SIGINT event
#
# @params Error err
###
onProcessExitOrError = (err) ->
  if err?
    log "Compilation error:", LOG_ERR
    console.error err.stack
    log "Watching for changes...", LOG_ERR if isDevel
    process.exit 1 unless isDevel
    return
  
  if isDevel
    write "\n"
    log "Done.", LOG_OK
  else
    ora.text = "Done without errors."
    do ora.succeed

  process.exit 0

###
# Replace .coffee extname to .js
#
# @param string filename
# @return string
###
replaceExtname = (filename) ->
  return filename.replace /\.(coffee|litcoffee|coffee\.md)$/, ".js"

###
# Get destination path
#
# @param string filename
# @return string
###
getDestFilename = (filename) -> replaceExtname filename.replace "src/", ""

###
# Transform source file using modified CoffeeScript compiler,
# or just copy file to %DEST_DIR% when it isn't CoffeeScript source
#
# @param File file
# @param string enc
# @param function cb
###
transform = (file, enc, cb) ->
  return cb null if junk.is file.path

  unless extname(file.path) in COFFEE_EXTNAMES
    if isDevel then log "Copy: #{file.path}" else ora.text = "
      Copy: #{file.path}
    "

    return cb null, file

  if isDevel
    log "Compile: #{file.path}"
  else
    ora.text = "Compile: #{file.path}"

  try
    contents = coffee.compile "#{file.contents}",
      bare: on
      header: off
      sourceMap: isDevel
      sourceRoot: no
      filename: file.path
      sourceFiles: [file.relative]
      generatedFile: replaceExtname file.relative

    if contents and contents.v3SourceMap and isDevel
      applySourceMap file, contents.v3SourceMap
      file.contents = new Buffer contents.js
    else
      file.contents = new Buffer contents

    file.path = replaceExtname file.path

    cb null, file
  catch err
    return cb err

###
# Compile files using streams
#
# @param array files
###
make = (files) ->
  files = (file for file in files when junk.not file.path)

  vfs.src files
    .on "error", onProcessExitOrError
    .pipe through objectMode: on, transform
    .on "error", onProcessExitOrError
    .pipe vfs.dest (filename) -> dirname getDestFilename filename.path
    .on "error", onProcessExitOrError
    .on "end",
      if isDevel
        -> log "Watching for changes...", LOG_INFO
      else
        onProcessExitOrError

###
# Watch for the changes in SRC_DIR
#
# @param Event e
# @param string filename
###
watcher = (e, filename) ->
  filename = "#{SRC_DIR}/#{filename}"
  try
    stat = statSync filename

    return mkdirSync getDestFilename filename if do stat.isDirectory

    return make [filename]
  catch err
    unless err? and err.code is "ENOENT"
      return process.emit "error", err

    onFulfilled = -> log "Remove #{filename}"

    return rimraf getDestFilename filename
      .then onFulfilled, onProcessExitOrError

task "make", "Build app from the source", (options) ->
  do ora.start

  glob "#{SRC_DIR}/**"
    .then make, onProcessExitOrError

task "watch", "Run Cakefile with watcher", ->
  isDevel = yes
  log "Starting watcher..."
  log "Press Control+C to exit.", LOG_INFO

  # Important note:
  #   parameter "recursive" of fs.watch works only on macOS and Windows.
  watch SRC_DIR, recursive: yes, watcher

process.on "error", onProcessExitOrError
process.on "SIGINT", onProcessExitOrError
