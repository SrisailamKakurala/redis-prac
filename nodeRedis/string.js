const client = require('./client');

async function init() {
    await client.set('name', 'John Doe');
    await client.expire('name', 10); // expires in 10 seconds
    const name = await client.get('name');
    console.log(name); // John Doe
}

init();