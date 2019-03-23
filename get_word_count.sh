THESIS_LOCATION="../thesis_latex"
echo -n "`date +%Y-%m-%d-%H-%M`,"
for i in `seq 1 7`; 
do 
  x=`wc -w $THESIS_LOCATION/text/ch$i* | awk '{print $1}'`
  echo -n "$x,"
done
f=`ls $THESIS_LOCATION/figures/*png | wc -l`
echo -n "$f"
echo
