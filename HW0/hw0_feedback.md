
Given recent circumstances, I'm not going to include this homework assignment in your overall grade unless you'd like me to. But here are my comments :)

45/55 = 82%

1. 5/5
2. 0/5
3. 10/10 
Great! I was hoping to see concatenation of strings, but this works!
4. 8/10 
Good. This function doesn't return the square of the argument, but rather just the argument itself. It was also missing an open curly bracket which prevented the function from compiling.
5. 9/10
Great! String concatenation would be good here. This function was missing the "function" keyword and didn't compile correctly.
6. 8/10
Very close. I made a few corrections (an extraneous ";", multiplying x and y by 10 to space them out, making fill positive, and placing fill() before rect()). Original code:

```javascript
for (var macOs = 0; macOs < 10; macOs++;)
{ 
    rect(macOs,macOs,10,10); 
    fill(macOs*-25); 
}
```

My code:

```javascript
for (var macOs = 0; macOs < 10; macOs++) { 
  fill(macOs * 25);
  rect(macOs*10, macOs*10, 10, 10);
}
```
