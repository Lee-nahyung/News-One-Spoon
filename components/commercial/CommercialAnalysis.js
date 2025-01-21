import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 요일을 한글로 변환하는 함수
const getKoreanDay = (day) => {
  const days = {
    MONDAY: "월요일",
    TUESDAY: "화요일",
    WEDNESDAY: "수요일",
    THURSDAY: "목요일",
    FRIDAY: "금요일",
    SATURDAY: "토요일",
    SUNDAY: "일요일",
  };
  return days[day] || day;
};

// 스타일링
const Section = styled.div`
  margin-bottom: 2rem;
`;

const Subtitle = styled.h4`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
`;

const Highlight = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 0;
`;

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      titleColor: "#fff",
      bodyColor: "#fff",
      cornerRadius: 4,
      titleFont: { size: 14 },
      bodyFont: { size: 12 },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: { size: 12 },
        color: "#666",
      },
    },
    y: {
      grid: {
        color: "#e0e0e0",
        lineWidth: 0.5,
      },
      ticks: {
        font: { size: 12 },
        color: "#666",
        callback: function (value) {
          return value.toLocaleString(); // 천 단위 콤마 추가
        },
      },
    },
  },
};

const CommercialAnalysis = ({ data }) => {
  const {
    sales_by_time_slot,
    top_time_slot,
    sales_by_gender,
    top_gender,
    sales_by_day,
    top_day,
  } = data;

  const sortedTimeSlots = useMemo(() => {
    return Object.entries(sales_by_time_slot).sort(
      ([a], [b]) =>
        parseInt(a.split(":")[0], 10) - parseInt(b.split(":")[0], 10)
    );
  }, [sales_by_time_slot]);

  const timeSlotData = {
    labels: sortedTimeSlots.map(([time]) => time),
    datasets: [
      {
        label: "매출액",
        data: sortedTimeSlots.map(([, sales]) => sales),
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

  const genderData = {
    labels: ["남성", "여성"],
    datasets: [
      {
        label: "매출액",
        data: [sales_by_gender.M, sales_by_gender.F],
        backgroundColor: ["rgba(54, 162, 235, 0.7)", "rgba(255, 99, 132, 0.7)"],
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

  const sortedDays = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];
  const daySalesData = sortedDays.map((day) => sales_by_day[day] || 0);

  const dayData = {
    labels: ["월", "화", "수", "목", "금", "토", "일"],
    datasets: [
      {
        label: "매출액",
        data: daySalesData,
        backgroundColor: "rgba(153, 102, 255, 0.7)",
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

  return (
    <div>
      <h2>{`"${data.district}" 상권 분석 리포트`}</h2>
      <br />
      <Section>
        <Subtitle>상권 결제 발생 시간대</Subtitle>
        <Highlight>{`${top_time_slot.time_slot} 시 결제가 가장 활발해요.`}</Highlight>
        <Bar data={timeSlotData} options={chartOptions} />
      </Section>

      <Section>
        <Subtitle>상권 결제 성별</Subtitle>
        <Highlight>{`${
          top_gender.gender === "F" ? "여성" : "남성"
        } 결제가 가장 활발해요.`}</Highlight>
        <Bar data={genderData} options={chartOptions} />
      </Section>

      <Section>
        <Subtitle>상권 결제 발생 요일</Subtitle>
        <Highlight>{`${getKoreanDay(
          top_day.day
        )} 결제가 가장 활발해요.`}</Highlight>
        <Bar data={dayData} options={chartOptions} />
      </Section>
    </div>
  );
};

export default CommercialAnalysis;
