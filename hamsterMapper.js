function  mapper (obj) {
    return newObj = {
    "name": obj.name,
    "age": obj.age,
    "favFood":obj.favFood,
    "loves": obj.loves,
    "imgName": obj.imgName,
    "wins": obj.wins,
    "defeats": obj.defeats,
    "games": obj.games}
}

module.exports.mapper = mapper;