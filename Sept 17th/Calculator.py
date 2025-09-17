class Calculator:
    def __init__(self,a,b):
        self.a=a
        self.b=b

    def add(self): return self.a+self.b
    def sub(self): return self.a-self.b
    def mul(self): return self.a*self.b
    def div(self): return self.a/self.b

O=Calculator(1,1)
print(O.add(),O.sub(),O.mul(),O.div())
