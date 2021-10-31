(function() {
  const $search = $('#filter-search');
  const $imgs = $('#gallery img');
  const cache = [];
  const tagged = {};

  $imgs.each(function() {
    const img = this;
    const tags = $(this).data("tags");

    if (tags) {
      tags.split(", ").forEach(function(tagName) {
        if (tagged[tagName] == null) {
          tagged[tagName] = [];
        }
        tagged[tagName].push(img);
      });
    }

    cache.push({
      element: this,
      text: $(this).data("tags").trim().toLowerCase()
    });
  });

  function filter() {
    const query = this.value.trim().toLowerCase();
    cache.forEach(function(img) {
      let index = 0;

      if (query) {
        index = img.text.indexOf(query);
      }

      img.element.style.display = index === -1 ? 'none' : '';  // Show / hide
    });
  }

  if ('oninput' in $search[0]) {
    $search.on('input', filter);
  } else {
    $search.on('keyup', filter);
  }
}());
