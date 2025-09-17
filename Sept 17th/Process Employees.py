import csv

with open("employees.csv","r") as file:
    reader=csv.DictReader(file)
    employees=list(reader)

print("Employees:")
for e in employees:
    print(f"{e['id']} - {e['name']} ({e['department']})- {e['salary']}")

salaries=[int(e['salary']) for e in employees]
totalsal=sum(salaries)
avgsalary=totalsal/len(salaries)
print(f"Total Salary: {totalsal}")
print(f"Average Salary: {avgsalary:.2f}")
