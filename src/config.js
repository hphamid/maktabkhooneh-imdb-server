config.authInstanceId = "<<X-Backtory-Authentication-Id>>";
config.objectSorageInstanceId = "<<X-Backtory-Object-Storage-Id>>";
config.integratedMasterKey = "<<X-Backtory-Authentication-Key (Master)>>";
config.clientKey = "<<X-Backtory-Authentication-Key (Client)>>";
config.cloudCode = "<<Cloud-Code-Id>>";
config.cdnInstanceId = "<<X-Backtory-Storage-Id>>";

config.baseUrl = "http://storage.backtory.com/<<cdn address>>";


config.lambdaHeaders =
    {
        'x-backtory-authentication-id': config.authInstanceId,
        'x-backtory-cache-mode': "No-Cache"
    };
module.exports = config;