let csvToJson = require('convert-csv-to-json');
const { createHash } = require('node:crypto')
const { csvAppend } = require('csv-append');


function sha256(content){
    return createHash('sha256').update(content).digest('hex');
}

//  Converts the .csv file into JSON format
let array = [];
let json = csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv("NFT Naming csv - All Teams.csv");
for(let i=0; i<json.length;i++){
    array.push(json[i]);
    
}


// Generates SHA256 hash
array.map(item => {
    item['hash'] = sha256(JSON.stringify(item))
    return item;
})

console.log(array)

// // Changes JSON file back to .cs file
const RELATIVE_PATH_TO_CSV = `output.csv`;
const { append, end } = csvAppend(RELATIVE_PATH_TO_CSV, true);

append(array);
end();
