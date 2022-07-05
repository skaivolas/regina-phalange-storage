# This snippet iterates over all textual parts of an html.

from bs4 import BeautifulSoup
from IPython.core.display import HTML

with open("file.html", "r") as fin:
    html = fin.read()

soup = BeautifulSoup(html, 'lxml') # or use any other parser

for node in soup.find_all(string=lambda x: x.strip()):
    node.replace_with("car{}ter".format(node))
    
with open("file-converted.html", "w") as fout:
    fout.write(str(soup))
