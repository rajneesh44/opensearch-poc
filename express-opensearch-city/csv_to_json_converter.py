import csv

f = open('resources/products.csv')
csv = csv.reader(f)
header = []
datas = []
header = next(csv)
print(header)


for row in csv:
    if len(datas) < 1000:
        try:
            data = {
                f"{header[0]}": str(row[0]),
                f"{header[1]}": str(row[1]),
                f"{header[2]}": str(row[2]),
                f"{header[3]}": str(row[3]),
                f"{header[4]}": str(row[4]),
                f"{header[5]}": str(row[5]),
                f"{header[6]}": str(row[6]),
                f"{header[7]}": str(row[7]),
                f"{header[8]}": str(row[8]),
                f"{header[9]}": str(row[9]),
                f"{header[10]}": str(row[10]),
                f"{header[11]}": str(row[11]),
                f"{header[12]}": str(row[12]),
                f"{header[13]}": str(row[13]),
                f"{header[14]}": str(row[14]),
            }
            print(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11], row[12], row[13], row[14], len(datas))
            datas.append(data)
        
        except:
            break
    else:
        break

s = str(datas)
f2 = open('resources/data.json', 'w')
f2.write(s)
f2.close()
f.close()
