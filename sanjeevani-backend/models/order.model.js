var conn=require('../config/dbconfig');
var mysql=require('mysql');
var common=require('./common');

class Order{

   async medicineCreate(data,callback)
    {
        var dstr=common.generateString(6)
        var dnum=common.generateNumber(18)
        var order_no=dstr+dnum;
        data.order.order_no=order_no;

        var sql=`INSERT INTO orders SET created_at=NOW(), ?`;

       var orderId= await new Promise((resolve,reject)=>{
            conn.query(sql,data.order,(err,result)=>{
                if(err) throw err;

                if(result.insertId)
                {
                    resolve(result.insertId)
                }else{
                    resolve(null)
                }
            })
        })

        
        

    }



    




}

module.exports=new Order();