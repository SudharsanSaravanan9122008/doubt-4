class RealtimeDatabase{
    constructor(){
        this.database = firebase.database();
        this.usersOnCloud = 0;
        this.username = "";
        this.email_id = "";
        this.password = "";
        this.offline = {};
        this.online = {};
        this.isWorkingFine = false;
    }
    update(signedInOrNot_bool, id){
        var temp_db_data, temp_db_data2;

        temp_db_data = this.database.ref('/');
        temp_db_data.on("value", (data)=>{temp_db_data2 = data.val();}, ()=>{console.log("error")});
        if(temp_db_data2 !== undefined){
            this.usersOnCloud = Object.keys(temp_db_data2).length;
            if(id < this.usersOnCloud && id > -1 && signedInOrNot_bool === true){
                if(signedInOrNot_bool === true){
                    temp_db_data = this.database.ref('id'+id.toString()+"/");
                    temp_db_data.on("value", (data)=>{temp_db_data2 = data.val();}, ()=>{console.log("error")});
                }else{
                    temp_db_data2 = {};
                }
                if(signedInOrNot_bool){
                    this.username = temp_db_data2.info.username;
                    this.email_id = temp_db_data2.info.email_id;
                    this.password = "";
                    for(var i = 0; i < temp_db_data2.info.password.length; i++){
                        this.password+=String.fromCharCode(temp_db_data2.info.password.charCodeAt(i)-2);
                    }
                    this.online = temp_db_data2.online;
                    this.offline = temp_db_data2.offline;
                }else{
                    this.username = "";
                    this.email_id = ""
                    this.password = "";
                    this.offline = {};
                    this.online = {};
                }
                this.isWorkingFine = true;
            }else{
                console.log("id is greater than the index of accounts in the database")
            }

        }else{
            this.isWorkingFine = false;
        }
    }
    returnData(){
        if(this.isWorkingFine === true){
            return {
                usersOnCloud: this.usersOnCloud,
                username: this.username,
                email_id:this.email_id,
                password:this.password,
                online:this.online,
                offline:this.offline
            }
        }else{
            return undefined;
        }
    }
    writeData(changes, path){
        this.database.ref(path).update(changes);
    }

}