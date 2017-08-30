function go() {
    var songs = ['http://onk2gpv5u.bkt.clouddn.com/%E5%BC%A6%E5%AD%90+-+%E5%A4%A9%E7%9C%9F.mp3', ''];
    var lrcs = '[00:00.57]天真 -- 弦子\n[00:04.88]天真 -- 弦子\n[00:08.57]作词：刘小爱，深白色\n[00:12.57]作曲：林冠权\n[00:18.85] 回忆还是温热的\n[00:24.27] 但承诺 已经冷却了\n[00:31.30] 我的天真 在泪水里沉沦\n[00:36.09] 孤独它让我无法负荷\n[00:42.26]\n[00:45.20] 不用假装还爱着\n[00:49.88] 舍不得 还是放开了\n[00:55.99] 我的天真 早就碎成遍地的忐忑\n[01:02.83] 失去了所有颜色\n[01:09.63]\n[01:10.87] 这次我真的痛了 真的彻底醒了\n[01:18.25] 我试着洒脱 换来的只是伤痕\n[01:24.75] 我爱到痛了 你却留下我一个人\n[01:32.03] 埋葬我的天真\n[02:05.70] 还能够说些什么\n[02:11.23] 当快乐 已经掏空了\n[02:17.19] 我的天真 早就碎成遍地的忐忑\n[02:23.91] 努力拼凑着 却再也无法完整\n[02:35.80] 这次我真的痛了 真的彻底醒了\n[02:42.53] 我试着洒脱 换来的只是伤痕\n[02:49.05] 我爱到痛了 你却留下我一个人\n[02:56.30] 埋葬我的天真\n[03:02.40] 我哭的累了 没有梦是好的\n[03:08.56] 别再说爱我 你给的全是悔恨\n[03:15.14] 我爱到痛了 你却留下我一个人\n[03:22.50] 埋葬我的天真\n[03:28.48]~~ ~~\n';

    var lrcArray = parseLyric(lrcs);
    console.log(lrcArray);

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
                go()
            })
        }
    }

    function addLrc(lrc) {
        //获取页面上的audio标签
        var audio = document.getElementById('audio');
        //显示歌词的元素
        var lrcText = document.getElementById('lrctext');
        //监听ontimeupdate事件

        audio.addEventListener('timeupdate', function() {
            //遍历所有歌词，看哪句歌词的时间与当然时间吻合
            for (var i = 0, l = lrc.length; i < l; i++) {
                if (audio.currentTime /*当前播放的时间*/ > lrc[i][0] - 0.5) {
                    //显示到页面
                    lrcText.innerHTML = '♬ ' + lrc[i][1];
                };
            };
        });

        //歌词隐藏1：歌曲播放结束
        audio.addEventListener('ended', function() {
            var lrcBox = document.getElementById('lrcbox');
            lrcBox.style.display = 'none';
        });
    }

    function parseLyric(text) {
        //先按行分割
        var lyric = text.split('\n');
        //新建一个数组存放最后结果
        lrc = new Array();
        var _l = lyric.length;
        for (i = 0; i < _l; i++) {
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


    function cycle() {
        var e = document.getElementById('audio');
        if (e != null) {
            var index = parseInt(e.getAttribute('index'));
            var h1 = document.getElementById('h1');
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
            e.setAttribute('index', index)
        }
        e.src = i;
        e.play();
    }

    addAudio();
    addLrc(lrcArray);
    var SongIndex = parseInt(document.getElementById('audio').getAttribute('index'));
    var i = songs[SongIndex];
    cycle();
}

var logo = document.getElementById('play');
var lrcBox = document.getElementById('lrcbox');
logo.onclick = function() {
    go();
    lrcBox.style.display = 'block';
}