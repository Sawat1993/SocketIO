class Users {
    constructor(){
        this.users = [];
    }

    getUserList(room){
        var users = this.users.filter((user) => user.room === room)
        var nameArray = users.map((user) => user.name);

        return nameArray;
    }

    getUser(id){
        return this.users.filter((user) => user.id === id)[0];
    }

    addUser(id, name, room){
        var user = {id, name, room}
        this.users.push(user);
        return user;
    }

    removeUser(id){
        var user = this.getUser(id);

        if(user){
            this.users =  this.users.filter((user) => user.id !== id )
        }
        return user;
    }
}

module.exports = {Users};