const fetch = require('node-fetch')
const xmljs = require('xml-js')

async function searchTotoz(query) {
    const res = await fetch(
        'https://totoz.eu/search.xml?terms=' + 
        encodeURIComponent(query))
    const xml = await res.text()

    const obj = xmljs.xml2js(xml,{compact: true})

    const totozList = obj.totozes.totoz.length ? obj.totozes.totoz : [obj.totozes.totoz]
    const totozNamesStr = totozList.map(t => t.name._text).join('\n')

    console.log(totozNamesStr)
}

if (process.argv[2]) {
    searchTotoz(process.argv[2])
        .catch(err => console.error(err.message))
}
else
    console.error("Syntax: npm start QUERY")
