function go(){var songs=['http://onk2gpv5u.bkt.clouddn.com/%E6%88%91%E4%BB%AC%E7%9A%84%E6%AD%8C.mp3','http://onk2gpv5u.bkt.clouddn.com/%E5%BC%A6%E5%AD%90+-+%E5%A4%A9%E7%9C%9F.mp3','http://onk2gpv5u.bkt.clouddn.com/%E6%88%91%E4%BB%AC%E7%9A%84%E6%AD%8C.mp3'];function addAudio(){var e=document.getElementById('audio');if(e===null){e=document.createElement('audio');e.setAttribute('index',0);e.id='audio';e.loop=false;e.innerHTML='Please update your browser!!';document.body.appendChild(e);e.addEventListener('ended',function(){go()})}}function cycle(){var e=document.getElementById('audio');if(e!=null){var index=parseInt(e.getAttribute('index'));if(index>songs.length-2){index=0}else{index++}e.setAttribute('index',index)}e.src=i;e.play()}addAudio();var SongIndex=parseInt(document.getElementById('audio').getAttribute('index'));var i=songs[SongIndex];cycle()}var logo=document.getElementById('play');logo.onclick=function(){go()}
