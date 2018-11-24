bash get_word_count.sh >> data_raw.csv
sed -s 's/,*\r*$//' data_raw.csv > data.csv
