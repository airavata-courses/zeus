var zk = require('node-zookeeper-client')
var publicIp = require('public-ip')

var url = '149.165.170.230:2181'; 
var homePath = '/zeus';
var nodePath = '/node';
var client


module.exports = {
    zkCreateClient: async function (port) {
        client = zk.createClient(url, {retries: 2})  // Connect ZK
        
        var ip = await publicIp.v4()
        const buffer = new Buffer.from(JSON.stringify({
            host: ip,
            port: port
        }))
        client.connect();

        await client.create(homePath, buffer, zk.CreateMode.EPHEMERAL, function (error) {
            if (error) {
                console.log('Failed to create node: %s due to: %s.', homePath, error);
            } else {
                console.log('Node: %s is successfully created.', homePath);
            }
        });

        await client.create(homePath+nodePath, buffer, zk.CreateMode.EPHEMERAL, function (error) {
            if (error) {
                console.log('Failed to create node: %s due to: %s.', homePath+nodePath, error);
            } else {
                console.log('Node: %s is successfully created.', homePath+nodePath);
            }
        });

        var instance = homePath+nodePath+'/node'+ ip + port
        await client.create(instance, buffer, zk.CreateMode.EPHEMERAL, function (error) {
            if (error) {
                console.log('Failed to create node: %s due to: %s.', instance, error);
            } else {
                console.log('Node: %s is successfully created.', instance);
            }
        });

        this.checkExistance(instance);
        this.serviceDiscovery(instance);
        var useMe = this;
        await client.getChildren('/zeus/node',function(error, data){
            if(error){
                console.log("error");
            }else{
                for(var i = 0; i<data.length;i++){
                    var tmp = '/zeus/node/'+data[i];
                    client.getData(tmp, function(error, data){
                        if(error){
                            console.log("error getting data");
                        }else{
                            console.log(data.toString('utf8'));
                        }
                    });
                }
            }
        })
    },

    checkExistance: async function (serviceName) {
        return await client.exists(serviceName, function (error, stat) {
            if (error) {
                console.log(error.stack);
                return false
            }
        
            if (stat) {
                console.log('Node exists.');
                return true
            } else {
                console.log('Node does not exist.');
                return false
            }
        });
    },

    serviceDiscovery: async function (serviceNode) {
        return await client.getData(serviceNode, function (error, data, stat) {
            if (error) {
                console.log(error.stack);
                return false
            }
            data = data.toString('utf8')
            console.log('Got data: ', data)
            return data
        })
    },

    listChildren: async function (path) {
        return await client.getChildren(
            path,
            function (event) {
                console.log('Got watcher event: %s', event);
                listChildren(client, path);
            },
            function (error, children, stat) {
                if (error) {
                    console.log(
                        'Failed to list children of %s due to: %s.',
                        path,
                        error
                    );
                    return;
                }
     

                console.log('Children of %s are: %j.', path, children);
                return children;
            }
        );    
    },
 
}
