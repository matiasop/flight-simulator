import { Flight, IFlight, IPassenger } from '../models/Flight';

class FlightDAO {
  static async create(flightCode: string): Promise<IFlight> {
    const newFlight = new Flight({ flightCode, passengers: [] });
    return await newFlight.save();
  }

  static async getAll(): Promise<IFlight[]> {
    return await Flight.find();
  }

  static async getByFlightCode(flightCode: string): Promise<IFlight | null> {
    return await Flight.findOne({ flightCode });
  }

  static async deleteFlight(flightCode: string): Promise<void> {
    await Flight.deleteOne({ flightCode });
  }

  static async setPassengers(
    flightCode: string,
    passengers: IPassenger[],
  ): Promise<IFlight | null> {
    return await Flight.findOneAndUpdate({ flightCode }, { passengers }, { new: true });
  }

  static async addPassenger(flightCode: string, passenger: IPassenger): Promise<IFlight | null> {
    return await Flight.findOneAndUpdate(
      { flightCode },
      { $push: { passengers: passenger } },
      { new: true },
    );
  }

  static async removePassenger(flightCode: string, passengerId: number): Promise<IFlight | null> {
    return await Flight.findOneAndUpdate(
      { flightCode, 'passengers.id': passengerId },
      { $pull: { passengers: { id: passengerId } } },
      { new: true },
    );
  }
}

export default FlightDAO;
