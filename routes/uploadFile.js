/**
 * Created by JetBrains WebStorm.
 * User: wangjun
 * Date: 12-8-30
 * Time: 下午6:13
 * To change this template use File | Settings | File Templates.
 */

//处理使用formdata上传的数据
//var util=require('util')
var fs = require("fs");
//exports.upload = function(req, res){
//    console.log(req.headers);
//    console.log(req.files);
//    var tmp_path = req.files.imgData.path; // 获得文件的临时路径
//    var target_path = './public/upload/' +req.files.imgData.name;// 指定文件上传后的目录
//    fs.rename(tmp_path, target_path, function(err) { // 移动文件
//        if (err) throw err;
//        fs.unlink(tmp_path, function() {// 删除临时文件夹文件,
//            if (err) throw err;
//            res.end();
//        });
//    });
//};

//处理使用直接上传文件对象方法上传的数据：
var projectPath=__dirname.substring(0,__dirname.indexOf("/routes"));//取得项目的路径
exports.upload=function (req,res){

    var fileName=req.param('fileName');//获取param中文件的信息
    var fileSize=req.param('fileSize');
    var target_path =projectPath+'/public/upload/' + fileName ;
    console.log(target_path);
    var wOption = {flags: 'w',encoding: null,mode: 0777};
    var fileStream = fs.createWriteStream(target_path,wOption);
    req.pipe(fileStream, { end: false });
    req.on('end', function() {
        console.log("传输完毕！");
        var transfer;
        fs.stat(target_path, function (err, data) {
            if (err) throw err;
            transfer=String(data.size);
            console.log("tmp file's size :",data.size);
            console.log("the received size is :",fileSize);
            if(transfer==String(fileSize)){
                res.send({success:true});
            }else{
                res.send({error:"文件在传输的过程中有丢失,传输失败!"});
            }
        });
    });

};