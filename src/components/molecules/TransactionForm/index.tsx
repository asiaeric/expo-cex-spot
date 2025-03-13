import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Keyboard,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { runOnJS } from "react-native-reanimated";

import IncreaseBalanceBS, {
  IncreaseBalanceBSRefProps,
} from "./Components/IncreaseBalanceBS";
import InfoRow from "./Components/InfoRow";
import OrderTypeSelection from "./Components/OrderTypeSelection";
import PriceInput from "./Components/PriceInput/PriceInput";
import PriceSlider, { PriceSliderRef } from "./Components/PriceSlider";

import { CustomButton } from "@/components/atoms";
import { PLACE_ORDER_TYPES } from "@/constants";
import { useAppRouteParam } from "@/navigators/Application";
import { useStoreActions, useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";
import { OrderAction, PlaceOrderDTO } from "@/types";
import { RouteName } from "@/types/navigation";
import { numberSizeInput } from "@/utils/OrderBookHelpers";
import { adjustValueToSize } from "@/utils/OrderHelpers";
import { formatCurrency, roundNumber } from "@/utils/StringHelper";

interface ITransactionForm {
  customStyle?: ViewStyle | ViewStyle[];
}

function TransactionForm({ customStyle }: ITransactionForm) {
  const { t } = useTranslation(["common", "order"]);

  const { currentPair } = useStoreState((store) => store.tradingPairModel);
  const statistic = useStoreState((store) =>
    store.statisticModel.statistics.get(currentPair?.code || ""),
  );
  const { orderActionError } = useStoreState((store) => store.openOrdersModal);
  const { setOrderActionError } = useStoreActions(
    (store) => store.openOrdersModal,
  );

  const param = useAppRouteParam<RouteName.Transaction>();

  const priceSlider = useRef<PriceSliderRef>(null);

  const [actionType, setActionType] = useState(OrderAction.BUY);
  const [price, setPrice] = useState<number>(NaN);
  const [quantity, setQuantity] = useState<number>(NaN);
  const [placeOT, setPlaceOT] = useState<PlaceOrderDTO>(PLACE_ORDER_TYPES[0]);
  const [total, setTotal] = useState<number>(NaN);
  const { fonts, layout, gutters, backgrounds, borders, components } =
    useTheme();
  const { assets } = useStoreState((state) => state.assetModel);
  const { createTransaction } = useStoreActions(
    (actions) => actions.openOrdersModal,
  );
  const [errors, setErrors] = useState<any>({});
  const [debounceTimer, setDebounceTimer] = useState<any>(null);
  const [showTooltip, setShowTooltip] = useState(true);
  const bsRef = useRef<IncreaseBalanceBSRefProps>(null);
  const priceRef = useRef<TextInput>(null);
  const quantityRef = useRef<TextInput>(null);
  const totalRef = useRef<TextInput>(null);

  const stepSize = useMemo(() => {
    if (currentPair) {
      return currentPair.minBaseStep * currentPair.minQuoteStep || 1;
    }
    return 1;
  }, [currentPair]);

  const debouncedValidateInputs = () => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    setDebounceTimer(
      setTimeout(() => {
        validateInputs();
      }, 2000), // Debounce delay of 500ms
    );
  };

  useEffect(() => {
    if (param?.transactionType) {
      setActionType(param?.transactionType);
    }
  }, [param?.transactionType]);

  const onActionChange = useCallback((action: OrderAction) => {
    setActionType(action);
  }, []);

  useEffect(() => {
    if (orderActionError) {
      Alert.alert(orderActionError);
      setOrderActionError(undefined);
    }
  }, [orderActionError]);

  const onChangePlaceOT = useCallback(
    (placeOrder: PlaceOrderDTO) => {
      setPlaceOT(placeOrder);
    },
    [currentPair?.code],
  );

  const isBuy = useMemo(() => actionType === OrderAction.BUY, [actionType]);

  useEffect(() => {
    if (statistic?.c !== price || Number.isNaN(price)) {
      setPrice(statistic?.c || NaN);
    }
    setQuantity((prevQuantity) =>
      Number.isNaN(prevQuantity) ? prevQuantity : NaN,
    );
    setTotal((prevTotal) => (Number.isNaN(prevTotal) ? prevTotal : NaN));
    setErrors((prevErrors: any) =>
      Object.keys(prevErrors).length === 0 ? prevErrors : {},
    );

    if (price || quantity || total) {
      priceSlider.current?.resetSlider();
    }
  }, [isBuy, placeOT, currentPair?.code]);

  const availableAmount = useMemo(() => {
    if (currentPair) {
      return (
        assets.find((e) =>
          isBuy
            ? e.code === currentPair.quoteAsset.code
            : e.code === currentPair.baseAsset.code,
        )?.balance.availableAmount || 0
      );
    }
    return "---";
  }, [isBuy, assets, currentPair]);

  const handleTransaction = () => {
    Keyboard.dismiss();

    if (placeOT.code === "LIMIT") {
      if (Number.isNaN(price)) {
        priceRef.current?.focus();
        return;
      }

      if (Number.isNaN(quantity)) {
        quantityRef.current?.focus();
        return;
      }
    } else if (placeOT.code === "MARKET") {
      if (actionType === OrderAction.BUY && Number.isNaN(total)) {
        totalRef.current?.focus();
        return;
      }
      if (actionType === OrderAction.SELL && Number.isNaN(quantity)) {
        quantityRef.current?.focus();
        return;
      }
    }

    const newErrors: Record<string, string> = {};

    // Validate price
    if (actionType === "SELL" && price > (statistic?.c ?? 0) * 5) {
      newErrors.price = t("order:errorPriceGreaterThan", {
        value: (statistic?.c ?? 0) * 5,
      });
    }

    // Validate quantity
    if (quantity > (currentPair?.maxSize ?? 0)) {
      newErrors.quantity = t("order:errorMaximumQuantity", {
        value: `${currentPair?.maxSize || ""} ${
          currentPair?.baseAsset.code || ""
        }`,
      });
    }

    // Validate total
    if (
      (placeOT.code === "LIMIT" && total < (currentPair?.minTotal ?? 0)) ||
      (placeOT.code === "LIMIT" && totalPay < (currentPair?.minTotal ?? 0))
    ) {
      newErrors.total = t("order:errorMinimumOrderAmount", {
        value: `${currentPair?.minTotal || ""} ${
          currentPair?.quoteAsset.code || ""
        }`,
      });
    }

    // Display errors if any
    if (Object.keys(newErrors).length > 0) {
      Alert.alert(newErrors.price || newErrors.quantity || newErrors.total);
    } else if (currentPair) {
      // Process transaction
      if (placeOT.code === "MARKET") {
        if (typeof availableAmount === "number" && availableAmount > 0) {
          if (actionType === "BUY") {
            createTransaction({
              symbolCode: currentPair.code,
              price: total,
              action: actionType,
              type: placeOT.code,
            });
          } else if (actionType === "SELL" && availableAmount >= quantity) {
            createTransaction({
              symbolCode: currentPair.code,
              price: 0,
              action: actionType,
              type: placeOT.code,
              quantity,
            });
          } else {
            bsRef.current?.open();
          }
        } else {
          bsRef.current?.open();
        }
      } else if (placeOT.code === "LIMIT") {
        if (
          typeof availableAmount === "number" &&
          availableAmount >= quantity
        ) {
          createTransaction({
            symbolCode: currentPair.code,
            price,
            action: actionType,
            type: placeOT.code,
            quantity,
          });
        } else {
          bsRef.current?.open();
        }
      }
    }
  };

  const onChangePrice = (value: number) => {
    setPrice(value);
    setErrors({});
  };

  const onChangeQuantity = (value: number) => {
    setQuantity(value);
    setErrors({});
  };

  const onPercentLimitChange = (percent: number) => {
    "worklet";

    runOnJS(setTotal)(NaN);

    if (typeof availableAmount !== "number") return;

    const result = isBuy
      ? ((percent / 100) * availableAmount) / price
      : (percent / 100) * availableAmount;

    runOnJS(setQuantity)(
      percent === 0
        ? NaN
        : numberSizeInput(result, currentPair?.minBaseStep || 0),
    );
  };

  const onPercentMarketChange = (percent: number) => {
    "worklet";

    if (typeof availableAmount !== "number") return;

    const result = (percent / 100) * availableAmount;

    if (percent === 0) {
      runOnJS(isBuy ? setTotal : setQuantity)(NaN);
    } else {
      const sizeInput = isBuy
        ? numberSizeInput(result, stepSize)
        : numberSizeInput(result, currentPair?.minBaseStep || 1);

      runOnJS(isBuy ? setTotal : setQuantity)(sizeInput);
    }
  };

  const onChangeTotal = (value: number) => {
    if (!Number.isNaN(price)) {
      setQuantity(value / price);
    }
    setTotal(value);
    setErrors({});
  };
  const validateInputs = () => {
    const newErrors = {} as any;

    if (actionType === "SELL" && price > (statistic?.c || 0) * 5) {
      newErrors.price = t("order:errorPriceGreaterThan", {
        value: (statistic?.c ?? 0) * 5,
      });
    } else {
      newErrors.price = undefined;
    }

    if (quantity > currentPair!.maxSize) {
      newErrors.quantity = t("order:errorMaximumQuantity", {
        value: `${currentPair?.maxSize || ""} ${
          currentPair?.baseAsset.code || ""
        }`,
      });
    } else {
      newErrors.quantity = undefined;
    }

    if (total < currentPair!.minTotal || totalPay < currentPair!.minTotal) {
      newErrors.total = t("order:errorMinimumOrderAmount", {
        value: `${currentPair?.minTotal || ""} ${
          currentPair?.quoteAsset.code || ""
        }`,
      });
    } else {
      newErrors.total = undefined;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const totalPay = useMemo(() => {
    const result = price * quantity;
    return adjustValueToSize(result, stepSize);
  }, [price, quantity]);

  useEffect(() => {
    debouncedValidateInputs();
  }, [price, quantity, total, totalPay]);

  const fee = useMemo(() => {
    const precision = currentPair?.baseAsset?.precision || 0;
    if (actionType === "SELL" && placeOT.code === "LIMIT") {
      const feeCost = roundNumber(
        totalPay * (currentPair?.makerFee || 0),
        precision,
      );
      return Number.isNaN(feeCost) ? "---" : feeCost.toFixed(precision);
    }
    if (actionType === "SELL" && placeOT.code === "MARKET") {
      const feeCost = roundNumber(
        quantity * (statistic?.lastPrice || 0) * (currentPair?.takerFee || 0),
        precision,
      );
      return Number.isNaN(feeCost) ? "---" : feeCost.toFixed(precision);
    }
    if (actionType === "BUY" && placeOT.code === "LIMIT") {
      const feeCost = quantity * (currentPair?.makerFee || 0);
      return Number.isNaN(feeCost) ? "---" : feeCost.toFixed(precision);
    }
    if (actionType === "BUY" && placeOT.code === "MARKET") {
      const feeCost = roundNumber(
        (total / (statistic?.lastPrice || 0)) * (currentPair?.takerFee || 0),
        precision,
      );
      return Number.isNaN(feeCost) ? "---" : feeCost.toFixed(precision);
    }
    return "---";
  }, [
    totalPay,
    total,
    currentPair,
    actionType,
    quantity,
    statistic?.lastPrice,
    placeOT.code,
  ]);

  const max = useMemo(() => {
    if (typeof availableAmount === "number") {
      let maxAmount;
      if (actionType === "SELL" && placeOT.code === "LIMIT") {
        maxAmount = numberSizeInput(
          availableAmount * price,
          currentPair?.minBaseStep || 0,
        );
      }
      if (actionType === "SELL" && placeOT.code === "MARKET") {
        maxAmount = availableAmount * (statistic?.c || 0);
      }
      if (actionType === "BUY" && placeOT.code === "LIMIT") {
        maxAmount = numberSizeInput(
          availableAmount / price,
          currentPair?.minBaseStep || 0,
        );
      }
      if (actionType === "BUY" && placeOT.code === "MARKET") {
        maxAmount = numberSizeInput(
          availableAmount / (statistic?.lastPrice || 0),
          currentPair?.minBaseStep || 0,
        );
      }
      return Number.isNaN(maxAmount) ? "---" : formatCurrency(maxAmount || 0);
    }

    return "---";
  }, [
    // totalPay,
    // total,
    availableAmount,
    actionType,
    currentPair?.code,
    currentPair?.takerFee,
    currentPair?.minBaseStep,
    placeOT.code,
  ]);

  const renderInputSection = () => {
    switch (placeOT.code) {
      case "LIMIT":
        return (
          <View style={{ position: "relative" }}>
            <PriceInput
              size={currentPair?.tickSize}
              placeholder={t("order:priceWithSymbol", {
                symbol: currentPair?.quoteAsset.code || "",
              })}
              value={price}
              onChange={onChangePrice}
              error={errors.price}
              showTooltip={showTooltip}
              ref={priceRef}
            />
            <PriceInput
              placeholder={t("order:amountWithSymbol", {
                symbol: currentPair?.baseAsset.code || "",
              })}
              value={quantity}
              onChange={onChangeQuantity}
              size={currentPair?.minBaseStep}
              error={errors.quantity}
              showTooltip={showTooltip}
              ref={quantityRef}
            />
            <PriceSlider onChange={onPercentLimitChange} ref={priceSlider} />
            <PriceInput
              placeholder={t("order:total", {
                symbol: currentPair?.quoteAsset.code || "",
              })}
              size={currentPair?.stepSize}
              hasChangeAction={false}
              customStyle={gutters.marginTop_24}
              value={total === 0 ? 0 : total || totalPay}
              onChange={onChangeTotal}
              error={errors.total}
              showTooltip={showTooltip}
              ref={totalRef}
            />
          </View>
        );
      case "MARKET":
        return (
          <View style={{ position: "relative" }}>
            <View
              style={[
                layout.flex_1,
                layout.justifyCenter,
                layout.itemsCenter,
                gutters.padding_16,
                backgrounds.purple100,
                borders.rounded_8,
                gutters.marginTop_16,
              ]}>
              <Text style={fonts.gray400}>{t("order:marketPrice")}</Text>
            </View>
            {actionType === OrderAction.BUY ? (
              <PriceInput
                size={currentPair?.stepSize}
                hasChangeAction={false}
                customStyle={gutters.marginTop_16}
                placeholder={t("order:total", {
                  symbol: currentPair?.quoteAsset.code || "",
                })}
                value={total}
                onChange={onChangeTotal}
                error={errors.total}
                showTooltip={showTooltip}
                ref={totalRef}
              />
            ) : (
              <PriceInput
                size={currentPair?.minBaseStep}
                customStyle={gutters.marginTop_16}
                placeholder={t("order:amountWithSymbol", {
                  symbol: currentPair?.baseAsset.code || "",
                })}
                value={quantity}
                onChange={onChangeQuantity}
                error={errors.quantity}
                showTooltip={showTooltip}
                ref={quantityRef}
              />
            )}
            <PriceSlider
              onChange={onPercentMarketChange}
              ref={priceSlider}
              containerStyle={gutters.marginBottom_12}
            />
          </View>
        );
      default:
        return <View />;
    }
  };

  return (
    <View style={[gutters.marginRight_12, customStyle]}>
      <View style={[layout.row, layout.justifyBetween]}>
        <CustomButton
          text={t("common:buy")}
          onPress={() => onActionChange(OrderAction.BUY)}
          customStyle={[
            layout.flex_1,
            components.buttonSmall,
            borders.w_2,
            isBuy ? borders.green : borders.gray400,
            gutters.marginRight_14,
          ]}
        />
        <CustomButton
          text={t("common:sell")}
          onPress={() => onActionChange(OrderAction.SELL)}
          customStyle={[
            layout.flex_1,
            components.buttonSmall,
            borders.w_2,
            !isBuy ? borders.red500 : borders.gray400,
          ]}
        />
      </View>
      <OrderTypeSelection onSelect={onChangePlaceOT} value={placeOT} />
      {renderInputSection()}
      <InfoRow
        title={t("order:available")}
        value={
          typeof availableAmount === "number"
            ? formatCurrency(availableAmount)
            : "---"
        }
        affix={
          isBuy ? currentPair?.quoteAsset.code : currentPair?.baseAsset.code
        }
      />
      <InfoRow
        title={t("order:maxAction", {
          action: isBuy ? t("common:buy") : t("common:sell"),
        })}
        value={max}
        affix={
          isBuy ? currentPair?.baseAsset.code : currentPair?.quoteAsset.code
        }
      />
      <InfoRow
        title={t("order:estFee")}
        value={formatCurrency(parseFloat(fee.replace(/\.?0+$/, "")), {
          decimals: 8,
        })}
        affix={
          isBuy ? currentPair?.baseAsset.code : currentPair?.quoteAsset.code
        }
      />
      <CustomButton
        text={t("order:actionWithSymbol", {
          action: isBuy ? t("common:buy") : t("common:sell"),
          symbol: currentPair?.baseAsset.code || "",
        })}
        onPress={handleTransaction}
        customStyle={[
          gutters.marginTop_32,
          isBuy ? backgrounds.green : backgrounds.red500,
        ]}
        textStyle={fonts.size_16}
      />
      <IncreaseBalanceBS ref={bsRef} />
    </View>
  );
}

export default TransactionForm;
