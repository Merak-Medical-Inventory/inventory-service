import { getManager } from "typeorm";
import Stock from "@db/entity/Stock/Stock";
import { ErrorHandler } from "@helpers/ErrorHandler";

export const updateStock = async (id: any, dataToUpdate: any) => {
    try {
        const stockRepository = getManager().getRepository(Stock);
        const update = await stockRepository.update(id,{...dataToUpdate });
        if(update.affected === 0) throw new ErrorHandler(404, "Stock not found");
        return await stockRepository.findOne({id});
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};
