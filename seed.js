const db = require('./models');

const groceries = [
    {
        groceries: '3 apples, baking soda',
        timeline: 'Today',
        description: 'I want to bake a cake.',
        photo: '',
        status: 'In progress',
        completed: false,
    },
    {
        groceries: '1 sourdough bread, 4 tomatoes',
        timeline: 'Today',
        description: 'My fridge is empty.',
        photo: '',
        status: 'In progress',
        completed: false,
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