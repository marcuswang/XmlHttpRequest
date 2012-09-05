/**
 * Created with JetBrains WebStorm.
 * User: mrj
 * Date: 12-8-11
 * Time: 下午7:45
 * To change this template use File | Settings | File Templates.
 */
function upload(){
    var droperea = document.getElementById("dropBox");
    var list=document.getElementById("list");
    var txterea=document.getElementById("txterea");
    droperea.addEventListener("dragenter", function(e){
        e.preventDefault();
        droperea.style.backgroundColor = "grey";
    }, false);
    droperea.addEventListener("dragleave", function(e){
        e.preventDefault();
        droperea.style.backgroundColor = "white";
    }, false);
    droperea.addEventListener('drop', function(e) {
        e.stopPropagation();
        e.preventDefault();
        droperea.style.backgroundColor = "white";
        var fileList  = e.dataTransfer.files,//获取拖拽文件
            fileType = fileList[0].type,
            fileName = fileList[0].name,
            fileSize = fileList[0].size,
            div = document.createElement('div'),
            reader = new FileReader();
        reader.readAsDataURL(fileList[0]);//这里只取拖拽的第一个，实际中你可以遍历处理file列表
        reader.onload = function(e) {
            div.src=this.result;
            var prog=0;
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            var url = "/upload?fileName=" + fileName+'&fileSize='+fileSize;
            console.log(fileList[0]);
            formData.append("uploadFile", fileList[0]);
            xhr.open('POST', url, true);
            xhr.onload = function(e) {};
            // Listen to the upload progress.
            var progressBar = document.querySelector('progress');
            xhr.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    progressBar.value = (e.loaded / e.total) * 100;
                    prog= progressBar.value; // Fallback for unsupported browsers.
                }
            };
            xhr.send(formData);  // multipart/form-data
//            xhr.send(fileList[0]);

            div.innerHTML="name  :"+fileName ;
            list.appendChild(div);
            txterea.style.display="none";
        };
    },false);
    droperea.addEventListener("dragenter", function(e){
        droperea.style.borderColor = 'gray';
    }, false);
    droperea.addEventListener('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
    },false);

}