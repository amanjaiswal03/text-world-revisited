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
        _id: {type: GraphQLID},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        dateCreated: {type: GraphQLString},
        characters: {
            type: CharacterType,
            resolve (parent: any, args: any){
                return character.find({creatorId: parent._id},function(err: Error, data: any){
                    if (err) console.log(err);
                    return data
                })
            }
        }
    })
})

const CharacterType = new GraphQLObjectType({
    name: 'Character',
    fields: () => ({
        _id: { type: GraphQLID },
        name: {type: GraphQLString},
        creatorId: {type: GraphQLID},
        background: {type: GraphQLString},
        worldId: {type: GraphQLID},
        //storyLineIds: {type: GraphQLID},
        dateCreated: {type: GraphQLString},
        storyLines: {
            type: StoryLineType,
            resolve(parent: any, args: any){
                return storyLine.find({charactersId: {$elemMatch: {$eq: parent._id}}},function(err:Error, data:any){
                    if (err) console.log(err)
                    return data
                })
            }
        },
        posts: {
            type: PostType,
            resolve(parent: any, args: any){
                return post.find({creatorId: parent._id},function(err: Error, data: any){
                    if (err) console.log(err)
                    return data
                })
            }
        }
    })
})
const StoryLineType = new GraphQLObjectType({
    name: 'StoryLine',
    fields: () => ({
        _id: { type: GraphQLID },
        name: {type: GraphQLString},
        theme: {type: GraphQLString},
        intro: {type: GraphQLString},
        creatorId: {type: GraphQLID},
        worldId: {type: GraphQLID},
        dateCreated: {type: GraphQLString},
        charactersId: {type: GraphQLList(GraphQLID)},
        creator: { 
            type: CharacterType,
            resolve(parent:any, args:any){
                return character.findOne({_id: parent.creatorId},function(err:Error, data:any){
                    if (err) console.log(err)
                    return data
                })
            }
        },
        characters: {
            type: WorldType,
            resolve(parent: any, args: any){
                return character.find({_id: {$in: parent.charactersId}}, function(err: Error, data: any){
                    if (err) console.log(err)
                    return data
                })
            }
        },
        posts: {
            type: PostType,
            resolve(parent: any, args: any){
                return postSchema.find({storyLineId: parent._id}, function(err:Error, data: any){
                    if (err) console.log(err)
                    return data
                })
            }
        }
    })
})

const WorldType = new GraphQLObjectType({
    name: 'World',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type : GraphQLString},
        background: {type: GraphQLString},
        creatorId: { type: GraphQLID },
        dateCreated: {type: GraphQLString},
        creator: { 
            type: UserType,
            resolve(parent:any, args:any){
                return user.findOne({_id: parent.creatorId},function(err:Error, data:any){
                    if (err) console.log(err)
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
        creatorId: { type: GraphQLID },
        type: {type: GraphQLString},
        title: {type: GraphQLString},
        detail: {type: GraphQLString},
        storyLineId: {type: GraphQLID},
        dateCreated: {type: GraphQLString},
        creator: { 
            type: CharacterType,
            resolve(parent:any, args:any){
                return character.findOne({_id: parent.creatorId},function(err:Error, data:any){
                    if (err) console.log(err)
                    return data
                })
            }
        }
        
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        worlds: {
            type: GraphQLList(WorldType),
            resolve(parent:any, args:any){
                return world.find({}, function(err: Error, doc:any){
                    if (err) console.log(err)
                    return doc
                })
            }
        }
    })
})