import admin from 'firebase-admin'
import * as firebaseAcc from '../ecommerce-bfca0-firebase-adminsdk-1nyf8-674481c917.json'
import { ServiceAccount } from 'firebase-admin';
import { data } from './mockData';



CRUD();

async function CRUD (){

    admin.initializeApp({
        credential: admin.credential.cert(firebaseAcc as ServiceAccount)
    })
    const db = admin.firestore();
    const productsColl = db.collection('products');
    
    /**
     * 
     * Create
     *
     *
     */
    (await productsColl.get()).docs.
    data.forEach(async data => {
        await productsColl.doc().create(data);
      });
     

    /**
     * 
     * Read 
     * 
     */
    
    try {
        const products = (await productsColl.get()).docs;
        const log = products.map(product => {
            return {
                id: product.id,
                title:product.data().title,
                description:product.data().description,
                img:product.data().img,
                code:product.data().code,
                timestamp:product.data().timestamp,
                stock:product.data().stock,
                price:product.data().price,
            }
        })
        console.log(log)
    } catch (error) {
        console.log(error)   
    }

    /**
     * 
     * Update
     * 
     */
    
}