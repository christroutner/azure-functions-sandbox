// Global npm libraries
const { app } = require('@azure/functions');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request
var TYPES = require('tedious').TYPES;

app.http('readSqlHttpTrig', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';

        const readSql = () => {
            return new Promise((resolve, reject) => {
                try {

                    var _currentData = {};

                    const config = {
                        server: 'sqltestserver532.database.windows.net',
                        options: {encrypt: true, database: 'trouttest01'},
                        authentication: {
                            type: "default",
                            options: {
                                userName: 'ctroutner',
                                password: 'L0ngpa$$word4sql',
                            }
                        }
                    };
            
                    const connection = new Connection(config);
                    connection.on('connect', function(err) {
                        if(err) {
                            console.log('Error: ', err)
                        }
            
                        context.log("Connected");
                        getPerformance();

                        
                    });
            
                    function getPerformance() {
            
                        const sqlRequest = new Request("SELECT 'Best' = MIN(FivekmTime), 'Average' = AVG(FivekmTime) FROM RunnerPerformance;", function(err) {
                            if (err) {
                                context.log(err);
                            }
                        });
                    
                        sqlRequest.on('row', function(columns) {
                            _currentData.Best = columns[0].value;
                            _currentData.Average = columns[1].value;;
                            context.log(_currentData);
                        });
                    
                        sqlRequest.on('requestCompleted', function () {
                            saveStatistic();
                        });
                        connection.execSql(sqlRequest);
                    }
                    
                    
                    function saveStatistic() {
                    
                        const sqlRequest = new Request("UPDATE Statistic SET BestTime=@best, AverageTime=@average;", function(err) {
                         if (err) {
                            context.log(err);}
                        });
                        sqlRequest.addParameter('best', TYPES.Int, _currentData.Best);
                        sqlRequest.addParameter('average', TYPES.Int, _currentData.Average);
                        sqlRequest.on('row', function(columns) {
                            columns.forEach(function(column) {
                              if (column.value === null) {
                                context.log('NULL');
                              } else {
                                context.log("Statistic Updated.");
                                
                              }
                            });
                            return resolve()
                        });
                    
                        connection.execSql(sqlRequest);
                    }
            
                    // Initialize the connection.
                    connection.connect();
                } catch(err) {
                    console.error('Error in readSql(): ', err)
                    return reject(err)
                }
            })
        }

        context.log('Calling readSql()')
        await readSql()
        context.log('readSql() has resolved.')

        return { body: `Hello, ${name}!` };
    }
});



