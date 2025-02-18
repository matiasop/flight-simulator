import mongoose, { Document, Schema } from 'mongoose';

export interface IPassenger extends Document {
  id: number;
  name: string;
  hasConnections: boolean;
  age: number;
  flightCategory: 'Black' | 'Platinum' | 'Gold' | 'Normal';
  reservationId: string;
  hasCheckedBaggage: boolean;
}

export interface IFlight extends Document {
  flightCode: string;
  passengers: IPassenger[];
}

const PassengerSchema: Schema<IPassenger> = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  hasConnections: { type: Boolean, required: true },
  age: { type: Number, required: true },
  flightCategory: { type: String, required: true },
  reservationId: { type: String, required: true },
  hasCheckedBaggage: { type: Boolean, required: true },
});

const FlightSchema: Schema<IFlight> = new Schema({
  flightCode: { type: String, required: true, unique: true },
  passengers: { type: [PassengerSchema], required: true },
});

export const Flight = mongoose.model<IFlight>('Flight', FlightSchema);
