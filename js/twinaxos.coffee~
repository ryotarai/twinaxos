searchNaxosFromTwitter = ()->
  q = encodeURI("ml.naxos.jp/album/")
  $.ajax(
    url: "http://search.twitter.com/search.json",
    data:
      q: q
      lang: 'ja'
      rpp: '100'
      include_entities: 'true'
    dataType: 'jsonp'
    success: (json) ->
      processResult(json)
  )

processResult = (json) ->
  $('#entries').html('')
  baseurl = $.cookie('base_url')
  if baseurl is null
    baseurl = 'http://ml.naxos.jp/'

  $.each(json.results, () ->
    for u in this.entities.urls
      if u.expanded_url.match(/ml.naxos.jp\/album\/([\w\.\-]+)/)
        console.log(u.expanded_url)
        console.log(RegExp.$1)
        retried = false
        id = RegExp.$1
        box = $('<div>').attr('style', 'float:left; height:380px;')
        a = $('<a/>').attr('href', "#{baseurl}album/#{id}")
        a.attr('target', '_blank')
        twText = $('<p>')
        twText.attr('style', 'width: 280px;height:70px; font-size:9px; text-overflow:ellipsis; overflow:hidden;')
        twText.append(this.text)
        img = $('<img/>').attr('src', "http://ml.naxos.jp/sharedfiles/images/cds/#{id}.gif")
        img.attr('style', 'width:290px;')
        img.bind('load', () ->
          box.hide()
          a.append(img)
          box.append(a)
          box.append(twText)
          $('#entries').prepend(box)
          box.fadeIn()
        )
        img.bind('error', ()->
          if retried
            return
          console.log('error')
          img.attr('src', "http://ml.naxos.jp/sharedfiles/images/cds/hires/#{id}.jpg")
          retried = true
        )
  )


$( ->
  searchNaxosFromTwitter()
  console.log($.cookie('base_url'))
  $('#myModal .modal-footer a[class*="btn-primary"]').click(->
    baseurl = $('#base-url').val()
    $.cookie('base_url', baseurl, expires:365, path:'/')
  )
)
