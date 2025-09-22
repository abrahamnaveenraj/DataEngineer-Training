import json
json_data = '''
[
  { "id": 1, "name": "Rahul Sharma", "age": 21, "city": "Bangalore" },
  { "id": 2, "name": "Priya Singh", "age": 22, "city": "Delhi" }
]
'''
students = json.loads(json_data)

new_student =  { "id": 3, "name": "Barathraj", "age": 22, "city": "Chennai" }
students.append(new_student)

for s in students:
  if s["id"] == 1:
    s["city"] = "pune"

updated_json = json.dumps(students, indent =2)
print("Updated JSON Data:\n", updated_json)
