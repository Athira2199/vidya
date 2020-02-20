const fs = require('fs');
function readfile(folder){
    var l=[];
fs.readdirSync(folder).forEach(file => {
    l.push(file);
})
return l
};
const methods={
    readfile:readfile
}
module.exports=methods;