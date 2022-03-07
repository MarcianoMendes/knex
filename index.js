var database = require('./database');
var data = [{
    name: "Call of duty 2",
    value: 70
},
{
    name: "GTA",
    value: 200
},
{
    name: "Wow",
    value: 130
}
]

function insertList() {
    database.insert(data).into("games").then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });
}

function insertStudios(name, game_id) {
    database.insert({ name: name, game_id: game_id }).into("studies").then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });
}
function simpleSelect() {
    database.select(["name", "value"]).from("games").then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });
}

function selectWithWhereRaw() {
    database.select().whereRaw("name = 'Call of duty' OR  value > 120").from("games").then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });
}

function selectRaw() {
    database.raw('select * from games').then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });
}

function deleteRow(id) {
    database.from("games").delete().where({ id: id }).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });
}

function update(id) {
    database.from("games").update({ value: 69 }).where({ id: id }).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });
}

function selectWithOrderBy(order) {
    database.select(["name", "value"]).from("games").orderBy("name", order).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });
}

function selectWithInnerJoin(id_game) {
    database.select(["games.*", "studies.name as name_studio"]).from("games").
        innerJoin("studies", "games.id", "studies.game_id").where("games.id", id_game).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });
}
// selectWithInnerJoin(3);

function selectWithInnerJoinManyToMany(id_game) {
    database.select(["games.*", "studies.name as name_studio"]).from("games_studies").
        innerJoin("games", "games_studies.game_id", "games.id").
        innerJoin("studies", "games_studies.studio_id", "studies.id").where("games.id", id_game).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });
}
// selectWithInnerJoinManyToMany(4);

async function insertWithTransaction() {
    try {
        await database.transaction(async trans => {
            await database.insert({ name: "Qualquer Coisa" }).table("studies");
            await database.insert({ name: "Pyxerelia" }).table("studies");
            await database.insert({ name: "Mojang" }).table("studies");
            await database.insert({ name: "GearBox" }).table("studies");

        });
    } catch (err) {
        console.log(err);
    }
}

insertWithTransaction();
// insertList();
// simpleSelect();
// selectWithWhereRaw();
// selectRaw();
// deleteRow(3);
// update(4);
// simpleSelect();
// selectWithOrderBy("desc");
// insertStudios("wb",2);