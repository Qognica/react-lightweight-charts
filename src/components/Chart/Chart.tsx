import React, { FC, useEffect, useRef, useState } from 'react';
import { createChart, IChartApi, OhlcData, SingleValueData } from 'lightweight-charts';
import { IChart } from './Chart.types';

const Chart: FC<IChart> = (props) => {
    const { candlestickSeries, lineSeries, areaSeries, barSeries, histogramSeries, width, height, options, autoWidth, autoHeight, legend, from, to, onCrosshairMove, onTimeRangeMove, darkTheme, chartRef } = props;
    const chartContainerRef = useRef();
    const [chart, setChart] = useState<IChartApi>();

    useEffect(() => {
        // Initilize chart
        if (!chartContainerRef.current) return;
        setChart(createChart(chartContainerRef.current, options ? options : {}));
        chart && chart.timeScale().fitContent();

        // Add all series
        handleSeries();

        // Add resize event handler
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart && chart.remove();
        };
    }, [props]);

    // Resizes chart
    const handleResize = () => {
        chart && chart.applyOptions(options ? options : {});
    };

    const handleSeries = () => {
        if (!chart) return;

        // Loop through lineSeries
        lineSeries &&
            lineSeries.forEach((serie) => {
                const newSeries = chart.addLineSeries(serie.options)
                newSeries.setData(serie.data) // handleLinearInterpolation(serie.data, serie.linearInterpolation)
            });
    }

    // TODO Type correctly
    // const handleLinearInterpolation = (data: SingleValueData[], candleTime?: number) => {
    //     if (!candleTime || data.length < 2 || !data[0].value) return data;
    //     const first = data[0].time;
    //     const last = data[data.length - 1].time;
    //     const newData = new Array(Math.floor((last - first) / candleTime));
    //     newData[0] = data[0];
    //     let index = 1;
    //     for (let i = 1; i < data.length; i += 1) {
    //         newData[index += 1] = data[i];
    //         const prevTime = data[i - 1].time;
    //         const prevValue = data[i - 1].value;
    //         const { time, value } = data[i];
    //         for (
    //             let interTime = prevTime;
    //             interTime < time - candleTime;
    //             interTime += candleTime
    //         ) {
    //             // interValue get from the Taylor-Young formula
    //             const interValue =
    //                 prevValue +
    //                 (interTime - prevTime) *
    //                 ((value - prevValue) / (time - prevTime));
    //             newData[index + 1] = { time: interTime, value: interValue };
    //         }
    //     }
    //     // return only the valid values
    //     return newData.filter((x) => x);
    // };

    return (
        <div
            ref={chartContainerRef.current}
        />
    );
}

export default Chart;