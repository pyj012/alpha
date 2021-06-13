
var http = require('http');
var fs = require('fs');
var url = require('url');
const { ifError } = require('assert');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname=url.parse(_url, true).pathname;
    if(pathname=='/')
    {
         if(queryData.id==undefined)
            {
                        fs.readdir('./data',function(err, filelist){
                            console.log(filelist);
                            var title='Alpha';
                            var description='click something';
                            var list='<ul>';
                            var i=0;
                            while(i<filelist.length){
                                list=list+`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                                i=i+1;
                            }   
                            list=list+'</ul>'; 
                        var subtitle='click';
                        var template=`
                        <!DOCTYPE html>
                        <html lang="ko" dir="ltr">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>${title}</title>
                        </head>
                        <body>
                            <h1><a href='/'>${title}</a></h1>
                            ${list} 
                            <h2>${subtitle}</h2>
                            ${description}
                        </body>
                        </html>
                        `;
                        response.writeHead(200);
                        response.end(template);
                        });     
                        
            }
            else
            {
             fs.readFile(`./data/${queryData.id}`, 'utf8', function(err,description){
                    fs.readdir('./data',function(err, filelist){
                        console.log(filelist);
                        var list='<ul>';
                        var i=0;
                        while(i<filelist.length){
                            list=list+`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                            i=i+1;
                        }   
                        list=list+'</ul>';
                    var title='Alpha'
                    var subtitle=queryData.id;
                    var template=`
                    <!DOCTYPE html>
                    <html lang="ko" dir="ltr">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${title}</title>
                    </head>
                    <body>
                        <h1><a href='/'>${title}</a></h1>
                        ${list}
                        <h2>${subtitle}</h2>
                        ${description}
                    </body>
                    </html>
                    `;
                    response.writeHead(200);
                    response.end(template);
                    });
                
                });
            }
        }
   
        else{
            response.writeHead(404);
            response.end('Not found');
           }
});
app.listen(3000);