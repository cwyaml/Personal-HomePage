var play = document.getElementById('play');
play.onclick = function() {
	go();
};

function go() {

	//歌曲和歌词外链   三首：风筝误/三十岁的女人/天真
	var songs = [
	 'http://onk2gpv5u.bkt.clouddn.com/%E9%A3%8E%E5%B0%8F%E7%AD%9D%20-%20%E9%A3%8E%E7%AD%9D%E8%AF%AF%EF%BC%88Cover%20%E5%88%98%E7%8F%82%E7%9F%A3%EF%BC%89.mp3',
	 'http://onk2gpv5u.bkt.clouddn.com/%E8%B5%B5%E9%9B%B7%20-%20%E4%B8%89%E5%8D%81%E5%B2%81%E7%9A%84%E5%A5%B3%E4%BA%BA.mp3',
	 'http://onk2gpv5u.bkt.clouddn.com/%E5%BC%A6%E5%AD%90+-+%E5%A4%A9%E7%9C%9F.mp3',''
	];
	var lrcUrl = [
	 'http://opmbbgxi4.bkt.clouddn.com/fzw.lrc',
	 'http://opmbbgxi4.bkt.clouddn.com/sssdnr.lrc',
	 'http://opmbbgxi4.bkt.clouddn.com/tz.lrc',''
	];

	addAudio();
  var songIndex = parseInt(document.getElementById('audio').getAttribute('index'));
  cycle();
  addLrc(songIndex);

  //添加audio标签
	function addAudio() {
		var e = document.getElementById('audio');
		if (e === null) {
		  e = document.createElement('audio');
		  e.setAttribute('index', 0);
		  e.id = 'audio';
		  e.loop = false;
		  e.innerHTML = 'Please update your browser!!';
		  document.body.appendChild(e);
		  e.addEventListener('ended', function() {
		    go();

		  });
		}
	}

	//添加动画
	function cycle() {
    var e = document.getElementById('audio');
    if (e != null) {
      var index = parseInt(e.getAttribute('index'));
      var h1 = document.getElementById('animation');
      if (index != 3) {
        h1.className = 'animation';
      }
      if (index == 3) {
        h1.className = '';
      }
      if (index > songs.length - 2) {
        index = 0;
      } else {
        index++;
      }
      e.setAttribute('index', index);
    }
    e.src = songs[songIndex];
    e.play();
  }


function addLrc(index) {
	var lrcText = '';
	var xhr = new XMLHttpRequest();
	xhr.open('GET', lrcUrl[index], true);
	xhr.send();
	xhr.onload = function() {
		//获取歌词字符串
		lrcText = xhr.responseText;
		console.log(lrcText);

		var lrcArray = parseLyric(lrcText);
		addLrc(lrcArray);

	};

	//解析歌词字符串为数组	
	function parseLyric(text) {
		//先按行分割
		var lyric = text.split('\\n');
		//新建一个数组存放最后结果
		var lrc = new Array();
		
		for (i = 0; i < lyric.length; i++) {
		  //正则匹配播放时间返回一个数组
		  var sj = lyric[i].match(/\[\d{2}:\d{2}((\.|\:)\d{2})\]/g);
		  //获得该行歌词正文
		  var _lrc = lyric[i].replace(/\[\d{2}:\d{2}((\.|\:)\d{2})\]/g, "");
		  //过滤掉空行等非歌词正文部分
		  if (sj != null) {
		    //可能有多个时间标签对应一句歌词的情况，用一个循环解决
		    var _ll = sj.length;
		    for (j = 0; j < _ll; j++) {
		      var _s = sj[j];
		      var min = Number(String(_s.match(/\[\d{2}/i)).slice(1));
		      var sec = parseFloat(String(_s.match(/\d{2}\.\d{2}/i)));
		      //换算时间，保留两位小数
		      var _t = Math.round((min * 60 + sec) * 100) / 100;
		      //把时间和对应的歌词保存到数组
		      lrc.push([_t, _lrc]);
		    }
		  }
		}

		//重新按时间排序
		lrc.sort(function(a, b) {
		  return a[0] - b[0];
		});
		return lrc;
	}


	//向页面添加歌词
	function addLrc(lrc) {
		//获取页面上的audio标签
		var audio = document.getElementById('audio');
		//显示歌词的元素
		var lrcText = document.getElementById('lrctext');
		//监听ontimeupdate事件

		audio.addEventListener('timeupdate',function(){
		  //遍历所有歌词，看哪句歌词的时间与当然时间吻合
		  for (var i = 0, l = lrc.length; i < l; i++) {
		      if (audio.currentTime /*当前播放的时间*/ > lrc[i][0] - 0.5) {
		        //显示到页面
		        lrcText.innerHTML = '♬ ' + lrc[i][1];
		      }
		  	}
		  }); 
		}

	}

}




