import mongoose from "mongoose";
import {config} from "../config.mjs";
import {Attempt} from "./Schemas/Attempt.mjs"
import {Day} from "./Schemas/Day.mjs";
import {Query} from "./Schemas/Query.mjs";
import {Name} from "./Schemas/Name.mjs";
import {User} from "./Schemas/User.mjs"

connect().catch(err => console.log(err))
export async function connect() {
  await mongoose.connect(config.mongoUrl, {
    authMechanism: 'DEFAULT',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin"
  });
}

// Queries
export async function createQuery(queryData) {
  const query = new Query(queryData)
  console.log(query)
  await query.save()
}
export async function getLastQuery(userid) {
  const query = Query.findOne({userId: userid})
    .sort({time: -1})
  return await query.exec()
}

// Attempts
export async function createAttempt(attemptData) {
  const attempt = new Attempt(attemptData)
  // console.log(attempt)
  await attempt.save()
}

export async function getLastAttempt(userid) {
  const query = Attempt.findOne({userid: userid})
    .sort({time: -1})
  // query.select('userName size cockName')
  return await query.exec();
}

// Days
export async function createDay(dayData) {
  const day = new Day(dayData)
  await day.save()
}

export async function getCurrentDay() {
  const query = Day.findOne().sort({date: -1}).limit(1)
  // console.log(await res.date)
  return await query.exec()
}

// Names
export async function createNewName(nameData) {
  const name = new Name(nameData)
  await name.save()
}

export async function getNames() {
  const q = await Name.findOne()
  return q.exec()
}

// Users
export async function getUserById(userid) {
  const query = User.findOne({userid: userid})
  return await query.exec()
}

export async function newUser(userdata) {
  const user = new User(userdata)
  await user.save()
}

export async function getTopThreeUsers() {
  const users = User.find().where('cockStats.currentSize').gt(0).limit(3).sort({'cockStats.currentSize': 1})
  return await users.exec();
}

export async function cleanAllCurrentSizes() {
  const query = User.updateMany({}, {'cockStats.currentSize': null})
  await query.exec()
}