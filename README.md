Requirements
------------
- python (basic CORS server)
	- use the command "python --version" to check if python is installed.
	- both python2 and python3 work.


To run the code,
----------------
- run "bash run.sh" to start the python server.
- navigate to "localhost" in a browser.

功能
---------------
1. 小鳥的顏色和背景會隨機出現
2. 小鳥的翅膀會震動
3. 小鳥可受空白鍵控制,並會旋轉
4. 按空白鍵的時候會小鳥發出拍翅的聲音
5. 可判斷小鳥是否撞到地板及柱子(我不考慮撞到天空)
6. 有水管當作障礙物,碰到就會死掉,而通過則會加分
7. 死亡/加分皆有音效
8. 死掉的時候會顯示gameover,此時再按空白鍵就會重新開始遊戲
---
**一些bug**
1. 如果撞到水管開口非水管壁的話會有奇怪的現象發生
2. 撞到水管的判斷不夠精確
