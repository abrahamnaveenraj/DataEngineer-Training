import json

json_data = '''
[
  {"id" : 1, "name": "Rahul Sharma", "age" : 21, "city" : "Banglore" },
  {"id" : 2, "name": "Priya Singh", "age" : 22, "city" : "Delhi" },
  {"id" : 3, "name": "Aman Kumar", "age" : 20, "city" : "Hyderabad" }
]
'''
students = json.loads(json_data)
print("Student Records:")
for s in students:
    print(f"{s['id']}, {s['name']}, {s['age']}, {s['city']}")
