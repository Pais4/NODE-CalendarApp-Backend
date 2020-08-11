const { Schema, model } = require('mongoose');

const EventSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        /* ESTO LE INDICA A MONGOOSE QUE VA A SER UNA REFERENCIA */
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

/* VAMOS A SOBREESCRIBIR EL SERIALIZADOR TOJSON */
EventSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model( 'Event', EventSchema );