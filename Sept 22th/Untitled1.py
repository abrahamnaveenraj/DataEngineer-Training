import csv
import io
csv_data = """id,name,department,salary
1,Rahul Sharma,IT,55000
2,Priya Singh,HR,60000
3,Aman Kumar,Finance,48000
4,Sneha Reddy,Marketing,52000
5,Arjun Mehta,IT,75000
"""
file_like = io.StringIO (csv_data)
reader = csv.DictReader(file_like)
print("Employee Records:")
for r in reader:
  print(f"{r["id"]}, {r["name"]}, {r["department"]}, {r["salary"]}")
