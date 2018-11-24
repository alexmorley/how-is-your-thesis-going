THESIS_LOCATION="../thesis_latex/text"
echo -n "`date +%Y-%m-%d-%H-%M`, "
for i in `seq 1 7`; 
do 
  x=`wc -w $THESIS_LOCATION/ch$i* | awk '{print $1}'`
  echo -n "$x, "
done
