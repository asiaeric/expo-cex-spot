import ky from "ky";
import React, { Component } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import ByronKlineChart, {
  dispatchByronKline,
  KLineIndicator,
} from "react-native-kline";

import apiClient from "@/services/instance";

export default class KlineChartSample extends Component {
  state = {
    list: [],
  };

  onMoreKLineData = (params) => {};

  async initKlineChart() {
    try {
      const res = await apiClient
        .extend({ prefixUrl: "" })
        .get(
          "https://www.okex.com/priapi/v5/market/candles?instId=BTC-USDT&bar=1m&limit=1000",
        )
        .json();

      if (!res?.data?.length) {
        return;
      }

      const list = res.data.map((item) => ({
        amount: 0,
        open: Number(item[1]),
        close: Number(item[4]),
        high: Number(item[2]),
        id: Math.floor(Number(item[0]) / 1000),
        low: Number(item[3]),
        vol: Number(item[5]),
      }));

      list.sort((l, r) => l.id - r.id);

      this.setState({ list });
      this.subscribeKLine();
    } catch (error) {
      console.error("Error fetching Kline data:", error);
    }
  }

  subscribeKLine() {
    const ws = new WebSocket("wss://wspri.okex.com:8443/ws/v5/public");
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          op: "subscribe",
          args: [{ channel: "candle1m", instId: "BTC-USDT" }],
        }),
      );
    };
    ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        const item = data?.data?.[0];
        if (!item) return;

        dispatchByronKline("update", [
          {
            amount: 0,
            open: Number(item[1]),
            close: Number(item[4]),
            high: Number(item[2]),
            id: Math.floor(Number(item[0]) / 1000),
            low: Number(item[3]),
            vol: Number(item[5]),
          },
        ]);
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };
  }

  componentDidMount() {
    this.initKlineChart();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcome}>☆ByronKline example☆</Text>
        <Text style={styles.instructions}>STATUS: loaded</Text>
        <Text style={styles.welcome}>☆☆☆</Text>
        <ByronKlineChart
          style={{ flex: 1 }}
          datas={this.state.list}
          onMoreKLineData={this.onMoreKLineData}
          indicators={[KLineIndicator.MainMA]}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});
