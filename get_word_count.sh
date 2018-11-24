echo -n "`date +%Y-%m-%d-%H-%M`, "
for i in `seq 1 7`; 
do 
  x=`wc -w ../thesis_latex/text/ch$i* | awk '{print $1}'`
  echo -n "$x, "
done
