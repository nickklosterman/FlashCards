for item in *.json
do
#    sed -i 's/'\''}/"}/;s/'\''answer'\'':'\''/"answer":"/' $item 
#    sed -i 's/"http/'\''http/g;s/">/'\''>/g' $item
    sed -i 's/teh /the /g' $item
    sed -i 's/href="/href='\''/g' $item
    sed -i 's/{'\''question'\'':'\''"},//' $item
done