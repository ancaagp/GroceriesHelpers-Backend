const db = require('./models');

const groceries = [
    {
        groceries: '3 apples, baking soda',
        timeline: 'Today',
        description: 'I want to bake a cake.',
        photo: '',
        status: 'In progress',
        completed: false,
        address: '2259 Union Street',
        lat: 37.884172,
        lng: -122.401558
    },
    {
        groceries: '1 sourdough bread, 4 tomatoes',
        timeline: 'Today',
        description: 'My fridge is empty.',
        photo: '',
        status: 'In progress',
        completed: false,
        address: '2245 Union Street',
        lat: 37.784179,
        lng: -122.501560
    },
    {
        groceries: 'a box of tampons, toilet paper',
        timeline: 'Today',
        description: 'I ran out of it',
        photo: '',
        status: 'In progress',
        completed: false,
        address: '254 Union Street',
        lat: 37.787994,
        lng: -122.407437
    }
]

db.GroceriesList.deleteMany({}, (err, result) => {
    if (err) {
        console.log(err);
        process.exit();
    }
    console.log(`Successfully deleted ${result.deletedCount} groceries.`);

    db.GroceriesList.create(groceries, (err, newGroceries) => {
        if (err) {
            console.log(err);
            process.exit();
        }
        console.log(`Successfully created ${newGroceries.length} groceries.`);
        process.exit();
    })
})