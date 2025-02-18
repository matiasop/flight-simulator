import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import FlightDAO from '../db/dao/FlightDAO';

const router: Router = express.Router();

router.post('/', async function (req: Request, res: Response) {
  const { flightCode } = req.body;

  if (!flightCode) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid body' });
  }

  try {
    const newFlight = await FlightDAO.create(flightCode);
    res.status(StatusCodes.CREATED).json(newFlight);
  } catch (error) {
    console.error('Error creating flight', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating flight' });
  }
});

router.get('/', async function (req: Request, res: Response) {
  try {
    const flights = await FlightDAO.getAll();
    res.status(StatusCodes.OK).json(flights);
  } catch (error) {
    console.error('Error getting flights', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error getting flights' });
  }
});

router.get('/:flightCode', async function (req: Request, res: Response) {
  const { flightCode } = req.params;

  if (!flightCode) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid params' });
  }

  try {
    const flight = await FlightDAO.getByFlightCode(flightCode);

    if (!flight) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'flight not found' });
    }

    res.status(StatusCodes.OK).json(flight);
  } catch (error) {
    console.error('Error getting flight', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error getting flight' });
  }
});

router.delete('/:flightCode', async function (req: Request, res: Response) {
  const { flightCode } = req.params;

  if (!flightCode) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid params' });
  }

  try {
    await FlightDAO.deleteFlight(flightCode);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    console.error('Error deleting flight', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting flight' });
  }
});

router.patch('/:flightCode/passengers', async function (req: Request, res: Response) {
  const { flightCode } = req.params;
  const passengers = req.body;
  console.log('passengers', passengers); // passengers is undefined

  if (!flightCode || !passengers) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid params' });
  }

  try {
    const updatedFlight = await FlightDAO.setPassengers(flightCode, passengers);
    res.status(StatusCodes.OK).json(updatedFlight);
  } catch (error) {
    console.error('Error updating passengers', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error updating passengers' });
  }
});

router.post('/:flightCode/passengers', async function (req: Request, res: Response) {
  const { flightCode } = req.params;
  const passenger = req.body;

  if (!flightCode || !passenger) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid params' });
  }

  try {
    const updatedFlight = await FlightDAO.addPassenger(flightCode, passenger);
    res.status(StatusCodes.OK).json(updatedFlight);
  } catch (error) {
    console.error('Error adding passenger', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error adding passenger' });
  }
});

router.delete('/:flightCode/passengers/:passengerId', async function (req: Request, res: Response) {
  const { flightCode, passengerId } = req.params;

  if (!flightCode || !passengerId) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid params' });
  }

  try {
    const updatedFlight = await FlightDAO.removePassenger(flightCode, parseInt(passengerId, 10));
    res.status(StatusCodes.OK).json(updatedFlight);
  } catch (error) {
    console.error('Error removing passenger', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error removing passenger' });
  }
});

export default router;
