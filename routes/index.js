
/*
 * GET home page.
 */
var fs = require("fs");
var projectPath=__dirname.substring(0,__dirname.indexOf("/routes"));
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
//exports.upload =function(req, res,next) {
//    var fileName=req.param('fileName');
//    var fileSize=req.param('fileSize');
//    console.log(req.headers);
//    console.log(req.files);
//    var target_path =projectPath+'/public/upload/' + fileName ;
//    var wOption = {flags: 'w',encoding: null,mode: 0777};
//    var fileStream = fs.createWriteStream(target_path,wOption);
//    req.pipe(fileStream, { end: false });
//    req.on('end', function() {
//        console.log("传输完毕！");
//        var transfer;
//        fs.stat(target_path, function (err, data) {
//             if (err) throw err;
//             transfer=String(data.size);
//             console.log("tmp file's size :",data.size);
//             console.log("the received size is :",fileSize);
//             if(transfer==String(fileSize)){
//                    res.send({success:true});
//             }else{
//                 fs.rmdirSync(target_path,function(){
//                       console.log("删除上传时的缓存文件"+fileName +"成功!")
//                 });
//                 res.send({error:"文件在传输的过程中有丢失,传输失败!"});
//             }
//        });
//    });
//};

exports.upload=function(req,res){
//    console.log(req.headers);
//    console.log(req);
    var tmp_path = req.files.uploadFile.path; // 获得文件的临时路径
    var target_path = './public/upload/' +req.files.uploadFile.name;// 指定文件上传后的目录
    fs.rename(tmp_path, target_path, function(err) { // 移动文件
        if (err) throw err;
        fs.unlink(tmp_path, function() {// 删除临时文件夹文件,
            if (err) throw err;
            res.end();
        });
    });
};