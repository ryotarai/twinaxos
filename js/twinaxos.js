(function() {
  var processResult, searchNaxosFromTwitter;

  searchNaxosFromTwitter = function() {
    var q;
    q = encodeURI("ml.naxos.jp/album/");
    return $.ajax({
      url: "http://search.twitter.com/search.json",
      data: {
        q: q,
        lang: 'ja',
        rpp: '100',
        include_entities: 'true'
      },
      dataType: 'jsonp',
      success: function(json) {
        return processResult(json);
      }
    });
  };

  processResult = function(json) {
    $('#entries').html('');
    return $.each(json.results, function() {
      var a, box, id, img, retried, twText, u, _i, _len, _ref, _results;
      _ref = this.entities.urls;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        u = _ref[_i];
        if (u.expanded_url.match(/ml.naxos.jp\/album\/([\w\.\-]+)/)) {
          console.log(u.expanded_url);
          console.log(RegExp.$1);
          retried = false;
          id = RegExp.$1;
          box = $('<div>').attr('style', 'float:left; height:380px;');
          a = $('<a/>').attr('href', u.expanded_url);
          a.attr('target', '_blank');
          twText = $('<p>');
          twText.attr('style', 'width: 280px;height:70px; font-size:9px; text-overflow:ellipsis; overflow:hidden;');
          twText.append(this.text);
          img = $('<img/>').attr('src', "http://ml.naxos.jp/sharedfiles/images/cds/" + id + ".gif");
          img.attr('style', 'width:290px;');
          img.bind('load', function() {
            box.hide();
            a.append(img);
            box.append(a);
            box.append(twText);
            $('#entries').prepend(box);
            return box.fadeIn();
          });
          _results.push(img.bind('error', function() {
            if (retried) return;
            console.log('error');
            img.attr('src', "http://ml.naxos.jp/sharedfiles/images/cds/hires/" + id + ".jpg");
            return retried = true;
          }));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    });
  };

  $(function() {
    searchNaxosFromTwitter();
    console.log($.cookie('base_url'));
    return $('#myModal .modal-footer a[class*="btn-primary"]').click(function() {
      var baseurl;
      baseurl = $('#base-url').val();
      return $.cookie('base_url', baseurl, {
        expires: 365,
        path: '/'
      });
    });
  });

}).call(this);
