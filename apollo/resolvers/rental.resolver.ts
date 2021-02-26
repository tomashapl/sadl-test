import {Arg, FieldResolver, Mutation, Query, Resolver, Root} from "type-graphql";
import {RentalModel} from "../models/rental.model";
import {RentalInput} from "../input/rental.input";
import authFetch from "../authFetch";
import Token from "../decorators/Token";
import {CarModel} from "../models/car.model";

@Resolver(of => RentalModel)
class RentalResolver {

    @Query(() => [RentalModel])
    async rentals(@Token() token: string) {
        const rentals = await authFetch("/rentals", {}, token)
        const response = await rentals.json()
        return response.data.map(rental => ({
            ...rental,
            from: new Date(rental.from),
            to: new Date(rental.to)
        }))
    }

    @Mutation(() => RentalModel)
    async createRental(@Arg("values") values: RentalInput, @Token() token: string) {
        const rental = await authFetch("/rentals", {
            method: "POST",
            body: JSON.stringify({
                ...values,
                rentalFrom: new Date(values.rentalFrom),
                rentalTo: new Date(values.rentalTo)
            })
        }, token)


        const response = await rental.json()

        return {
            ...response,
            subjectId: response.subjectID,
            from: new Date(response.from),
            to: new Date(response.to)
        }
    }

    @FieldResolver(() => CarModel)
    async car(@Root() root: RentalModel, @Token() token: string) {

        const cars = await authFetch("/cars", {}, token)
        const response = await cars.json()

        return response.find(x => x.subjectTypeId === root.subjectId)
    }
}

export { RentalResolver }