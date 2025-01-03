const client = require('./client');

async function init() {
    await client.set('name', 'John Doe');
    const name = await client.get('name');
    console.log(name); // John Doe
}

init();