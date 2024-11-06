const pool = require ("./PoolService")

async function select (field,tableName,whereClause,args) 
{
    let response = {}
    try 
    {
        let sqlString = pool.format (`select ${field} from ${tableName} ${whereClause || ""}`,args)
        let [res] = await pool.query(sqlString)
        response.res = res
        response.success = true
    } 
    catch (error) 
    {
        response.res = error
        response.success = false
    }
    finally 
    {
        return response
    }
}

async function insert (tableName,obj,id)
{
    let response = {}
    try
    {
        let sqlString = pool.format (`insert into ${tableName} set ?`,obj)
        let [detail] = await pool.query (sqlString)
        let addedObj = await select ("*",tableName,`where ${id} = ?`,[detail.insertId])
        response.res = addedObj.res
        response.success = true
    }
    catch (error)
    {
        response.res = error
        response.success = false
    }
    finally 
    {
        return response
    }
}

async function update (tableName,obj,whereClause,args,id) 
{
    let response = {}
    try 
    {
        if (Array.isArray (id))
        {
            for (let elem of id) delete obj[elem]
        }
        else delete obj[id]
        let queryString = Object.keys (obj).reduce ((acc,elem,index,arr) => {
            let str = `${acc} ${elem} = ?`
            if (index < arr.length - 1) str += ","
            return str
        }, `update ${tableName} set`) 

        queryString += ` ${whereClause || ""}`
        let sqlString = pool.format (queryString, Object.values (obj).concat (args || []) )
        await pool.query (sqlString)
        let updatedObj = await select ("*", tableName, whereClause, args)
        response.res = updatedObj.res
        response.success = true
    } 
    catch (error)
    {
        response.res = error
        response.success = false
    }
    finally 
    {
        return response
    }
}

async function remove (tableName, whereClause, args) 
{
    let response = {}
    try 
    {
        let sqlString = pool.format (`delete from ${tableName} ${whereClause || ""}`,args)
        let [detail] = await pool.query (sqlString)
        response.res = detail
        response.success = true
    }
    catch (error) 
    {
        response.res = error
        response.success = false   
    }
    finally
    {
        return response
    }
}

async function insertWithManualPrimaryKey(tableName,obj,ids) 
{
    let response = {}
    try
    {
        let sqlString = pool.format (`insert into ${tableName} set ?`,obj)
        await pool.query (sqlString)
        
        let argSelect = []
        let sqlStringSelect = ids.reduce ((acc,elem,index,arr) => {
            let str = `${acc} ${elem} = ?`
            if (index < arr.length - 1) str += " and "
            argSelect.push (obj[elem])
            return str
        }, `where `) 

        let addedObj = await select ("*",tableName,sqlStringSelect,argSelect)
        response.res = addedObj.res
        response.success = true
    }
    catch (error)
    {
        response.res = error
        response.success = false
    }
    finally 
    {
        return response
    }       
}

async function selectWithJoin(field,tableName,joinClause,whereClause,args) 
{
    let response = {}
    try 
    {
        let sqlString = pool.format (`select ${field} from ${tableName} ${joinClause} ${whereClause || ""}`,args)
        let options = {sql: sqlString, nestTables: true}
        let [res] = await pool.query(options)
        response.res = res
        response.success = true
    } 
    catch (error) 
    {
        response.res = error
        response.success = false
    }
    finally 
    {
        return response
    }
}

async function insertArrayWithManualPrimaryKey(tableName,fields,objs) 
{
    let response = {}
    try
    {
        let sqlFields = fields.join (",") 
        let args = []
        let sqlObjects = objs.map (elem => {

            let sqlObject = fields.map (field => { 
                args.push (elem[field])
                return "?"
            })
            return `(${sqlObject.join (",")})`
        })


        let sqlString = pool.format (`insert into ${tableName} (${sqlFields}) values ${sqlObjects.join (",")}`,args)
        console.log (sqlString)
        await pool.query (sqlString)
        
        response.res = objs
        response.success = true
    }
    catch (error)
    {
        response.res = error
        response.success = false
    }
    finally 
    {
        return response
    }       
}

module.exports = {select,insert,update,remove,insertWithManualPrimaryKey, selectWithJoin, insertArrayWithManualPrimaryKey}