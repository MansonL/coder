import { connect } from "mongoose";
export const clientPromise = connect(mongoUrl).then(m => {
    console.log('Base de datos mongo conectada');
    return m.connection.getClient();
  });