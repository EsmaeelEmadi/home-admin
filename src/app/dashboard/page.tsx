"use client";

import "mapbox-gl/dist/mapbox-gl.css";

// hooks
import { useAppContext } from "@/providers/AppProvider";
import { useEffect, useState } from "react";
// components
import Map, { GeolocateControl } from "react-map-gl";
import { Typography, Statistic } from "@/ant";

// icon
import { LikeOutlined } from "@ant-design/icons";

// types
import { type FC } from "react";
import { blue, cyan, gold, purple, volcano } from "@ant-design/colors";
import { TTheme } from "@/types/app/general";

let ApexCharts: { default: any; prototype?: any };

const { Title, Paragraph } = Typography;

const opts = {
  series: [
    {
      name: "Marine Sprite",
      data: [44, 55, 41, 37, 22, 43, 21],
    },
    {
      name: "Striking Calf",
      data: [53, 32, 33, 52, 13, 43, 32],
    },
    {
      name: "Tank Picture",
      data: [12, 17, 11, 9, 15, 11, 20],
    },
    {
      name: "Bucket Slope",
      data: [9, 7, 5, 8, 6, 9, 4],
    },
    {
      name: "Reborn Kid",
      data: [25, 12, 19, 32, 25, 24, 10],
    },
  ],
  chart: {
    type: "bar",
    height: 350,
    stacked: true,
    stackType: "100%",
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  stroke: {
    width: 1,
    colors: ["#fff"],
  },
  colors: [blue[3], cyan[3], purple[3], gold[3], volcano[3]],
  title: {
    text: "100% Stacked Bar",
  },
  xaxis: {
    categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
  },
  tooltip: {
    y: {
      formatter: (val: string) => `${val}K`,
    },
  },
  fill: {
    opacity: 1,
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    offsetX: 40,
  },
};

const options = {
  series: [
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ],
  chart: {
    height: 150,
    // width: 150,
    type: "line",
    // dropShadow: {
    //   enabled: true,
    //   color: "#000",
    //   top: 5,
    //   left: 5,
    //   blur: 8,
    //   opacity: 0.1,
    // },
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: [1],
  },
  // title: {
  //   text: "Product Trends by Month",
  //   align: "left",
  // },
  grid: {
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
    // row: {

    //   // colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
    //   opacity: 0.1,
    // },
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  },
  legend: {
    show: false,
  },
};

interface IMapBoxComponentProps {
  theme: TTheme;
}

const MapBoxComponent: FC<IMapBoxComponentProps> = ({ theme }) => {
  if (typeof window === "undefined") return null;

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX}
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5,
      }}
      mapStyle={
        theme === "light"
          ? "mapbox://styles/mapbox/light-v11"
          : "mapbox://styles/mapbox/dark-v11"
      }
      style={{ borderRadius: "1.5rem" }}
    >
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        // trackUserLocation={true}
      />
    </Map>
  );
};

const DashboardPage: FC = () => {
  const { theme } = useAppContext();
  const [isApexLoaded, setIsApexLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      ApexCharts = await import("apexcharts");
      setIsApexLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!isApexLoaded) return;

    const chart = new ApexCharts.default(
      document.querySelector("#chart"),
      opts,
    );
    chart.render();

    const chart2 = new ApexCharts.default(
      document.querySelector("#chart2"),
      options,
    );
    chart2.render();

    return () => {
      chart.destroy();
      chart2.destroy();
    };
  }, [isApexLoaded]);

  // grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-cols-fr auto-rows-fr
  return (
    <div className="h-full flex flex-col gap-4 overflow-auto">
      <div className="flex-1 grid grid-cols-12 gap-4">
        <div className="flex flex-col col-span-12 md:col-span-6 lg:col-span-6 gap-4">
          <div className="flex-1 min-h-[300px]">
            <MapBoxComponent theme={theme} />
          </div>
          <div className="bg-white dark:bg-dark rounded-3xl h-fit aspect-video p-4">
            <div id="chart" />
          </div>
          <div className="flex flex-row gap-4">
            <div className="basis-1/2 bg-white dark:bg-dark rounded-3xl p-8 items-center text-center">
              <Statistic
                title="Feedback"
                value={1128}
                prefix={<LikeOutlined />}
              />
            </div>
            <div className="basis-1/2 bg-white dark:bg-dark rounded-3xl p-8 items-center text-center">
              <Statistic title="Unmerged" value={93} suffix="/ 100" />
            </div>
          </div>
        </div>
        <div className="flex flex-col col-span-12 md:col-span-6 lg:col-span-6 gap-4">
          <div className="p-4 rounded-3xl bg-white dark:bg-dark">
            <Title level={4}>Some Statistic</Title>
            <Paragraph>
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups.
            </Paragraph>
            <div id="chart2" />
          </div>
          <div className="flex flex-row gap-4">
            <div className="basis-1/2 p-4 rounded-3xl bg-blue-300">
              <div className="flex flex-row gap-4 text-white dark:text-dark">
                <LikeOutlined />
                <Title level={5} className="m-0 text-white dark:text-dark">
                  Card 1
                </Title>
              </div>
              <Paragraph className="text-white dark:text-dark">
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries for previewing layouts and
                visual mockups.
              </Paragraph>
            </div>
            <div className="basis-1/2 p-4 rounded-3xl bg-purple-300">
              <div className="flex flex-row gap-4 text-white dark:text-dark">
                <LikeOutlined />
                <Title level={5} className="m-0 text-white dark:text-dark">
                  Card 1
                </Title>
              </div>
              <Paragraph className="text-white dark:text-dark">
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries for previewing layouts and
                visual mockups.
              </Paragraph>
            </div>
          </div>
          <div className="basis-1/2 p-4 rounded-3xl bg-white dark:bg-dark flex flex-col justify-center">
            <div className="flex flex-row gap-4">
              <LikeOutlined />
              <Title level={5} className="m-0">
                Card 1
              </Title>
            </div>
            <Paragraph className="">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups.
            </Paragraph>
          </div>
          <div className="basis-1/2 p-4 rounded-3xl bg-white dark:bg-dark flex flex-col justify-center">
            <div className="flex flex-row gap-4">
              <LikeOutlined />
              <Title level={5} className="m-0">
                Card 1
              </Title>
            </div>
            <Paragraph className="">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups.
            </Paragraph>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
