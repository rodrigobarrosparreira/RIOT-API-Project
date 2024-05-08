from tkinter import *
from tkinter import ttk
import requests
from functools import partial


root = Tk()
root.geometry('900x500')
frame = Frame(root)
frame.pack(fill=BOTH, expand=1)

my_canvas = Canvas(frame)
my_canvas.pack(side=LEFT, fill=BOTH, expand=1)

scroll = Scrollbar(frame, orient='vertical', command=my_canvas.yview)
scroll.pack(side=RIGHT, fill= Y)

my_canvas.configure(yscrollcommand=scroll.set)
my_canvas.bind('<Configure>', lambda e: my_canvas.configure(scrollregion= my_canvas.bbox("all")))

frame_2 = Frame(my_canvas)

my_canvas.create_window((0,0), window=frame_2, anchor="nw")


champs = requests.get("http://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/champion.json")

Champs = champs.json()


list = list(Champs['data'].keys())


homeWidgets = []
champWidgets = []
progressList = []
spaceList = []
startList = []
data = 0

c = 0
r = 0


def refresh():
    masteryapi = requests.get()
    data = masteryapi.json()




def printAll():
    limpaTela()
    for i in range(162):
        for j in list:
            if data[i]['championId'] == int(Champs['data'][j]['key']):
                criaChampWidget(j, str(data[i]['championLevel']), data[i]['championPoints'], data[i]['championPointsUntilNextLevel'])


            



def chooseLvl(L):
    global data
    global Champs
    limpaTela()
    for i in range(161):
        for j in list:
            if int(data[i]['championId']) == int(Champs['data'][j]['key']):
                if(data[i]['championLevel'] == L):
                    criaChampWidget(j, str(data[i]['championLevel']), data[i]['championPoints'], data[i]['championPointsUntilNextLevel'])
            





def criaChampWidget(nome, champLvl, champPoints, champPointsNxtLvl):
    
    global c
    global r
    if(int(champLvl) < 5):
        total = champPoints + champPointsNxtLvl
        champLabel = Label(frame_2, text= nome+ "\n" + str(champLvl) + "\n" + str(champPoints) + "/" + str(total))
        ratio = 100 * champPoints / (champPoints + champPointsNxtLvl)
        progress = ttk.Progressbar(frame_2, orient=HORIZONTAL, length= 60, mode='determinate', value= ratio)
        champWidgets.append(champLabel)
        progressList.append(progress)

    else:
        total = champPoints + champPointsNxtLvl
        champLabel = Label(frame_2, text= nome+ "\n" + champLvl + "\nMAX")
        ratio = 100 * champPoints / (champPoints + champPointsNxtLvl)
        progress = ttk.Progressbar(frame_2, orient=HORIZONTAL, length= 60, mode='determinate', value= 100)
        champWidgets.append(champLabel)
        progressList.append(progress)

    
    champLabel.grid(column=c, row=r, padx=20)
    progress.grid(column=c,row=r+1)
                
    space = Label(frame_2, text="-----------")
    space.grid(column=c, row=r+2)
    spaceList.append(space)


    c=c+1
    if(c == 7):
        c = 0
        r = r + 3



def limpaTela():
    global c
    global r
    c = 0
    r = 1
    for i in champWidgets:
        i.destroy()
    for i in progressList:
        i.destroy()
    for i in spaceList:
        i.destroy()
    for i in startList:
        i.destroy()


def start():
    def api_start():
        api_key = input_box_api.get()
        name_input = input_box_name.get()
        
        id_url = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + name_input + "?api_key=" + api_key
        
        id = requests.get(id_url)
        id = id.json()
        id = id['id']
        
        
        mastery_url = "https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + str(id) + "?api_key=" + str(api_key)
        
        
        masteryapi = requests.get(mastery_url)
        
        global data
        data = masteryapi.json()
        


        champs = requests.get("http://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/champion.json")
        global Champs
        Champs = champs.json()
        limpaTela()
        home()
    
    input_box_api = Entry(frame_2, width=50)
    input_box_api.grid(column=0, row=0)
    input_box_api.insert(0, "API KEY")

    startList.append(input_box_api)

    input_box_name = Entry(frame_2, width=50)
    input_box_name.grid(column=0, row=1)
    input_box_name.insert(0, "Summoner Name")
    
    startList.append(input_box_name)


    input_button = Button(frame_2, text= "OK", command= api_start)
    input_button.grid(column=0, row= 2)
    startList.append(input_button)




def home():
    global c
    global r
    r = 0
    c = 0

    for i in range(9):
        action_with_arg = partial(chooseLvl, i+1)
        if i == 8:
            homeButton = Button(frame_2, text="REFRESH", command= refresh)
            homeWidgets.append(homeButton)
        elif i == 7:
            homeButton = Button(frame_2, text="ALL", command= printAll)
            homeWidgets.append(homeButton)
        else: 
            homeButton = Button(frame_2, text=str(i+1), command=action_with_arg)
            homeWidgets.append(homeButton)
        print(c)
        print(r)
        print("-------")
        homeButton.grid(column= c, row= r, padx = 20)
        c = c + 1
    r = 1
    c = 0

start()


root.mainloop()

