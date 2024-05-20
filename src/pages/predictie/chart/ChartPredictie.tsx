import { Prediction } from '../Predictie.tsx';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { renderToString } from 'react-dom/server';

type Props = {
  data?: Prediction[];
};

export default function ChartPredictie(props: Props) {
  const { data } = props;

  const options: ApexOptions = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 5,
        barHeight: '50%',
      },
    },
    dataLabels: {
      enabled: true,
      formatter(val: number): string | number {
        return `${(val * 100).toFixed(2)} %`;
      },
      style: {
        colors: ['#333'],
      },
    },
    tooltip: {
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const name = w.globals.labels[dataPointIndex];
        const value = series[seriesIndex][dataPointIndex];
        const fixedValue = `${(value * 100).toFixed(2)} %`;
        return renderToString(
          <div className="flex flex-col gap-2 p-2">
            <div className="font-bold">{name}</div>
            <div>Predicție: {fixedValue}</div>
          </div>
        );
      },
    },
    yaxis: {
      // labels: {
      //   formatter(_val: number, opts?: any): string | string[] {
      //     const seriesIndex = opts.seriesIndex;
      //     return data?.[seriesIndex]?.label || '';
      //   },
      // },
    },
    xaxis: {
      title: {
        text: 'Probabilitate',
      },
      labels: {
        formatter(val): string {
          // @ts-ignore
          return `${(val * 100).toFixed(2)} %`;
        },
      },
      categories: data?.map((item) => item.label) || [],
    },
  };

  return (
    <ReactApexChart
      type={'bar'}
      options={options}
      height={400}
      series={[
        {
          name: 'Predicție',
          data: data?.map((item) => item.score) || [],
        },
      ]}
    />
  );
}
