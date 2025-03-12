import { assetModel, AssetsModel } from './asset.model'
import { ChartModel, chartModel } from './chart.model'
import { FeeModel, feeModel } from './fee.model'
import { statisticModel, StatisticModel } from './statistic.model'
import { TradingPairModel, tradingPairModel } from './trading-pair.model'
import { UserModel, userModel } from './user.model'

export interface Model {
	assetModel: AssetsModel
	chartModel: ChartModel
	statisticModel: StatisticModel
	tradingPairModel: TradingPairModel
	feeModel: FeeModel
	userModel: UserModel
}

export const model: Model = {
	assetModel,
	chartModel,
	statisticModel,
	tradingPairModel,
	feeModel,
	userModel,
}
