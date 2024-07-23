const conn = require("../config/dbconfig");

class Common{



    // check duplicate entry
    duplicate(columnNames,tableName,callback)
    {
        var sql=`SELECT * FROM ${tableName} WHERE `;

        var temp="";

        for(var i of columnNames)
        {
            if(temp.length>0)
            temp+=` AND ${i.name}='${i.value}' `;
            else
            temp+=` ${i.name}='${i.value}' `;
        }

        sql=sql+temp;

        conn.query(sql,(err,result)=>{
            if(err) throw err;

            if(result.length>0)
            callback(true,result);
            else 
            callback(false,null);
        })

    }


    generateString(length) {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    
        return result;
    }
    
    generateNumber(length) {
        const characters ='0123456789';
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    
        return result;
    }

}

module.exports=new Common();