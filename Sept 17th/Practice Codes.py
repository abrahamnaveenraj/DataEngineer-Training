class Student:
    def __init__(self,name,age):
        self.name=name
        self.age=age

    def greet(self):
        return f"Hello {self.name},{self.age}"

s1=Student("Rahul",22)
print(s1.greet())

class Customer(Student):
    def __init__(self,fname,lname,name,age):
        super().__init__(name,age)
        self.fname=fname
        self.lname=lname


    def greet(self):
        return f"Hello {self.fname} {self.lname} and {self.name}"

cus1=Customer("Rohit","Sharma","Faheem",14)
print(cus1.greet())
