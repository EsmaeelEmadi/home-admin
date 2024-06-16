"use client";

import "mapbox-gl/dist/mapbox-gl.css";

// hooks
import { useAppContext } from "@/providers/AppProvider";

// components
import Map, { GeolocateControl } from "react-map-gl";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Button, Col, Row, Statistic } from "@/ant";

// types
import { type FC } from "react";
import { blue, cyan } from "@ant-design/colors";

// setup
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options: ChartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => Math.random() * 1000),
      backgroundColor: cyan[4],
    },
    {
      label: "Dataset 2",
      data: labels.map(() => Math.random() * 1000),
      backgroundColor: blue[4],
    },
  ],
};

const DashboardPage: FC = () => {
  const { theme } = useAppContext();

  return (
    <div className="h-full grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-cols-fr auto-rows-fr">
      <div className=" bg-white dark:bg-dark p-8 rounded-3xl px-4 flex flex-col">
        {/* @ts-expect-error TODO: check options type */}
        <Bar options={options} data={data} />
      </div>
      <div className=" bg-white dark:bg-dark p-8 rounded-3xl px-4 flex flex-col content-center">
        <Row gutter={16}>
          <Col span={12} className="flex justify-center">
            <Statistic title="Active Users" value={112893} />
          </Col>
          <Col span={12} className="flex flex-col justify-center">
            <Statistic
              title="Account Balance (CNY)"
              value={112893}
              precision={2}
            />
            <Button style={{ marginTop: 16 }} type="primary" className="w-fit">
              Recharge
            </Button>
          </Col>
        </Row>
      </div>
      <div className=" bg-white dark:bg-dark p-8 rounded-3xl px-4 flex flex-col">
        hello
      </div>
      <div className=" bg-white dark:bg-dark rounded-3xl flex flex-col">
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
      </div>
    </div>
  );
};

export default DashboardPage;
