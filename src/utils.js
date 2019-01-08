const request = require('request')

async function githubApi(api) {
    let url = "https://api.github.com" + api;
    let options = {
        url: url,
        method: "GET",
        headers: {
            'user-agent': 'node.js'
        }
    };

    return new Promise(function(resolve, reject) {
        request.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        });
    });
}

function parseArgsFromGithubUrl(url) {
    let githubAddressWithRefRe = new RegExp('https?:\/\/github.com\/(.+)\/(.+)\/tree\/(.+)');
    let githubAddressWithoutRefRe = new RegExp('https?:\/\/github.com\/(.+)\/(.+)');
    let githubRepoArgs = {};
    let withRefMatchResult = url.match(githubAddressWithRefRe);
    if (withRefMatchResult) {
        githubRepoArgs['owner'] = withRefMatchResult[1];
        githubRepoArgs['name'] = withRefMatchResult[2];
        githubRepoArgs['ref'] = withRefMatchResult[3];
        return githubRepoArgs;
    }
    let withoutRefMatchResult = url.match(githubAddressWithoutRefRe);
    if (withoutRefMatchResult) {
        githubRepoArgs['owner'] = withoutRefMatchResult[1];
        githubRepoArgs['name'] = withoutRefMatchResult[2];
        return githubRepoArgs;
    } else {
        throw "invalid address";
    }
}

function encodeQueryData(url, data) {
    const ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return url + '?' + ret.join('&');
 }

module.exports = {
    githubApi,
    parseArgsFromGithubUrl,
    encodeQueryData
};