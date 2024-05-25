
const master = {
    data() {
        return {
            message: null,
            masteryData: [],
            champion_list: [],
            version: null,
            splash_url: null,
            masteryImage: null,
            activeFilter: null,
            playerNick: null,
            searchQuery:''
            
            
        }
    },
    created(){
        
    },
    mounted(){
        //this.fetchData();

    },
    methods:{
        
        async fetchData(){
            //get current version (patch) of game:
            let version = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
            version = await version.json();
            version = version[0];

            //get the mastery information from api
            
            this.masteryData = await getPlayerMasteries(this.playerNick);
            //gets the list of all champions and IDs (to be used on function idToChampionName())
            let champ_list = await fetch("https://ddragon.leagueoflegends.com/cdn/"+ version +"/data/en_US/champion.json");
            let list = await champ_list.json();
            let simple_list = Object.values(list);
            simple_list = Object.values(simple_list[3]);
            this.champion_list = simple_list;
            
            
        },

        //function that when given a championId, will return the champion's name 
        idToChampionName(id){
            
            const champion = this.champion_list.find(champion => champion.key === id.toString());
            if(champion){
                this.splashUrl = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+champion.id+"_0.jpg";
                
                return champion.name;
            }
            return "Unknown";
        },

        getMasteryImage(level){
            if(level<10){
                return "images/NewMastery_Level_"+level+"_Crest.webp"
            }else if(level>=10){
                return "images/NewMastery_Level_10_Crest.webp"
            }
        },

        progressBar(points, pointsToNextLvl){
            return points / (points + pointsToNextLvl)*100 + "%";
        },
        filter(lvl){
            if(this.activeFilter === lvl){
                this.activeFilter = null;
            }else{
                this.activeFilter = lvl;
            }
        },
        getUserNick(event){
            if(event.keyCode === 13){
                let inputElement = document.getElementById('search');
                let inputValue = inputElement.value;
                this.playerNick = inputValue;
                this.playerNick = this.playerNick.replace('#', '/');
                if(this.playerNick != null){
                    this.fetchData();
                }
            }
        },
        
        
        
        
        
    },
    computed:{
        championsData(){
            return this.masteryData.map(entry => ({
                championName: this.idToChampionName(entry.championId),
                splashUrl: this.splashUrl,
                championLevel: entry.championLevel
            }))
            .filter(champion => {
                return champion.championName.toLowerCase().includes(this.searchQuery.toLowerCase())
            });
        },
        
        
    }

};





async function getPlayerMasteries(nick){
    
    let response = await fetch('https://1n03mcim6h.execute-api.us-east-1.amazonaws.com/dev/MyApiFunction?param1='+nick);
    //console.log(await fetch('https://1n03mcim6h.execute-api.us-east-1.amazonaws.com/dev/MyApiFunction?param1='+ await getPuuid(nick)));
    let data = await response.json();
    return(data);
}



Vue.createApp(master).mount('#app');





/* 

get latest game version 
https://ddragon.leagueoflegends.com/api/versions.json

*/

/* 

get ddragon to compare champions list 
https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion.json

*/