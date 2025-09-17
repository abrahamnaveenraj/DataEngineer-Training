import csv

with open("employees.csv","r") as file:
    reader=csv.DictReader(file)
    employees=list(reader)

print("Employees:")
for e in employees:
    print(f"{e['id']} - {e['name']} ({e['department']})- {e['salary']}")
