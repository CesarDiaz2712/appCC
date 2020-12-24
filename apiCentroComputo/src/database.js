const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/centrocomputoBD', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})

.then(db => console.log('BD is connected'))
.catch(err => console.error(err));