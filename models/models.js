const { Model } = require('objection');
const knex = require('knex');
Model.knex(knex);

class Room extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'rooms';
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],
            properties: {
                id: { type: 'integer' },
                name: { type: "string" },
                password: { type: "string" }
            }
        }
    }


    static get relationMappings() {
        return {
            users: {
                relation: Model.HasManyRelation,
                modelClass: User,
                join: {
                    from: 'room.id',
                    to: 'users.room_id'
                }
            }

        }
    }
}

class User extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'users';
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],
            properties: {
                id: { type: 'integer' },
                name: { type: "string" },
                password: { type: "string" }
            }
        }
    }
}


module.exports = {
    User,
    Room
}