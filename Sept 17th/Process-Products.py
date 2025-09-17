import json

with open("products.json","r") as file:
    products=json.load(file)

print("All Products:")
for s in products:
    print(f"{s['name']} ({s['category']})")

for s in products:
    total=s['price']* s['stock']
    if(total==0): print(f"{s['name']} is out of stock")
    else: print(f"{s['name']}-> {total}")
