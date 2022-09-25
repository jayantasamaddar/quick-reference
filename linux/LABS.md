# Managing Files with Shell Expansion

1. `touch tv_season{1..2}_episode{1..6}.ogg; ls tv*`
2. `touch mystery_chapter{1..8}.odf; ls mys*`
3. `mkdir -p ../Videos/season{1,2}`
4. `mv tv_*1_* ../Videos/season1; mv tv_*2_* ../Videos/season2`
5. `mkdir -p ~/Documents/my_bestseller/chapters`
6. `mkdir -p ~/Documents/my_bestseller/{editor,changes,vacation}`
7. `cd ~/Documents/my*/chapters; mv ~/Linux*/mys* .`
8. `mv *chapter{1,2}* ../editor`
9. `mv mystery_chapter{7,8}* ../vacation`
10. `cd ~/Videos/season2; cp *1* ~/Documents/my*/vacation`
11. `cd ~/Documents/my*/vacation; ls; cd -; cp *2*2* ~/Documents/my*/vacation; cd -`
12. `cp ../chap*/*{5,6}* ../changes;`
13. `cd ../changes; cp *5* mystery_chapter5_$(date +%F).odf; cp *5.odf mystery_chapter5_$(date +%s).odf`
14. `rm *; cd ..; rmdir changes`
15. `rm -r vacation`
