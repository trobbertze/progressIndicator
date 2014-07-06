Package.describe({
  summary: "A simple progress indicator using Famo.us"
});

Package.on_use(function (api, where) {
  api.use(['famono']);

  api.add_files('src/progressIndicator.js', 'client');
  api.add_files('img/ajax-loader.gif', 'client');

  api.export('ProgressIndicator', 'client');
});

Package.on_test(function (api) {
  api.use('progressIndicator');

  api.add_files('progressIndicator_tests.js', 'client');
});
