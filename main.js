
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
            playerNick: null
            
            
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
            return "images/Mastery_Level_"+level+".webp"
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
                this. playerNick = this.playerNick.replace('#', '/');
                if(this.playerNick != null){
                    this.fetchData();
                }
            }
        },
        
        
        

        
    },
    computed:{
        championNames(){
            return this.masteryData.map(entry => ({
                championName: this.idToChampionName(entry.championId),
                splashUrl: this.splashUrl
            }));
        },
        
        
    }

};





async function getPlayerMasteries(nick){
    let response = await fetch("https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/" + await getPuuid(nick) + "?api_key=RGAPI-2e36f882-ef04-48d7-9dcb-77445e7c3881");
    let data = await response.json();
    return(data);
}
async function getPuuid(nick){
    let response = await fetch("https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/"+ nick +"?api_key=RGAPI-2e36f882-ef04-48d7-9dcb-77445e7c3881");
    let data = await response.json();
    return data.puuid;
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