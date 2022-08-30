const Employee = require ("./employees.js");

class engineers {
    constructor(name,id,email,github){
        super(name,id,email);
        this.github=github;
    }

    getGithub(){
        return this.github;
    }
    
    getRole(){
        return this.constructor.name;
    }
}

module.exports = engineers