import {SqliteConnection} from "ts-sql-query/connections/SqliteConnection";
import {SqliteDateTimeFormat, SqliteDateTimeFormatType} from "ts-sql-query/connections/SqliteConfiguration";
import {ConsoleLogQueryRunner} from "ts-sql-query/queryRunners/ConsoleLogQueryRunner";
import {Sqlite3QueryRunner} from "ts-sql-query/queryRunners/Sqlite3QueryRunner";
import {Table} from "ts-sql-query/Table";
import {Database} from 'sqlite3';

// const sqlite3 = require('sqlite3').verbose();

const db = new Database('db');

class DBConnection extends SqliteConnection<'DBConnection'> {
    protected uuidStrategy = 'string' as const

    protected getDateTimeFormat(_type: SqliteDateTimeFormatType): SqliteDateTimeFormat {
        return 'UTC as text'
    }
}

// tables
const tCockSize = new class TCockSize extends Table<DBConnection, 'TCockSize'> {
    username = this.column('username', 'string');
    minSize = this.column('mincock', 'double');
    attempts = this.column('attempts', 'int')
    lastUsed = this.column('last_used', 'localDateTime')
    wins = this.column('wins', 'int')
    constructor() {
        super('cocksizes'); // table name in the database
    }
}()

const tCockSizeQueries = new class TCockSizeQueries extends Table<DBConnection, 'TCockSizeQueries'> {
    id = this.autogeneratedPrimaryKey('id', 'int')
    username = this.column('username', 'string')
    size = this.column('size', 'double')

    constructor() {
        super('cocksize_queries')
    }
}()

const tCockNames = new class TCockNames extends Table<DBConnection, 'TCockNames'> {
    id = this.autogeneratedPrimaryKey('id', 'int')
    timesUsed = this.column('times_used', 'int')
    cockName = this.column('cockname', 'string')
    addedOn = this.column('added_on', 'localDateTime')
    addedBy = this.column('added_by', 'string')

    constructor() {
        super('cocknames')
    }
}

// functions
export async function getLastCockSizeUsageByUsername(username:string){
    const connection = new DBConnection(new ConsoleLogQueryRunner(new Sqlite3QueryRunner(db)))

    // await connection.beginTransaction()
    try {
        return await connection
            .selectFrom(tCockSize)
            .where(tCockSize.username.equals(username))
            .selectOneColumn(tCockSize.lastUsed)
            .executeSelectOne()
            .catch()
    }
    catch (e) {
    }
}

export async function insertQuery(username:string, size: number) {
    const connection = new DBConnection(new ConsoleLogQueryRunner(new Sqlite3QueryRunner(db)))
    try {
        await connection
            .insertInto(tCockSizeQueries)
            .set({
                username: username,
                size: size
            })
            .executeInsert();
    } catch (e) {

    }
}
export async function getLastQueryByUser(username:string) {
    const connection = new DBConnection(new ConsoleLogQueryRunner(new Sqlite3QueryRunner(db)))
    try {
        const i = await connection
            .selectFrom(tCockSizeQueries)
            .where(tCockSizeQueries.username.equals(username))
            .selectOneColumn(tCockSizeQueries.size)
            .orderBy(tCockSizeQueries.id, 'desc')
            .limit(1)
            .executeSelectOne()
        console.log(i)
        if (i) {
            return i
        }
        else {
            return 0
        }
    } catch (e) {
        return 0
    }
}

export async function updateCockSize(username:string, size:number) {
    const connection = new DBConnection(new ConsoleLogQueryRunner(new Sqlite3QueryRunner(db)))

    try {
        const date = new Date(Date.now())
        const dateValue = connection.const(date, 'localDateTime')
        await connection
            .update(tCockSize)
            .set({
                minSize: size,
                lastUsed: dateValue,
                attempts: tCockSize.attempts.add(1)
            })
            .where(tCockSize.username.equals(username))
            .executeUpdate();
    } catch (e) {
        console.log(e)
    }
}

export async function insertNewCock(username:string, size:number) {
    const connection = new DBConnection(new ConsoleLogQueryRunner(new Sqlite3QueryRunner(db)))
    const date = new Date(Date.now())
    const dateValue = connection.const(date, 'localDateTime')

    try {
        await connection
            .insertInto(tCockSize)
            .set({
                username: username,
                minSize: size,
                attempts: 1,
                lastUsed: dateValue,
                wins: 0
            })
            .executeInsert();
    } catch (e) {

    }
}

export async function getWinner() {
    const connection = new DBConnection(new ConsoleLogQueryRunner(new Sqlite3QueryRunner(db)))

    return await connection
        .selectFrom(tCockSize)
        .select({
            username: tCockSize.username,
            attempts: tCockSize.attempts,
            minSize: tCockSize.minSize
        })
        .orderBy(tCockSize.minSize, 'asc')
        .limit(1)
        .executeSelectOne()
}

export async function changeSizesOnWin() {
    const connection = new DBConnection(new ConsoleLogQueryRunner(new Sqlite3QueryRunner(db)))
    await connection
        .update(tCockSize)
        .set({
            attempts: 0,
            minSize: 100
        })
        .where(tCockSize.attempts.greaterThan(0))
        .executeUpdate();
}

export async function getCockSizeByUsername(username:string) {
    const connection = new DBConnection(new ConsoleLogQueryRunner(new Sqlite3QueryRunner(db)))

    return await connection
        .selectFrom(tCockSize)
        .selectOneColumn(tCockSize.minSize)
        .where(tCockSize.username.equals(username))
        .executeSelectOne()
}

export async function addAttempt(username:string) {
    const connection = new DBConnection(new ConsoleLogQueryRunner(new Sqlite3QueryRunner(db)))
    const date = new Date(Date.now())
    const dateValue = connection.const(date, 'localDateTime')
    await connection
        .update(tCockSize)
        .set({
            attempts: tCockSize.attempts.add(1),
            lastUsed: dateValue
        })
        .where(tCockSize.username.equals(username))
        .executeUpdate();
}

export async function getAttempts(username:string) {
    const connection = new DBConnection(new ConsoleLogQueryRunner(new Sqlite3QueryRunner(db)))

   try {
       return await connection
           .selectFrom(tCockSize)
           .selectOneColumn(tCockSize.attempts)
           .where(tCockSize.username.equals(username))
           .executeSelectOne()
   } catch (e) {
        console.log(e)
   }
}

export async function deleteQueries() {
    const connection = new DBConnection(new ConsoleLogQueryRunner(new Sqlite3QueryRunner(db)))
    await connection
        .deleteFrom(tCockSizeQueries)
        .where(tCockSizeQueries.size.isNotNull())
        .executeDelete();
}

export async function addWin(username:string) {
    const connection = new DBConnection(new ConsoleLogQueryRunner(new Sqlite3QueryRunner(db)))
    await connection
        .update(tCockSize)
        .set({
            wins: tCockSize.wins.add(1)
        })
        .where(tCockSize.username.equals(username))
        .executeUpdate()
}

export async function insertName(cockname:string, addedBy:string) {
    const connection = new DBConnection(new ConsoleLogQueryRunner(new Sqlite3QueryRunner(db)))
    await connection
        .insertInto(tCockNames)
        .set({
            cockName: cockname,
            timesUsed: 0,
            addedOn: connection.const(new Date(Date.now()), 'localDateTime'),
            addedBy: addedBy
        })
        .executeInsert()
}


export async function getTopThree() {
    const connection = new DBConnection(new ConsoleLogQueryRunner(new Sqlite3QueryRunner(db)))
    return await connection
        .selectFrom(tCockSize)
        .select({
            username: tCockSize.username,
            minSize: tCockSize.minSize,
            attempts: tCockSize.attempts,
            wins: tCockSize.wins
        })
        .orderBy(tCockSize.minSize, 'asc')
        .limit(3)
        .executeSelectMany()
}

export async function addCockName(cockname:string, author:string) {
    const connection = new DBConnection(new ConsoleLogQueryRunner(new Sqlite3QueryRunner(db)))
    try {
        await connection
            .insertInto(tCockNames)
            .set({
                cockName: cockname,
                addedBy: author,
                addedOn: connection.const(new Date(Date.now()), 'localDateTime'),
                timesUsed: 0
            })
            .executeInsert()
    } catch (e) {
        console.log(e)
    }
}