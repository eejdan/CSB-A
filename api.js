console.log("Concurs Severin Bumbaru - Echipa Agape si Metanoia 2021")
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');

const rp = require('request-promise-native');
const jsdom = require('jsdom');

const app = express();

app.get('/traseu/trs', (req, res) => {

})


async function updateTransurb() {
    let options = { 
        method: 'GET',
        uri: "https://transurbgalati.ro/program-circulatie/",
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
        }
    };

    return new Promise((resolve, reject) => {
        rp(options).then(html => {
            let dom = new jsdom.JSDOM(html);
            let links = (dom.window.document).querySelectorAll('.entry-content a');
            prebuild = []; build = []; 
            getTraseeRegex = `alt="([0-9]+)`;
            links.forEach(unit => {
                let currentPos = prebuild.length;
                prebuild[currentPos] = unit.outerHTML;
               // console.log(prebuild[currentPos]);
                let findings = prebuild[currentPos].match(getTraseeRegex);
               // console.log(findings);
                if(findings) {
                    currentFinds = findings[0].split('"');
                    build[build.length] = currentFinds[currentFinds.length-1]+'';
                }
            })
            let semibuild = {};
            // console.log(build);
            let finalbuild = {};
            build.forEach(trsHandle => {
                semibuild[trsHandle+''] = { 'tur': {}, 'retur': {} }
            })
            build.forEach(trsHandle => {
                let trsoptions = options;
                trsoptions.uri = `https://transurbgalati.ro/trs-${trsHandle}`
                rp(trsoptions).then(xhtml => {
                    let xdom = new jsdom.JSDOM(xhtml);
                    let xlinks = (xdom.window.document).querySelectorAll('.entry-content a');
                    xlinks.forEach(unit => {
                        console.log(unit.outerHTML)//semibuild[trsHandle+'']
                        unit.getAttribute('href');
                    })
                    console.log(trsHandle);
                }).catch(err => {
                    trsoptions.uri = `https://transurbgalati.ro/statii-traseul-${trsHandle}`
                    rp(trsoptions).then(xhtml => {
                        let xdom = new jsdom.JSDOM(xhtml);
                        let xlinks = (xdom.window.document).querySelectorAll('.entry-content a');
                        xlinks.forEach(unit => {
                            console.log(unit);
//
                        // console.log(unit.outerHTML);
                        })
                    })
                });
            })
            
            resolve(finalbuild)
        }).catch(err => reject(err));
    });
}
updateTransurb().then(a => {
    console.log("outside function")
    console.log(a);
}).catch(err => console.log(err));