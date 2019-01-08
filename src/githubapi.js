const utils = require('./utils');

class GithubApi {

    constructor(account) {
        if (account) {
            this.auth = true;
            this.username = account.username;
            this.password = account.password;
        } else {
            this.auth = false;
        }
    }

    async callApi(api, params) {
        if (!GithubApi.prototype.hasOwnProperty(api)) {
            throw "unsupported api";
        }
        return this[api](params);
    }

    async contents(params) {
        let api = `/repos/${params['owner']}/${params['name']}/contents`;
        if (params['ref']) {
            api = utils.encodeQueryData(api, {
                ref: params['ref']
            });
        }

        return await utils.githubApi(api);
    }
}

module.exports = GithubApi;