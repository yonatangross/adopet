import mongoose from 'mongoose';
import AdoptionRequest from '../models/adoptionRequest';
import PetSchema from '../models/pet'
import dbSeed from './dbSeed'

export default async (): Promise<void> => {
    const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@adopetcluster.ldypt.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
    const options = { useNewUrlParser: true, useUnifiedTopology: true };
    mongoose.set('useFindAndModify', false);

    await mongoose.connect(uri, options)
        .then(() => {
            console.log(`connected to ${process.env.MONGO_DB}`);
        }).catch((error: Error) => {
            console.log(`db entering failed! ${error}`);
            throw error;
        });

    let petSchemaExist: boolean = false;

    if (await PetSchema.collection.countDocuments() != 0) {
        petSchemaExist = true;
    }

    if (!petSchemaExist) {
        new dbSeed();
        petSchemaExist=true;
    }
    if(await AdoptionRequest.collection.countDocuments()>50){
        const adoptionRequests = await AdoptionRequest.aggregate([{ $group: { _id: "$pet", adoptionRequests: { $push: "$_id" } } }])
        console.log(`adoptionRequests:`);
        console.log(adoptionRequests);
    }
};

