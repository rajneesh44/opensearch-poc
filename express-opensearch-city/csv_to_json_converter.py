import csv
import ast
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
                "id": str(row[0]),
                f"{header[1]}": str(row[1]),
                f"{header[2]}": str(row[2]),
                f"{header[3]}": str(row[3]),
                f"{header[4]}": ast.literal_eval(row[4]),
                f"{header[5]}": str(row[5]),
                f"{header[6]}": int(row[6]),
                f"{header[7]}": int(row[7]),
                f"{header[8]}": ast.literal_eval(row[8]),
                f"{header[9]}": str(row[9]),
                f"{header[10]}": str(row[10]),
                f"{header[11]}": str(row[11]),
                f"{header[12]}": str(row[12]),
                f"{header[13]}": str(row[13]),
                f"{header[14]}": row[14],
            }
            datas.append(data)
            print(len(datas))
        except:
            pass
    else:
        break

s = str(datas)
f2 = open('resources/data3.json', 'w')
f2.write(s)
f2.close()
f.close()
