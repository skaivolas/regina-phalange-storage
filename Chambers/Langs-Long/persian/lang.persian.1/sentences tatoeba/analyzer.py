import re
import codecs


inputfile_ir = codecs.open('pes_ir.csv', encoding='utf-8')
inputfile_en = codecs.open('pes_en.csv', encoding='utf-8')

all_sentences=[]
english_sentences=[]
dic={u'Isdfv': 5241}

for line in inputfile_ir:
    all_sentences.append(re.compile("(\W)",re.UNICODE).split(line.lower()))
inputfile_ir.close()
for line in inputfile_en:
    english_sentences.append(line)
inputfile_ir.close()

print all_sentences[1]
print english_sentences[1]

#initialize 
for line in all_sentences:
    for word in line:
        dic[word]=0

#initialize 
for line in all_sentences:
    for word in line:
        dic[word]+=1

for i in dic.keys():
    print i+" : "+str(dic[i])


frequency_file=codecs.open('frequency.csv','w',encoding='utf-8')

for i in dic.keys():
    frequency_file.write(i+u'\t'+str(dic[i])+u'\n')
frequency_file.close()

#result=[]
#words=re.compile("(\W)",re.UNICODE).split(text)
#print(words)

#for i in words:
#	if i.isalpha():
#		result.append(u'@'+i)
#	else:
#		result.append(i)
#
#res=''.join(result)
#print(res)		


#def f(a): 
#  if a==0:
#	return 1
#  else:
#	return f(a-1)*a
#
#
#for i in range(0,12):
#    print f(i)
