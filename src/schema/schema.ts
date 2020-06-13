const graphql = require('graphql');
const character = require('../models/character');
const storyLine = require('../models/storyLine');
const post = require('../models/post');
const user = require('../models/user');
const world = require('../models/world');
var moment = require('moment');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLBoolean } = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        dateCreated: {type: GraphQLString},
        characters: {
            type: GraphQLList(CharacterType),
            resolve(parent:any, args:any){
                return character.find({userId: parent._id}, function(err:Error, data:[String]){
                    if (err) console.log(err)
                    return data
                })
            }
        },
    })
})

const CharacterType = new GraphQLObjectType({
    name: 'Character',
    fields: () => ({
        _id: { type: GraphQLID },
        name: {type: GraphQLString},
        background: {type: GraphQLString},
        userId: { type: GraphQLID },
        worldId: {type: GraphQLID},
        //storyLineIds: {type: GraphQLID},
        dateCreated: {type: GraphQLString},
        user: { 
            type: UserType,
            resolve(parent:any, args:any){
                return user.findOne({_id: parent.userId},function(err:Error, data:any){
                    console.log(err)
                    return data
                })
            }
        },
    })
})
const StoryLineType = new GraphQLObjectType({
    name: 'StoryLine',
    fields: () => ({
        _id: { type: GraphQLID },
        name: {type: GraphQLString},
        theme: {type: GraphQLString},
        intro: {type: GraphQLString},
        worldId: {type: GraphQLID},
        creatorId: {type: GraphQLID},
        dateCreated: {type: GraphQLString},
        charactersId: {type: GraphQLList(GraphQLID)},
        creator: { 
            type: UserType,
            resolve(parent:any, args:any){
                return character.findOne({_id: parent.creatorId},function(err:Error, data:any){
                    console.log(err)
                    return data
                })
            }
        },
        world: {
            type: WorldType,
            resolve(parent: any, args: any){
                return world.findOne({_id: parent.worldId}, function(err: Error, data: any){
                    console.log(err)
                    return data
                })
            }
        },
        characters: {
            type: WorldType,
            resolve(parent: any, args: any){
                return character.find({_id: {$in: parent.charactersId}}, function(err: Error, data: any){
                    console.log(err)
                    return data
                })
            }
        },
    })
})

const WorldType = new GraphQLObjectType({
    name: 'World',
    fields: () => ({
        _id: { type: GraphQLID },
        creatorId: { type: GraphQLID },
        dateCreated: {type: GraphQLString},
        creator: { 
            type: UserType,
            resolve(parent:any, args:any){
                return user.findOne({_id: parent.creatorId},function(err:Error, data:any){
                    console.log(err)
                    return data
                })
            }
        },
        characters: {
            type: GraphQLList(CharacterType),
            resolve(parent:any, args:any){
                return character.find({worldId: parent._id}, function(err:Error, data:any){
                    if (err) console.log(err)
                    return data
                })
            }
        },
        storyLines: {
            type: GraphQLList(StoryLineType),
            resolve(parent:any, args:any){
                return storyLine.find({worldId: parent._id}, function(err:Error, data:any){
                    if (err) console.log(err)
                    return data
                })
            }
        },
        
    })
})
const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        _id: { type: GraphQLID },
        characterId: { type: GraphQLID },
        type: {type: GraphQLString},
        storyLineId: {type: GraphQLID},
        dateCreated: {type: GraphQLString},
        creator: { 
            type: UserType,
            resolve(parent:any, args:any){
                return user.findOne({_id: parent.characterId},function(err:Error, data:any){
                    console.log(err)
                    return data
                })
            }
        },
        storyLine: { 
            type: UserType,
            resolve(parent:any, args:any){
                return storyLine.findOne({_id: parent.storyLineId},function(err:Error, data:any){
                    console.log(err)
                    return data
                })
            }
        },
        
    })
})

