#!/home/maxwell/miniconda3/bin/python
import pyphen
from tkinter import *

root = Tk()
root.geometry("900x900")
root.title("Hyphenator")

dic = pyphen.Pyphen(lang="en");

def take_input():
    INPUT = inputtxt.get("1.0", "end-1c")
    Output.configure(state='normal')
    Output.delete('1.0', END)
    Output.insert("end", dic.inserted(INPUT, hyphen="­"))
    Output.configure(state='disabled')
    
def copy():
	INPUT = Output.get("1.0", "end-1c")	
	root.clipboard_clear()
	root.clipboard_append(INPUT)
	
def clear():
	inputtxt.delete('1.0', END)
	
l = Label(text = "Input text to hyphenate")
inputtxt = Text(root, height = 90, width = 40)
#inputtxt = Entry(root, width = 40)
inputtxt.pack(padx=5, pady=15, side=LEFT)

Output = Text(root, height = 90, width = 40, state="disabled")
Output.pack(padx=5, pady=15, side=LEFT)

Display = Button(root, text ="Hyphenate", command = lambda:take_input())
Clear =    Button(root, text ="Clear input", command = lambda:clear())
Copy =    Button(root, text ="Copy to clipboard", command = lambda:copy())


l.pack()
inputtxt.pack()
Display.pack()
Output.pack()
Copy.pack()
Clear.pack()

mainloop()

